<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

class Home extends BaseController
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
    }
    
    /**
     * This function used to load the first screen of the user
     */
    public function index(){
        // $this->global['pageTitle'] = 'CodeInsect : Dashboard';
        $this->load->view('home');
        // $this->loadViews("dashboard", $this->global, NULL , NULL);
    }
}

?>