<?php
require_once('class.Database.inc');
require_once('class.Company.inc');

class User {
    
    public static function get_all_array() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $users = array();
        $sql_query = "SELECT * FROM `user`;";
        $result = $mysqli->query($sql_query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
        return $users;
    }
    
    public function get_all($error_msg='') {
        $companies = Company::get_all_array();
        $users = self::get_all_array();

        if (empty($users)) {
            return array('msg'=>array('result'=>'error', 'info'=>'No users.', 'error_msg'=>$error_msg));
        }
        if (empty($error_msg)) {
            $result_msg = "ok";
        } else {
            $result_msg = "error";
        }
        return array('msg'=>array('result'=>$result_msg, 'info'=>"List of (".count($users).") users.", 'error_msg'=>$error_msg), 'users'=>$users, 'companies'=>$companies);
    }
    
    public function delete($id = 0) {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $id = 0 + $id;
        $error_msg='';
        if (!$id) {
            $error_msg = "Can't delete a user without id.";
        } else {
            $sql_query = "DELETE FROM `user` WHERE `id`={$id} LIMIT 1";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "User with id={$id} wasn't deleted";
            }
        }
        return static::get_all($error_msg);
    }
    
    public function save($params) {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $id = (!empty($params['id'])) ? (int)$params['id'] : 0;
        $email = (!empty($params['email'])) ? $mysqli->escape_string($params['email']) : "";
        $error_msg = '';

        if (empty($params['name'])) {
            return static::get_all("No user name to save.");
        }
        $name = $mysqli->escape_string($params['name']);
        
        if (empty($params['company_id'])) {
            return static::get_all("No user's company_id to save.");
        }
        $company_id = (int)$params['company_id'];
        
        if ($id) {
            // update item            
            $sql_query = "UPDATE `user` SET `name`='{$name}', `email`='{$email}', `company_id`={$company_id} WHERE `id`={$id} LIMIT 1";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "Database update of user $name failed.";
            }
            return static::get_all($error_msg);
        } else {
            // new item
            $sql_query = "INSERT INTO `user`(`name`, `email`, `company_id`) VALUES ('{$name}', '{$email}', {$company_id})";
            $result = $mysqli->query($sql_query);
            if (!$result) {
                $error_msg = "Database add of user $name failed.";
            }
            return static::get_all($error_msg);
        }
        
    }

    public function get_by_id() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $sql_query = "SELECT * FROM user WHERE id = '" . (int)$id;
        $result = $mysqli->query($sql_query);
        if ($row = $result->fetch_assoc()) {
            return $row;
        } else {
            return NULL;
        }
    }
    
}