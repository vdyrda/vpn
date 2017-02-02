<?php
require 'vendors/carbon/carbon.php';
use Carbon\Carbon;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>VPN Admin</title>
    <link rel="stylesheet" type="text/css" href="vendors/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
</head>

<body class="companies">
    <div id="wrapper">
        
        <!-- COMPANIES -->
        <div id="companies" class="page">
            <h1>Companies</h1>
            <form action="" id="f_companies" class="form-b">
                <table class="table_db" id="companies_table">
                    <thead>
                        <tr>
                            <th class='name'>Company name</th>
                            <th class='quota'>Quota</th>
                            <th class='action'>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="empty">
                    </tbody>
                </table>
                <div class="form-group update">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
            
            <br>
            <div class="msg empty" id="companies_0"></div>
            <div class="error_msg empty" id="companies_error"></div>
            
            <form action="" id="f_company_add" class="form-inline form-a">
                <div><input hidden name="id" value=""></div>
                <h3>Add new company</h3>
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="Company Name" minlength="3" size="35" required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="quota" placeholder="Quota" size="6" required> <span>TB</span>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Save</button>
                </div>
                
            </form>
            <p class="add">[<a href='' id='company_add'>add</a>]</p>
        </div>
        <!-- COMPANIES END -->

       
        <!-- USERS -->        
        <div id="users" class="page">
            <h1>Users</h1>
            <form action="" id="f_users" class="form-b">
                <table class="table_db" id="users_table">
                    <thead>
                        <tr>
                            <th class='name'>User name</th>
                            <th class='email'>Email</th>
                            <th class='company'>Company</th>
                            <th class='action'>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="empty">
                    </tbody>
                </table>
                <div class="form-group update">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
            
            <br>
            <div class="msg empty" id="users_0"></div>
            <div class="error_msg empty" id="users_error"></div>
            
            <form action="" id="f_user_add" class="form-inline form-a">
                <div><input hidden name="id" value=""></div>
                <h3>Add new user</h3>
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="User Name" minlength="3" size="20" required>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email" size="25" required>
                </div>
                <div class="form-group">
                    <select name="company" required class="empty form-control"></select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Save</button>
                </div>
                
            </form>
            <p class="add">[<a href='' id='user_add'>add</a>]</p>
        </div>
        <!-- USERS END -->
               
               
        <!-- ABUSERS -->                
        <div id="abusers" class="page">
            <h1>Abusers</h1>
            <form action="" id="f_report" class="form-inline">
                <div class="form-group">
                    <label for="month">Choose a month:</label>
                    <select name="month" id="month" class="form-control"></select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Show Report</button>
                </div>
                <br><br>
                <div class="form-group">
                    <button type="reset" class="btn btn-success">Generate Data</button>
                </div>
            </form>
            <br>
            <div class="msg empty" id="log_0"></div>
            <div class="error_msg empty" id="abusers_error"></div>
            
            <div id="abusers_report">
                <h2>Report for <b class="empty"></b></h2>
                <table class="table_r">
                    <thead>
                        <tr><th class="company">Company</th><th class="quota">Used</th><th class="quota">Quota</th></tr>
                    </thead>
                    <tbody class="empty"></tbody>
                </table>
            </div>
        </div>
        <!-- ABUSERS END-->
        
    </div>
    
    <aside id="main_nav">
        <nav class="main_nav">
            <h2>PAGES</h2>
            <ul id="pages">
                <li><a href="#companies">Companies</a></li>
                <li><a href="#users">Users</a></li>
                <li><a href="#abusers">Abusers</a></li>
            </ul>
        </nav>
    </aside>

    <nav class="navbar navbar-default navbar-fixed-bottom">
        <p class="main_footer">&copy; 2017 Copyright by Vladimir Dyrda</p>
    </nav>

    <script src="vendors/jquery/jquery-3.1.1.min.js"></script>
    <script src="vendors/bootstrap/js/bootstrap.min.js"></script>
    <script src="vendors/jquery-validation/jquery.validate.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
    
