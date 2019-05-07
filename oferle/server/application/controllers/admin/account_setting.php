<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 header("Access-Control-Allow-Origin: *");
class Account_setting extends CI_Controller {

		


		public function detail_update()
		{ 
			if($account_data= (array) json_decode($_POST["Data"]))
			{

                 $this->db->where('account_setting_id',1);
				 $this->db->update('account_setting', $account_data);

                   $response['status']=200;
                   $response['message']="Account setting updated";

			}
			else{
				   $response['status']="401";
				   $response['message']="There are some technical issue,please try again.";
			}
			echo json_encode($response);
		}

		public function fetch_detail(){
                  
                  $detail=fetch("account_setting");
                  $response['status']=200;
                  $response['data']=$detail;

                  echo json_encode($response);
                  

		}


}

