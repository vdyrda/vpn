<?php
require_once('class.Database.inc');

class Company {
    
    public static function get_all_array() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $companies = array();
        $sql_query = "SELECT * FROM `company`;";
        $result = $mysqli->query($sql_query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $companies[] = $row;
            }
        }
        return $companies;
    }
    
    public function get_all($error_msg='') {
        $companies = self::get_all_array();
        if (empty($companies)) {
            return array('msg'=>array('result'=>'error', 'info'=>'No companies.', 'error_msg'=>$error_msg));
        } 
        if (empty($error_msg)) {
            $result_msg = "ok";
        } else {
            $result_msg = "error";
        }
        return array('msg'=>array('result'=>$result_msg, 'info'=>"List of (".count($companies).") companies.", 'error_msg'=>$error_msg), 'companies'=>$companies);
    }
    
    public function delete($id = 0) {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $id = 0 + $id;
        $error_msg='';
        if (!$id) {
            $error_msg = "Can't delete a company without id.";
        } else {
            $sql_query = "DELETE FROM `company` WHERE `id`={$id} LIMIT 1";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "Company with id={$id} wasn't deleted";
            }
        }
        return static::get_all($error_msg);
    }
    
    public function save($params) {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $id = (!empty($params['id'])) ? (int)$params['id'] : 0;
        $quota = (!empty($params['quota'])) ? 0+$params['quota'] : 0;
        $error_msg = '';
        
        if (empty($params['name'])) {
            return static::get_all("No company name to save.");
        } 
        $name = $mysqli->escape_string($params['name']);

        if ($id) {
            // update item            
            $sql_query = "UPDATE `company` SET `name`='{$name}', `quota`={$quota} WHERE `id`={$id} LIMIT 1";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "Database update of company $name failed.";
            }
            return static::get_all($error_msg);
        } else {
            // new item
            $sql_query = "INSERT INTO `company`(`name`, `quota`) VALUES ('{$name}', {$quota})";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "Database add of company $name failed.";
            }
            return static::get_all($error_msg);
        }        
    }

    public function get_by_id() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $sql_query = "SELECT * FROM company WHERE id = '" . (int)$id;
        $result = $mysqli->query($sql_query);
        if ($row = $result->fetch_assoc()) {
            return $row;
        } else {
            return NULL;
        }
    }
}