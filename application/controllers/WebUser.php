<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

/**
 * Class : User (UserController)
 * User Class to control all user related operations.
 * @author : Kishor Mali
 * @version : 1.1
 * @since : 15 November 2016
 */
class WebUser extends BaseController
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('login_model');
        $this->load->library('form_validation');
    }

/*Apoorv */
function addUserWeb()
    {
     
            $this->load->library('form_validation');
            $this->form_validation->set_rules('email','Email','trim|required|valid_email|max_length[128]');
            
           
                $username = $this->input->post('username');
                $name = $this->input->post('name');
                $email = strtolower($this->security->xss_clean($this->input->post('email')));
                $mobile = $this->security->xss_clean($this->input->post('phone'));
                $business_type = $this->input->post('business_type');
                $referal_type = $this->input->post('referal_type');
                $password = $this->input->post('password');
                $c_password = $this->input->post('cpassword');
                $roleId = 3;
                
                if(empty($username) || $username =='') {
                    echo json_encode(["st"=>301,"msg"=>"The Username field is required"]);
                }
                else if(empty($name) || $name =='') {
                    echo json_encode(["st"=>302,"msg"=>"The First/ Last  name field is required"]);
                }
                else if(empty($email) || $email =='') {
                    echo json_encode(["st"=>303,"msg"=>"The Email  field is required"]);
                }
                else if($this->form_validation->run() === FALSE)
                {
                echo json_encode(['st' => 304, "msg" => validation_errors()]);
                }
                else if(empty($mobile) || $mobile =='') {
                    echo json_encode(["st"=>305,"msg"=>"The Phone field is required"]);
                }
                else if(empty($business_type) || $business_type =='') {
                    echo json_encode(["st"=>306,"msg"=>"The Bussiness Type   field is required"]);
                }
                else if(empty($referal_type) || $referal_type =='') {
                    echo json_encode(["st"=>307,"msg"=>"The  field is required"]);
                }
                else if(empty($password) || $password =='') {
                    echo json_encode(["st"=>308,"msg"=>"The Password  name field is required"]);
                }
                else if($password != $c_password) {
                    echo json_encode(["st"=>309,"msg"=>"The Password and Confirm Password are not matched"]);
                }
                else {
                 
                $userInfo = array(
                                'user_name'=>$username,
                                'name'=> $name,
                                'email'=>$email,
                                'mobile'=>$mobile,
                                'bussiness_type'=>$business_type,
                                'find_us'=>$referal_type,
                                'password'=>getHashedPassword($password), 
                                'roleId'=>$roleId,   
                                'createdBy'=>1, 
                                'createdDtm'=>date('Y-m-d H:i:s'));
                
                if($this->login_model->checkEmailExist($email)){
                    echo json_encode(["st"=>404,"msg"=>"You might have already created a Account with that Email"]);
                } else{
                $this->load->model('user_model');
                $result = $this->user_model->addNewUser($userInfo);
                
                if($result > 0)
                {
                    echo json_encode(["st"=>1,"msg"=>"Account Create Successfully"]);
                }
                else
                {
                    echo json_encode(["st"=>0,"msg"=>"User creation failed"]);
                }
                
                }
            }
        
    }

    function loginWeb(){
        
        $this->load->library('form_validation');
        $email = strtolower($this->security->xss_clean($_REQUEST['email']));
        $password = $this->input->post('password');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|max_length[128]|trim');
        if($this->form_validation->run() === FALSE)
        {
            echo json_encode(['st' => 403, "validation_error" => validation_errors()]);
        }
        else if($password == ''){
            echo json_encode(["st"=>401,"msg"=>"The Password field is required"]);
        } 
        else{

        $result = $this->login_model->loginMe($email, $password);

        if(!empty($result)){
        if($result->userId !=0 || $result->userId !=''){
            $lastLogin = $this->login_model->lastLoginInfo($result->userId);
                $sessionArray = array('userId'=>$result->userId,                    
                                        'role'=>$result->roleId,
                                        'roleText'=>$result->role,
                                        'name'=>$result->name,
                                        'lastLogin'=> $lastLogin->createdDtm,
                                        'isLoggedIn' => TRUE
                                );

                $this->session->set_userdata($sessionArray);
                unset($sessionArray['userId'], $sessionArray['isLoggedIn'], $sessionArray['lastLogin']);

                $loginInfo = array("userId"=>$result->userId, "sessionData" => json_encode($sessionArray), "machineIp"=>$_SERVER['REMOTE_ADDR'], "userAgent"=>getBrowserAgent(), "agentString"=>$this->agent->agent_string(), "platform"=>$this->agent->platform());

                $this->login_model->lastLogin($loginInfo);
                echo json_encode(["st"=>1,"msg"=>"Login Successfully"]);
                    //redirect('/dashboard');
            } } else{
             echo json_encode(["st"=>0,"msg"=>"The Email or Password you entered is incorrect"]);
        }
        }
    }
}



            

            

?>