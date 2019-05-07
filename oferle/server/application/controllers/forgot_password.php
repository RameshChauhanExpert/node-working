<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
class Forgot_password extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		
	}

   public function send_link()
   {

    if($user_detail= (array) json_decode($_POST['Data']))
    {     
         // $result=fetch("user_master",$user_detail );

                      $this->db->where("email",$user_detail['email']);
                      
                      $this->db->where('(user_type="Agent" OR user_type="Seller")');
                      $this->db->from("user_master");
                      $result= $this->db->get()->result();
          if(count($result)>0)
          {
	          $message="Hello,<br><br> Your account detail.<br><br>";
	          $message  .="Username :".$result[0]->email."<br> Password :".$result[0]->password;
	          email($result[0]->email,"Forgot password",$message);
	          $response['status']=200;
	          $response['message']="The email send on your registred email address.";
          }else
          {
              $response['status']=401;
          }
        

    }
      
       echo json_encode($response);

       
   
   }



}