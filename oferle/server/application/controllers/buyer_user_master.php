<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
class Buyer_user_master extends CI_Controller {
    
function __construct()
    {
        parent::__construct();
        $this->load->model('buyer_user_master_model');
    }

    public function buyer_login()
    {     
            if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                     $user_detail['isAdmin']=0;
                     $user_detail['user_type']="Buyer";
                     $response_data=fetch("user_master",$user_detail);

                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]=$response_data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="There was an error with your E-Mail/Password combination. Please try again.";
                     }
                      
                }
                echo json_encode($response);
    }


    
    public function forgot_password()
    {
    	if($user_detail= (array) json_decode($_POST['Data']))
    	{
    		
    		$user_detail['user_type']="Buyer";
    		$response_data=fetch("user_master",$user_detail);
    		if(count($response_data)>0)
    		{
              $message="Hello,<br><br> Your account detail.<br><br>";
	          $message  .="Username :".$response_data[0]->email."<br> Password :".$response_data[0]->password;
	          email($response_data[0]->email,"Forgot password",$message);
	          $response['status']=200;
	          $response['message']="The email send on your registred email address.";
    		
    		}else
    		{
 $response['status']=401;
    		}

    		
    	}
    	 echo json_encode($response);

    }

     public function edit_profile()
    {
       if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                  $response= $this->buyer_user_master_model->edit_profile($user_detail);
                    if($response['status']==200)
                    {
                      $response['status']=200;
                      $response['data'][0]=(object) $user_detail;
                 }
                echo json_encode($response);
                 }
    }




}


?>