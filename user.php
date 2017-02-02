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
        case 'get_all_users': 
            echo json_encode(User::get_all());
            break;
        case 'add_user': 
            $name = (isset($_POST['name'])) ? $_POST['name'] : NULL;
            $email = (isset($_POST['email'])) ? $_POST['email'] : NULL;
            $company_id = (isset($_POST['company_id'])) ? 0+$_POST['company_id'] : NULL;
            $params = array('id'=>0, 'name'=>$name, 'email'=>$email, 'company_id'=>$company_id);
            echo json_encode(User::save($params));
            break;
        case 'update_user': 
            $id = (isset($_POST['id'])) ? $_POST['id'] : NULL;
            $name = (isset($_POST['name'])) ? $_POST['name'] : NULL;
            $email = (isset($_POST['email'])) ? $_POST['email'] : NULL;
            $company_id = (isset($_POST['company_id'])) ? 0+$_POST['company_id'] : NULL;
            $params = array('id'=>$id, 'name'=>$name, 'email'=>$email, 'company_id'=>$company_id);
            echo json_encode(User::save($params));
            break;
        case 'delete_user':
            $id = (isset($_POST['id'])) ? $_POST['id'] : NULL;
            echo json_encode(User::delete($id));
            break;
        default: ;             
            echo json_encode(array('msg'=>array('result'=>'error', 'error_msg'=>'Unknown request type.')));
    }
}
