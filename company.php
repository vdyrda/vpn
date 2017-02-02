<?php
require_once('config.php');

$security = isset($_POST['security']) ? $_POST['security'] : null;
$action = isset($_POST['action']) ? $_POST['action'] : null;

/**
 * Define autoloader.
 * @param string $class_name
 */
function __autoload($class_name) {
    include 'class.' . $class_name. '.inc';
}


if ($security === SECURITY) {
    switch ($action) {
        case 'get_all_companies': 
            echo json_encode(Company::get_all());
            break;
        case 'add_company': 
            $name = (isset($_POST['name'])) ? $_POST['name'] : NULL;
            $quota = (isset($_POST['quota'])) ? 0+$_POST['quota'] : NULL;
            $params = array('id'=>0, 'name'=>$name, 'quota'=>$quota);
            echo json_encode(Company::save($params));
            break;
        case 'update_company': 
            $id = (isset($_POST['id'])) ? $_POST['id'] : NULL;
            $name = (isset($_POST['name'])) ? $_POST['name'] : NULL;
            $quota = (isset($_POST['quota'])) ? 0+$_POST['quota'] : NULL;
            $params = array('id'=>$id, 'name'=>$name, 'quota'=>$quota);
            echo json_encode(Company::save($params));
            break;
        case 'delete_company':
            $id = (isset($_POST['id'])) ? $_POST['id'] : NULL;
            echo json_encode(Company::delete($id));
            break;
        default: ;             
            echo json_encode(array('msg'=>array('result'=>'error', 'error_msg'=>'Unknown request type.')));
    }
}
