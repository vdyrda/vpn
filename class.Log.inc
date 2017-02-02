<?php
require_once('config.php');
require_once('class.Database.inc');
require_once('vendor/Faker/src/autoload.php');

class Log {
    
    public static function get_all_months() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $months = array();
        $sql_query = "SELECT DISTINCT YEAR(`time_stamp`) AS `year`, MONTH(`time_stamp`) AS `month`, DATE_FORMAT(`time_stamp`, '%M %Y') AS `month_name` FROM `log`";
        $result = $mysqli->query($sql_query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $months[] = $row;
            }
        }
        return array('months'=>$months);
    }
    
    public static function get_companis_quota($params) {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $companies = array();
        // date format is "%Y-%m-%d %H:%M:%S"
        $month = $params['month'];
        $year = $params['year'];
        $exceed = isset($params['exceed']) ? $params['exceed'] : false;
        if ($month*$year == 0) {
            // current month
            $time_start = date("Y-m-")."01 00:00:00";
            $time_end = date("Y-m-d")." 23:59:59";
        } else {
            // requested month
            $start = "{$year}-{$month}-01";
            $time_start = "{$start} 00:00:00";
            $time_end = date("Y-m-t", strtotime($start))." 23:59:59";
        }
        
        $sql_query  = "SELECT SUM(log.size) AS `company_used`, ";
        $sql_query .=   "user.company_id AS `company_id`, ";
        $sql_query .=   "company.name AS `company_name`, ";
        $sql_query .=   "company.quota AS company_quota ";
        $sql_query .= "FROM `log`,`user`,`company` ";
        $sql_query .= "WHERE (log.user_id=user.id) ";
        $sql_query .=   "AND (user.company_id=company.id) ";
        $sql_query .=   "AND (log.time_stamp BETWEEN ";
        $sql_query .= "     STR_TO_DATE('{$time_start}','%Y-%m-%d %H:%i:%s') AND ";
        $sql_query .= "     STR_TO_DATE('{$time_end}}','%Y-%m-%d %H:%i:%s')) ";
        $sql_query .= "GROUP BY `company_id` ";
        $sql_query .= "ORDER BY `size` DESC ";
        
        $result = $mysqli->query($sql_query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                if ($exceed && $row['company_used'] <= $row['company_quota']) {
                    continue;
                }
                $companies[] = $row;
            }
            return array('msg'=>array('result'=>'ok'), 'companies'=>$companies);
        } else {
            return array('msg'=>array('result'=>'error', 'error_msg'=>$mysqli->error));
        }
    }
    
/*  Function Description: 

    Generate the transfer data for the last 6 months according to the following rules: 
    a. Each user of the company has at least one transfer every month. 
    b. Every transfer has a random number of bytes from 100 bytes to 10 TB 
    c. Every user may have several transfers any given day 
    d. Every user should have approximately 50-500 records for the 6-month period. 
        No validation of this is required, but the amount of data should be substantial. 
*/
    public static function random_traffic() {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();

        $sql_query = "TRUNCATE TABLE `log`";
        $result = $mysqli->query($sql_query);

        if ($result) {
            $sql_query = "SELECT `id` FROM `user` WHERE 1 = 1";
            $result = $mysqli->query($sql_query);
            if ($result) {
                $users_id = array();
                while ($row = $result->fetch_assoc()) {
                    $users_id[] = $row['id'];
                }

                $sql_query = "INSERT INTO `log` (`size`,`time_stamp`,`url`,`user_id`) VALUES ";
                $first_line = true;

                // use the factory to create a Faker\Generator instance
                $faker = Faker\Factory::create();
                foreach ($users_id as $user_id) {
                    $times = $faker->numberBetween($min = 50, $max = 500);
                    for ($i=0; $i<$times; $i++) {
                        $date_time = $faker->dateTimeBetween('-6 month', 'now');
                        $time_stamp = date_format($date_time, 'Y-m-d H:i:s');
                        $size = $faker->randomFloat($nbMaxDecimals = 0, $min = 100, $max = 10*1024*1024*1024*1024);
                        $url = $faker->url;
                        $sql_query .= ($first_line ? ' ' : ', ') . "({$size}, '{$time_stamp}', '{$url}', {$user_id})";
                        if ($first_line) {
                            $first_line = false;
                        }
                    }
                }
                $result = $mysqli->query($sql_query);
            }

        }
        
        // Return the list of traffic months
        return self::get_all_months();
    }
    
}