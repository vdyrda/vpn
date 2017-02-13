<?php
require_once('config.php');
require_once('class.Log.inc');

$security = isset($_POST['security']) ? $_POST['security'] : null;
$action = isset($_POST['action']) ? $_POST['action'] : null;

if ($security === SECURITY) {
    switch ($action) {
        case 'get_all_months': 
            echo json_encode(Log::get_all_months());
            break;
        case 'get_abusers': 
            $month = (isset($_POST['month'])) ? (int)$_POST['month'] : 0;
            $year = (isset($_POST['year'])) ? (int)$_POST['year'] : 0;
            $params = array('month'=>$month, 'year'=>$year, 'exceed'=>true);
            echo json_encode(Log::get_companies_quota($params));
            break;
        case 'get_abusers_details': 
            $month = (isset($_POST['month'])) ? (int)$_POST['month'] : 0;
            $year = (isset($_POST['year'])) ? (int)$_POST['year'] : 0;
            $company_id = (isset($_POST['company_id'])) ? (int)$_POST['company_id'] : null;
            $params = array('company_id'=>$company_id, 'month'=>$month, 'year'=>$year);
            echo json_encode(Log::get_company_users_used($params));
            break;
        case 'random_traffic': 
            echo json_encode(Log::random_traffic());
            break;
        default: ;             
            echo json_encode(array('msg'=>array('result'=>'error', 'error_msg'=>'Unknown request type.')));
    }
}
