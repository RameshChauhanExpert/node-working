<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 header("Access-Control-Allow-Origin: *");
class User_management extends CI_Controller {

	function __construct()
    {
        parent::__construct();  
        $this->load->library('security');	
        $this->load->model('common_model');	
        $this->load->model('user_management_model');	
    } 

    //Start: Code for checking the Main Parameter
	function checkMainParameter($mainParamArray)
	{
		foreach ($mainParamArray as $value) {
			$param = explode('~', $value);
			$this->form_validation->set_rules($param[0], $param[1], 'required');
		}

		if($this->form_validation->run() == FALSE){
			$response["status"] = FALSE;
			$response["code"] = '401';
			$response["message"] = validation_errors();
			echo json_encode($response);
			exit;
		}
	}
	//End: Code for checking the Main Parameter

	//Start: Code for checking Parameter
	function checkParameter($paramArray, $dataArr)
	{
		$flag = TRUE;
		$mesg = "";
		$required_flag = 0;
		$blank_flag = 0;
		foreach ($paramArray as $value) {
			if( !(array_key_exists($value, $dataArr)) ){
				$mesg .= "Parameter ".$value." is required.<br>";
				$required_flag = $required_flag + 1;
			}
			else{
				if("" === $dataArr[$value]){
					$mesg .= "Parameter ".$value." should not be blank.<br>";
					$blank_flag = $blank_flag + 1;
				}
			}
		}
		
		if ($required_flag > 0) {
			$flag = FALSE;
		}
		if ($blank_flag > 0) {
			$flag = FALSE;
		}

		if(FALSE == $flag) {
			$response["status"] = $flag;
			$response["code"] = '401';
			$response["message"] = rtrim($mesg, "<br>");
			echo json_encode($response);
			exit;
		}
		return $flag;
	}
	//End: Code for checking Parameter
		
	public function fetch_seller_detail()
	{
		$detail=fetch("user_master",["user_type"=>"Seller"]);
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function fetch_buyer_detail()
	{
		$detail=fetch("user_master",["user_type"=>"Buyer"]);
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function add_user()
	{
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		//$post_data = array_map('trim',$post_data);
		$paramArray = array("first_name","last_name","company_name","email","phone","password","user_type");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{		
			$data = $this->security->xss_clean($post_data);
			$count = $this->common_model->getNumRows('email',trim($data['email']),'user_master');
			if ($count == 0) {
	            $addData = array(
	            	'first_name' => (!empty($data['first_name']))?trim($data['first_name']):'',
	            	'last_name' => (!empty($data['last_name']))?trim($data['last_name']):'',
	            	'company_name' => (!empty($data['company_name']))?trim($data['company_name']):'',
	            	'email' => (!empty($data['email']))?trim($data['email']):'',
	            	'phone' => (!empty($data['phone']))?trim($data['phone']):'',
	            	'password' => trim($data['password']),
	            	'user_type' => trim($data['user_type']),
	            	/*'user_image' => (!empty($data['user_image']))?trim($data['user_image']):'',*/
	            	'interested_counties' => (!empty($data['interested_counties']))?json_encode($data['interested_counties']):'',
	            	'interested_properties' => (!empty($data['interested_properties']))?json_encode($data['interested_properties']):'',
	            	'years_experience' => (!empty($data['years_experience']))?trim($data['years_experience']):'',
	            	'recent_properties' => (!empty($data['recent_properties']))?trim($data['recent_properties']):'',
	            	'proof_of_funds' => (!empty($data['proof_of_funds']))?trim($data['proof_of_funds']):'',
	            	'other_notes' => (!empty($data['other_notes']))?trim($data['other_notes']):'',
	            	'status' => 1,
	            	'isAdmin' => (trim($data['user_type']) == 'Admin')?1:0 ,
	            );
	            if (!empty($_FILES['user_image']['name']))
	            {
					$this->load->library('upload');
					$config['upload_path'] = './uploads/UserImages';
					$config['allowed_types'] = 'jpg|jpeg|png';  
					$config['max_size'] = '5120'; //in KB                   
					// create directory if not exists
					if (!@is_dir('uploads/UserImages')) {
						@mkdir('./uploads/UserImages', 0777, TRUE);
					}
					$this->upload->initialize($config);                  
					if ($this->upload->do_upload('user_image'))
					{
						$img = $this->upload->data();
						// code for resize image
						//compress('./uploads/UserImages/'.$img['file_name'], './uploads/UserImages/'.$img['file_name'], 60);
						$addData['user_image'] = "UserImages/".$img['file_name'];   
					}
					else
					{
						$data['Error'] = $this->upload->display_errors();
					}   
	            }
	            if (empty($data['Error'])) {
	            	$user_id = $this->common_model->addData('user_master',$addData);
					$response['message'] = trim($data['user_type'])." added successfully.";
					$response['status'] = 200;
	            }
	            else
	            {
	            	$response['status'] = "401";
					$response['message'] = $data['Error'];
	            }
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Email already exists.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);
	}

	public function fetch_user_details(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array("user_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{		
			$data = $this->security->xss_clean($post_data);
			$details = $this->common_model->getSingleRow('user_master','user_id',$data['user_id']);
			$response['message'] = "User details fetched successfully.";
			$response['status'] = 200;
			$response['data'] = (array)$details;
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);
	}

	public function detail_update()
	{ 	
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$paramArray = array("user_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data); 
			$wherearray = array('email'=>trim($data['email']));
			$count = $this->user_management_model->checkAlreadyExist($wherearray,$data['user_id']);
			
			if ($count == 0) { 
				$getRecord = $this->common_model->getSingleRow('user_master','user_id',$data['user_id']);
				if (!empty($getRecord)) {
					if ($data['password'] == $data['confirm_password']) {
						$updateData = array(
			            	'first_name' => (!empty($data['first_name']))?trim($data['first_name']):$getRecord->first_name,
			            	'last_name' => (!empty($data['last_name']))?trim($data['last_name']):$getRecord->last_name,
			            	'company_name' => (!empty($data['company_name']))?trim($data['company_name']):$getRecord->company_name,
			            	'email' => (!empty($data['email']))?trim($data['email']):$getRecord->email,
			            	'phone' => (!empty($data['phone']))?trim($data['phone']):$getRecord->phone,
			            	'password' => (!empty($data['password']))?trim($data['password']):$getRecord->password,
			            	'user_type' => (!empty($data['user_type']))?trim($data['user_type']):$getRecord->user_type,
			            	'interested_counties' => (!empty($data['interested_counties']))?json_encode($data['interested_counties']):$getRecord->interested_counties,
			            	'interested_properties' => (!empty($data['interested_properties']))?json_encode($data['interested_properties']):$getRecord->interested_properties,
			            	'years_experience' => (!empty($data['years_experience']))?trim($data['years_experience']):$getRecord->years_experience,
			            	'recent_properties' => (!empty($data['recent_properties']))?trim($data['recent_properties']):$getRecord->recent_properties,
			            	'proof_of_funds' => (!empty($data['proof_of_funds']))?trim($data['proof_of_funds']):$getRecord->proof_of_funds,
			            	'other_notes' => (!empty($data['other_notes']))?trim($data['other_notes']):$getRecord->other_notes,
			            	'status' => ($data['status'] == 1)?1:0,
			            	'isAdmin' => (trim($data['user_type']) == 'Admin')?1:0 ,
			            	'updated_at' => date('Y-m-d h:i:s')
			            );

			            if (!empty($_FILES['user_image']['name']))
			            {
			                $this->load->library('upload');
			                $config['upload_path'] = './uploads/UserImages';
			                $config['allowed_types'] = 'gif|jpg|png|jpeg';  
			                $config['max_size'] = '5120'; //in KB    
			                $config['encrypt_name'] = TRUE;               
			                // create directory if not exists
			                if (!@is_dir('uploads/UserImages')) {
			                  @mkdir('./uploads/UserImages', 0777, TRUE);
			                }
			                $this->upload->initialize($config);                  
			                if ($this->upload->do_upload('user_image'))
			                {
			                  $img = $this->upload->data();
			                  $updateData['user_image'] = "UserImages/".$img['file_name'];   
			                  // code for delete existing image
			                  if(!empty($getRecord->user_image)){
			                    @unlink(FCPATH.'uploads/'.$getRecord->user_image);
			                  }  
			                }
			                else
			                {
			                  $data['Error'] = $this->upload->display_errors();
			                }   
			            }   
			            if (empty($data['Error'])) {
			            	$this->db->where('user_id',$data['user_id']);
							$this->db->update('user_master', $updateData);
							$response['status'] = 200;
							$response['message'] = "User details updated successfully.";
			            }
			            else
			            {
			            	$response['status'] = "401";
							$response['message'] = $data['Error'];
			            }
			        }
					else
					{
						$response['status'] = "401";
						$response['message'] = "Password and confirm password do not match.";
					} 
				}
				else
				{
					$response['status'] = "401";
					$response['message'] = "Record not found.";
				}
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "This email is already taken, kindly use other email.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}
}

