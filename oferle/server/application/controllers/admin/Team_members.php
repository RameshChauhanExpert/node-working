<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Team_members extends CI_Controller {
		
	function __construct()
    {
        parent::__construct();  
        $this->load->library('security');	
        $this->load->model('common_model');			
    }    

    //Start: Code for checking the Main Parameter
	function checkMainParameter($mainParamArray){
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
	function checkParameter($paramArray, $dataArr){
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

	public function fetch_team_members(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$faqData = $this->common_model->getSingleRow('team_members','id',$data['id']);
			if (!empty($faqData)) {
				$response['status'] = 200;
				$response['message'] = "Team members details fetched successfully.";
				$response['data'] = $faqData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Team members record not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function fetch_team()
	{
		$detail=fetch("team_members");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function add_team_members(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array();
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$addData = array(
				'name'=> (!empty($data['name']))?$data['name']:'',
				'position'=> (!empty($data['position']))?$data['position']:'',
				'facebook_url'=> (!empty($data['facebook_url']))?$data['facebook_url']:'',
				'twitter_url'=> (!empty($data['twitter_url']))?$data['twitter_url']:'',
				'linkedin_url'=> (!empty($data['linkedin_url']))?$data['linkedin_url']:'',
				'created_by'=> (!empty($data['user_id']))?$data['user_id']:1,
				'created_at'=> date('Y-m-d H:i:s'),
			);
			if (!empty($_FILES['image']['name']))
            {
                $this->load->library('upload');
                $config['upload_path'] = './uploads/cms/team_members';
                $config['allowed_types'] = 'gif|jpg|png|jpeg';  
                $config['max_size'] = '5120'; //in KB    
                $config['encrypt_name'] = TRUE;               
                // create directory if not exists
                if (!@is_dir('uploads/cms/team_members')) {
                  @mkdir('./uploads/cms/team_members', 0777, TRUE);
                }
                $this->upload->initialize($config);                  
                if ($this->upload->do_upload('image'))
                {
                  $img = $this->upload->data();
                  $addData['image'] = "cms/team_members/".$img['file_name'];    
                }
                else
                {
                  $data['Error'] = $this->upload->display_errors();
                  $this->form_validation->set_message('upload_invalid_filetype', 'Error Message');
                }
            }
            if (empty($data['Error'])) {
            	$id = $this->common_model->addData('team_members',$addData);
				$response['status'] = 200;
				$response['message'] = "Team members details added successfully.";
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
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function update_team_members(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('team_members','id',$data['id']);
			if (!empty($alreadyAdded)) {
				$updateData = array(
					'name'=> (!empty($data['name']))?$data['name']:$alreadyAdded->name,
					'position'=> (!empty($data['position']))?$data['position']:$alreadyAdded->position,
					'facebook_url'=> (!empty($data['facebook_url']))?$data['facebook_url']:$alreadyAdded->facebook_url,
					'twitter_url'=> (!empty($data['twitter_url']))?$data['twitter_url']:$alreadyAdded->twitter_url,
					'linkedin_url'=> (!empty($data['linkedin_url']))?$data['linkedin_url']:$alreadyAdded->linkedin_url,
					'updated_by'=> (!empty($data['created_at']))?$data['created_at']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				if (!empty($_FILES['image']['name']))
	            {
	                $this->load->library('upload');
	                $config['upload_path'] = './uploads/cms/team_members';
	                $config['allowed_types'] = 'gif|jpg|png|jpeg';  
	                $config['max_size'] = '5120'; //in KB    
	                $config['encrypt_name'] = TRUE;               
	                // create directory if not exists
	                if (!@is_dir('uploads/cms/team_members')) {
	                  @mkdir('./uploads/cms/team_members', 0777, TRUE);
	                }
	                $this->upload->initialize($config);                  
	                if ($this->upload->do_upload('image'))
	                {
	                  $img = $this->upload->data();
	                  $addData['image'] = "cms/team_members/".$img['file_name'];    
	                  // code for delete existing image
	                  if($alreadyAdded->image){
	                    @unlink(FCPATH.'uploads/'.$alreadyAdded->image);
	                  } 
	                }
	                else
	                {
	                  $data['Error'] = $this->upload->display_errors();
	                  $this->form_validation->set_message('upload_invalid_filetype', 'Error Message');
	                }
	            } 
	            if (empty($data['Error'])) {
	            	$this->common_model->updateData('team_members',$updateData,'id',$data['id']);
					$response['status'] = 200;
					$response['message'] = "Team members details updated successfully.";
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
				$response['message'] = "Sorry, team member does not exist.";
			}		
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function delete_team_members(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('team_members','id',$data['id']);
			if (!empty($alreadyAdded)) {
				$this->common_model->deleteData('team_members','id',$data['id']);
				$response['status'] = 200;
				$response['message'] = "Team members details deleted successfully.";	
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, team member does not exist.";
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
?>