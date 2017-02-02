//  REST API access config
var security_id = "mG0^&T9aFer!7an%Gmg@DEda7Mg";

var rest_server_url = "http://vpndyrda/rest/";

var rest_company_url = rest_server_url + "company.php";
var rest_user_url = rest_server_url + "user.php";
var rest_log_url = rest_server_url + "log.php";


// After page loading
jQuery(function($) {
    $(document).ready(function(){
        
        setupPages();
        
    });
});

var KB = 1024;
var MB = 1024*KB;
var GB = 1024*MB;
var TB = 1024*GB;
var PB = 1024*TB;

// Shows size in KB, MB, GB, TB, PT
function Bsize(bytes, decimals=0) {
    for(var i=0, d=1; i < decimals; i++) { d *= 10; }
    if (bytes >= PB) return Math.round(d*bytes/PB)/d+' PB'
    else if (bytes >= TB) return Math.round(d*bytes/TB)/d+' TB'
    else if (bytes >= GB) return Math.round(d*bytes/GB)/d+' GB'
    else if (bytes >= MB) return Math.round(d*bytes/MB)/d+' MB'
    else if (bytes >= KB) return Math.round(d*bytes/KB)/d+' KB'
    else return bytes+' bytes';
}

// Setup page loading
function setupPages() {

    // Pages setup
    CompaniesPageSetup();
    UsersPageSetup();
    AbusersPageSetup();
    
    // set page loading
    $('#pages a').on('click', function(e) {
        e.preventDefault();
        
        // Current Page Unloading ...
        var oldPage = $('.page:visible').attr('id');
        
        if (oldPage == 'companies') {
            CompaniesPageUnload();
        } else if (oldPage == 'users') {
            UsersPageUnload();
        } else if (oldPage == 'abusers') {
            AbusersPageUnload();
        }
        
        // New Page Loading ...
        var newPage = $(this).attr('href').replace(/#/,'').toLowerCase();
        
        if (newPage == 'companies') {
            CompaniesPageLoad();
        } else if (newPage == 'users') {
            UsersPageLoad();
        } else if (newPage == 'abusers') {
            AbusersPageLoad();
        }
    });
}


/***********************
*   COMPANIES PAGE     *
***********************/
function CompaniesREST(ajax_data) {
    
    $('#companies .empty').empty();
    $.ajax({ 
        method: "POST",
        dataType: "json",
        url: rest_company_url,
        data: ajax_data,
    })
        .done(function( json ) {
            var table = $('#companies_table tbody');
            $(table).empty();
            if (!json.companies || json.companies.length==0) {
                $('#companies_0').append('<p>The list of companies is empty</p>');
            } else {
                $.each( json.companies, function( i, item ) {
                    var tr = '<tr data-id="'+item.id+'">';
tr += '<td class="name">';
tr += '<input disabled type="text" class="form-control" name="name" minlength="3" required size="35" value="'+item.name+'" data="'+item.name+'">';
tr += '</td>';
tr += '<td class="quota">';
tr += '<input disabled type="text" class="form-control" name="quota" required size="6" value="'+Math.round(item.quota/TB)+'" data="'+item.quota+'">';
tr += '<span>TB</span><b>'+Bsize(item.quota)+'</b></td>';
tr += '<td class="action">[<a href="" class="edit">edit</a>] &nbsp; [<a href="" class="delete">delete</a>]';
                    $(table).append(tr);
                });
            }
    })
        .fail(function( jqxhr, textStatus, error ) {
            $('#companies_error').append('<p><b>Error:</b> Cannot retrieve the list of companies</p>');
            console.log( "Request Failed: " + textStatus + ", " + error );
    });
}

// Companies page setup
function CompaniesPageSetup() {
    // ADD Company
    var form_id = '#f_company_add';
    $('#company_add').on('click', function(e) {
        e.preventDefault();
        $(form_id).find('input').val('');
        if ($(form_id).is(":hidden")) {
            $(form_id).slideDown();
        }
    });
    $(form_id).validate({
        debug: true,
        submitHandler: function(form) {
            var c_name = $(form).find('input[name="name"]').val();
            var c_quota = $(form).find('input[name="quota"]').val();
            if (parseInt(c_quota) > 0) {
                // Convert TB into bytes
                c_quota = parseInt(c_quota) * TB;
            }
            var ajax_data = {'action': "add_company", 'security': security_id, 'name': c_name, 'quota': c_quota};
            CompaniesREST(ajax_data);
            $(form).hide();
            return false;
        }
    });
    $(form_id).find('input[name="quota"]').rules("add", {number: true});
    
    // DELETE Company
    $(document).on('click', '#f_companies .delete', function(e) {
        e.preventDefault();
        $(form_id).hide();
        var id = parseInt($(this).parent().parent().attr('data-id'));
        var ajax_data = {'action': "delete_company", 'security': security_id, 'id': id};
        CompaniesREST(ajax_data);
    });
    
    // UPDATE Company
    var f_companies = '#f_companies';
    $(document).on('click', f_companies+' .edit', function(e) {
        e.preventDefault();
        $(form_id).hide();
        $(f_companies+' .update').show();
        $(f_companies+' td input').attr('disabled','disabled');
        var current_tr = $(this).parent().parent();
        $(current_tr).siblings().removeClass('active');
        $(current_tr).addClass('active').find('input').removeAttr('disabled');
        var td_quota = $(current_tr).find('td.quota');
        var quota = $(td_quota).find('input').attr('data');
        $(td_quota).find('input').val(Math.round(quota/TB));
        return true;
    });
    $(f_companies).validate({
        debug: true,
        submitHandler: function(form) {
            var current_tr = $(form).find('tr.active');
            var с_id = parseInt($(current_tr).attr('data-id'));
            var c_name = $(current_tr).find('input[name="name"]').val();
            var c_quota = $(current_tr).find('input[name="quota"]').val();
            if (parseInt(c_quota) > 0) {
                // Convert TB into bytes
                c_quota = parseInt(c_quota) * TB;
            }
            var ajax_data = {action: "update_company", 'security': security_id, 'id': с_id, 'name': c_name, 'quota': c_quota};
            CompaniesREST(ajax_data);
            return false;
        }
    })
}

// Companies page loading
function CompaniesPageLoad() {
    var ajax_data = {action: "get_all_companies", security: security_id};
    CompaniesREST(ajax_data);
    $('#pages a[href="#companies"]').addClass('active');
    $('#companies').show(150);
    $('#f_companies .update').hide();
}

// Companies page unloading
function CompaniesPageUnload() {
    $('#companies').hide();
    $('#f_company_add').hide();
    $('#pages a[href="#companies"]').removeClass('active');
}


/***********************
*     USERS PAGE       *
***********************/
function UsersREST(ajax_data) {
    
    $('#users .empty').empty();
    $.ajax({ 
        method: "POST",
        dataType: "json",
        url: rest_user_url,
        data: ajax_data,
    })
        .done(function( json ) {
            var table = $('#users_table tbody');
            $(table).empty();
            if (!json.users || json.users.length==0) {
                $('#users_0').append('<p>The list of users is empty</p>');
            } else {
                $.each( json.users, function( i, item ) {
                    var tr = '<tr data-id="'+item.id+'">';
tr += '<td class="name">';
tr += '<input disabled type="text" class="form-control" name="name" minlength="3" required size="30" value="'+item.name+'" data="'+item.name+'">';
tr += '</td>';
tr += '<td class="email">';
tr += '<input disabled type="text" class="form-control" name="email" required size="20" value="'+item.email+'" data="'+item.email+'">';
tr += '</td>';
tr += '<td class="company" data-id="'+item.company_id+'">';
tr += '<select name="company" class="empty form-control"></select>';
tr += '</td>';
tr += '<td class="action">[<a href="" class="edit">edit</a>] &nbsp; [<a href="" class="delete">delete</a>]';
                    $(table).append(tr);
                });
            }
            if (!json.companies || json.companies.length==0) {
                $('#users_error').append('<p>The list of companies is empty</p>');
            } else {
                var companies = new Array();
                var options = '<option value="0"></option>';
                $.each(json.companies, function( i, item ) {
                    companies[ item.id ] = item.name;
                    options += '<option value="'+item.id+'">'+item.name+'</option>';
                });
                $('#users select[name="company"]').append(options);
                $(table).find('select[name="company"]').each(function() {
                    var company_id = $(this).parent().attr('data-id');
                    var company_name = companies[company_id];
                    $('<span>'+company_name+'</span>').insertAfter(this); 
                });
            }
    })
        .fail(function( jqxhr, textStatus, error ) {
            $('#users_error').empty().append('<p><b>Error:</b> Cannot retrieve the list of users</p>');
            console.log( "Request Failed: " + textStatus + ", " + error );
    });
}

// Users page setup
function UsersPageSetup() {
    // ADD User
    var form_id = '#f_user_add';
    $('#user_add').on('click', function(e) {
        e.preventDefault();
        $(form_id+' input').val('');
        if ($(form_id).is(":hidden")) {
            $(form_id).slideDown();
        }
    });
    $(form_id).validate({
        debug: true,
        submitHandler: function(form) {
            var u_name = $(form).find('input[name="name"]').val();
            var u_email = $(form).find('input[name="email"]').val();
            var u_company_id = $(form).find('select[name="company"]').val();
            var ajax_data = {'action': "add_user", 'security': security_id, 'name': u_name, 'email': u_email, 'company_id': u_company_id};
            UsersREST(ajax_data);
            $(form).hide();
            return false;
        }
    });
    
    // DELETE User
    $(document).on('click', '#f_users .delete', function(e) {
        e.preventDefault();
        $(form_id).hide();
        var id = parseInt($(this).parent().parent().attr('data-id'));
        var ajax_data = {'action': "delete_user", 'security': security_id, 'id': id};
        UsersREST(ajax_data);
    });
    
    // UPDATE User
    var f_users = '#f_users';
    $(document).on('click', f_users+' .edit', function(e) {
        e.preventDefault();
        $(form_id).hide();
        $(f_users+' .update').show();
        $(f_users+' td input').attr('disabled','disabled');
        var current_tr = $(this).parent().parent();
        $(current_tr).siblings().removeClass('active');
        $(current_tr).addClass('active').find('input').removeAttr('disabled');
        return true;
    });
    $(f_users).validate({
        debug: true,
        submitHandler: function(form) {
            var current_tr = $(form).find('tr.active');
            var u_id = parseInt($(current_tr).attr('data-id'));
            var u_name = $(current_tr).find('input[name="name"]').val();
            var u_email = $(current_tr).find('input[name="email"]').val();
            var u_company_id = $(current_tr).find('select[name="company"]').val();
            var ajax_data = {action: "update_user", 'security': security_id, 'id': u_id, 'name': u_name, 'email': u_email, 'company_id': u_company_id};
            UsersREST(ajax_data);
            return false;
        }
    })
}
// Users page loading
function UsersPageLoad() {
    var ajax_data = {action: "get_all_users", security: security_id};
    UsersREST(ajax_data);
    $('#pages a[href="#users"]').addClass('active');
    $('#users').show(150);
    $('#f_users .update').hide();
}
// Users page unloading
function UsersPageUnload() {
    $('#users').hide();
    $('#f_user_add').hide();
    $('#pages a[href="#users"]').removeClass('active');
}


/***********************
*    ABUSERS PAGE      *
***********************/
function AbusersREST(ajax_data) {
    var form_id = '#f_report';
    $('#abusers .empty').empty();
    $('#abusers_report').hide();
    
    $.ajax({ method: "POST", dataType: "json",url: rest_log_url, data: ajax_data })
        .done(function( json ) {
            if (!json.months || json.months.length==0) {
                $('#log_0').append('<p>Transfer log is empty.</p>');
            } else {
                $(form_id+' select[name="month"]').empty();
                $.each( json.months, function( i, item ) {
                    $(form_id+' select[name="month"]').append('<option value="'+item.year+'-'+item.month+'">'+item.month_name+'</option>');
                });
            }
    })
        .fail(function( jqxhr, textStatus, error ) {
            $('#abusers_error').append('<p><b>Error:</b> Cannot retrieve the list of months</p>');
            console.log( "Request Failed: " + textStatus + ", " + error );
    });
}

// Abusers page setup
function AbusersPageSetup() {
    var form_id = '#f_report';

    // fill the dropdown with months selection
    var ajax_data = {'action': "get_all_months", 'security': security_id};
    AbusersREST(ajax_data);
    
    // set events triggers
    $(form_id).on('submit', function(e) {
        e.preventDefault();
        AbusersShowReport();
    }).on('reset', function(e) {
        e.preventDefault();
        ajax_data = {'action': "random_traffic", 'security': security_id};
        AbusersREST(ajax_data);
    });
}
// Abusers page loading
function AbusersPageLoad() {
    $('#abusers_report').hide();
    $('#abusers').show(150);
}
// Abusers page unloading
function AbusersPageUnload() {
    $('#abusers').hide();
}

function AbusersShowReport() {
    var form_id = '#f_report';
    var report_month_year = $(form_id+' select[name="month"]').val();
    var report_term = $(form_id+' select[name="month"] :selected').text();
    var report_year = report_month_year.substr(0,4);
    var report_month = report_month_year.substr(5,2);
    var ajax_data = {'action': "get_abusers", 'security': security_id, 'month': report_month, 'year': report_year};
    $('#abusers .empty').empty();
    $.ajax({ 
        method: "POST",
        dataType: "json",
        url: rest_log_url,
        data: ajax_data,
    })
        .done(function( json ) {
            if (!json.companies || json.companies.length==0) {
                $('#log_0').append('<p>No abusers.</p>');
            } else {
                var report = $('#abusers_report');
                $(report).find("h2 b").text(report_term);
                var table = $(report).find('table tbody');
                $.each( json.companies, function( i, item ) {
                    table.append('<tr><td>'+item.company_name+'</td><td>'+Bsize(item.company_used, 2)+'</td><td>'+Bsize(item.company_quota, 2)+'</td></tr>');
                });
                $(report).show();
            }
    })
        .fail(function( jqxhr, textStatus, error ) {
            $('#abusers_error').append('<p><b>Error:</b> Cannot retrieve the list of abusers</p>');
            console.log( "Request Failed: " + textStatus + ", " + error );
    });
}
