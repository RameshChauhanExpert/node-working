<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
class Seller_dashboard extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('seller_dashboard_model');
	}

	 public function user_detail()
    {
          if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                     $response_data=fetch("user_master",$user_detail);
                     
                       $data=$this->seller_dashboard_model->seller_dashboard_detail($user_detail['user_id']);
                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]= $data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="";
                     }
                }
                      echo json_encode($response);
    }

    public function edit_profile()
    {
       if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                   $this->seller_dashboard_model->edit_profile($user_detail);
                    
                   $response['status']=200;
                   $response['data'][0]=(object) $user_detail;
                }
                echo json_encode($response);
    }

    public function change_password()
    {

        if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                   $response=$this->seller_dashboard_model->change_password($user_detail);
                    
                    if($response['status']==200)
                    {

                   $response['data'][0]=(object) $user_detail;
                    }

                   
                }
                echo json_encode($response);
    }
   
   
    public function edit_profile_image()
    {
         $response=$this->seller_dashboard_model->edit_profile_image($_FILES);
         echo json_encode($response);
    }


   public function seller_property_detail()
    {
           foreach ($_FILES as $key => $value) {
       $_FILES["file"]=$value;
      
       $parent_directory="property";
       $inner_folder=$_POST['property_id'];

         if (!file_exists('./uploads/'.$parent_directory)) {
          mkdir("./uploads/".$parent_directory,0777,TRUE);
          } 
          if(!file_exists('./uploads/'.$parent_directory."/".$inner_folder))
          {
                  mkdir('./uploads/'.$parent_directory."/".$inner_folder,0777, TRUE);
          }
              $config['upload_path']= './uploads/'.$parent_directory."/".$inner_folder."/";
                $config['allowed_types']        = 'jpg|png|jpeg';
                $config['max_size']             = 1000000000000000000000000000;
                $config['max_width']            = 1024000000000000000000000000;
                $config['max_height']           = 7680000000000000000000000000;
               $this->load->library('upload', $config);
              if ( ! $this->upload->do_upload('file'))
                {
                        $response['error'] = array('error' => $this->upload->display_errors());
                        $response["status"]=401;
                }
                else
                {         
                        $data = array('upload_data' => $this->upload->data());
                      $last_id=   insert("property_assets",["property_id"=>$inner_folder,"image_base_64"=>$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name']]);
                         $response["status"]=200;
                          $response["data"]= array('asset_id' =>$last_id,"property_id"=>$_POST['property_id'],"image_base_64"=>$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name'] );

                }

                echo json_encode($response);
}
  
  



    }


}

