    
$("#register").click(function(){
 var ids = ['username', 'name', 'email', 'phone', 'business_type', 'referal_type' ,'password' ,'confirm_password'];
  
   
   var userName           =  $('#username').val().trim();
   var email           =  $('#email').val().trim();
   var name                = $('#name').val().trim();
   var phoneNumber        =  $('#phone').val().trim();
   var business_type        =  $('#business_type').val().trim();
   var referal_type        =  $('#referal_type').val().trim();
   var password           =  $('#password').val().trim();
   var confirmPassword    =  $('#confirm_password').val().trim();
   
   removeValidations(ids);

if (name == "" || userName == "" || phoneNumber == "" || password == ""    || email =='' || business_type =='' || referal_type == '' || confirmPassword == "" ){
    

    if(userName == ""){
     $('#username_error').html('The Username field is required');
     $('#username').focus();
     
   }

    if(name == ""){
     $('#name_error').html('The First/ Last name field is required');
     $('#name').focus();
   }

   if(email == ""){
     $('#email_error').html('The Email field is required');
     $('#email').focus();
   }

   if(email.indexOf("@", 0) < 0){
     $('#email_error').html('The Email field must contain a valid email address.');
     $('#email').focus();
     
   }

   if(email.indexOf(".", 0) < 0){
     $('#email_error').html('The Email field must contain a valid email address.');
     $('#email').focus();
     
   }

   if(phoneNumber == ""){
     $('#phone_error').html('The Phone field is required');
     $('#phone').focus();
    
   }

   if(business_type == ""){
     $('#business_type_error').html('The Bussiness Type field is required');
     $('#business_type').focus();
    
   }

   if(referal_type == ""){
     $('#referal_type_error').html('The  field is required');
     $('#referal_type').focus();
    
   }


   if(password == ""){
     $('#password_error').html('The Password field is required');
     $('#password').focus();
     
   }
   if(confirm_password == ""){
     $('#confirm_password_error').html('The Confirm Password field is required');
     $('#confirm_password').focus();
     
   }

   return false;

}

   else if(email.indexOf("@", 0) < 0){
     $('#email_error').html('The Email field must contain a valid email address.');
     $('#email').focus();
     return false;
   }
   else if(email.indexOf(".", 0) < 0){
     $('#email_error').html('The Email field must contain a valid email address.');
     $('#email').focus();
     return false;
   }
  
   else if(isNaN(phoneNumber)){
     $('#phone_error').html('The Password field is required');
     $('#phone').focus();
     return false;
   }
   else if(phoneNumber.length >15){
     $('#phone_rror').html('Phone number must be in between 15 Digit');
     $('#phone').focus();
     return false;
   }
   else if(password != confirmPassword){
     $('#confirm_password_error').html("Password and Confirm Password are not matched");
     $('#confirm_password').focus();
     return false;
   }
   else{

      $.ajax({
      url: baseURL+'addUser',
      method: 'post',
      data: "username="+userName+'&name='+name+'&email='+email+'&phone='+phoneNumber+'&business_type='+business_type+'&referal_type='+referal_type+'&password='+password+'&cpassword='+confirmPassword,
      success: function(response) {
        var res = JSON.parse(response);
        if(res.st === parseInt(1)){
              $('#signupModel').modal('hide')   
              $('#loginModel').modal('show'); 
            }
          else if(res.st === parseInt(0)){
                $('#sign_up_err').html(res.msg);
                return false;
            }
          else if(res.st === parseInt(404)){
                $('#sign_up_err').html(res.msg);
                return false;
            }
          else if(res.st === parseInt(301)){
                $('#username_error').html(res.msg);
                $('#username').focus();
                return false;
            }
          else if(res.st === parseInt(302)){
                $('#name_error').html(res.msg);
                $('#name').focus();
                return false;
            }
          else if(res.st === parseInt(303)){
                $('#email_error').html(res.msg);
                $('#email').focus();
                return false;
            }
          else if(res.st === parseInt(304)){
                $('#email_error').html(res.msg);
                $('#email').focus();
                return false;
            }
          else if(res.st === parseInt(305)){
                $('#phone_error').html(res.msg);
                $('#phone').focus();
                return false;
            }
          else if(res.st === parseInt(306)){
                $('#business_type_error').html(res.msg);
                $('#business_type').focus();
                return false;
            }
          else if(res.st === parseInt(307)){
                $('#referal_type_error').html(res.msg);
                $('#referal_type').focus();
                return false;
            }
          else if(res.st === parseInt(308)){
                $('#password_error').html(res.msg);
                $('#password').focus();
                return false;
            }
          else if(res.st === parseInt(309)){
                $('#confirm_password_error').html(res.msg);
                $('#confirm_password').focus();
                return false;
            }

        }
      });                                                        

   }

})

function removeValidations(ids) {
    $(ids).each(function(index, key) {
        //console.log(index+'======'+key); 
        $("#" + key).keyup(function() {
            $("#" + key + "_error").html('');
        });

        $("#" + key).change(function() {
            $("#" + key + "_error").html('');
        });
    });
}
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}

$("#loginUser").click(function(){
 var ids = ['login_id','login_password'];
   var email           =  $('#login_id').val().trim();
   var password        = $('#login_password').val().trim();
   removeValidations(ids);
   if (email == "" || password == ""){
     if(email == ""){
     $('#login_id_error').html('The Email field is required');
     $('#login_id').focus();
     
   }

    if(password == ""){
     $('#login_password_error').html('The Password field is required');
     $('#login_password').focus();
   }
   return false;
   }
   else{
    $.ajax({
      url: baseURL+'loginWeb',
      method: 'post',
      data: "email="+email+'&password='+password,
      success: function(response) {
        var res = JSON.parse(response);
        if(res.st === parseInt(1)){
              window.location.href = "http://localhost/scott-project/dashboard";
              return false;  
            }
         else if(res.st === parseInt(403)){
              $('#login_id_error').html(res.validation_error);
              $('#login_id').focus();
              return false;  
            }
        else if(res.st === parseInt(401)){
              $('#login_password_error').html(res.msg);
              $('#login_password').focus(); 
              return false;  
            }
        else if(res.st === parseInt(0)){
              $('#login_error').html(res.msg);
              return false;   
            }

        }
      });         
   }                                          

})

function resetForm() {
   
    document.getElementById("login_form").reset();
    $('#login_id_error').html('');
    $('#login_password_error').html('');
    $('#login_error').html('');

}

function resetsignupForm(){
  document.getElementById("register_data").reset();
  $('#username_error').html('');
  $('#name_error').html('');
  $('#email_error').html('');
  $('#phone_error').html('');
  $('#business_type_error').html('');
  $('#referal_type_error').html('');
  $('#password_error').html('');
  $('#confirm_password_error').html('');
  $('#sign_up_err').html('');

}
