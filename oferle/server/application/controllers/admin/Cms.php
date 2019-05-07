<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Cms extends CI_Controller {
		
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

	public function fetch_cms_home()
	{
		$detail=fetch("cms_home");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	/*public function fetch_cms_home(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array();
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$cmsHomeData = $this->common_model->getSingleRow('cms_home','id',1);
			if (!empty($cmsHomeData)) {
				$response['status'] = 200;
				$response['message'] = "Cms_home details fetched successfully.";
				$response['data'] = $cmsHomeData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Cms Home record not found.";
			}
			
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}*/

	public function add_cms_home(){
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
				'title'=> (!empty($data['title']))?$data['title']:'',
				'description'=> (!empty($data['description']))?$data['description']:'',
				'section1_title'=> (!empty($data['section1_title']))?$data['section1_title']:'',
				'section1_description'=> (!empty($data['section1_description']))?$data['section1_description']:'',
				'section1_title1'=> (!empty($data['section1_title1']))?$data['section1_title1']:'',
				'section1_desc1'=> (!empty($data['section1_desc1']))?$data['section1_desc1']:'',
				'section1_title2'=> (!empty($data['section1_title2']))?$data['section1_title2']:'',
				'section1_desc2'=> (!empty($data['section1_desc2']))?$data['section1_desc2']:'',
				'section1_title3'=> (!empty($data['section1_title3']))?$data['section1_title3']:'',
				'section1_desc3'=> (!empty($data['section1_desc3']))?$data['section1_desc3']:'',
				'section2_title'=> (!empty($data['section2_title']))?$data['section2_title']:'',
				'section3_title'=> (!empty($data['section3_title']))?$data['section3_title']:'',
				'section3_description'=> (!empty($data['section3_description']))?$data['section3_description']:'',
				'section4_title'=> (!empty($data['section4_title']))?$data['section4_title']:'',
				'section4_description'=> (!empty($data['section4_description']))?$data['section4_description']:'',
				'created_by'=> (!empty($data['user_id']))?$data['user_id']:'',
				'created_at'=> date('Y-m-d H:i:s'),
			);
			foreach ($_FILES as $key => $value) {
				if (!empty($key))
	            {   
	                $config['upload_path']          = "./uploads/cms/cms_home";
	                $config['allowed_types']        = 'gif|jpg|png|jpeg';
	                $config['encrypt_name']         = TRUE;

	                if (!@is_dir($config['upload_path'])) {
	                    @mkdir($config['upload_path'], 0777, TRUE);
	                }
	                            
	                $this->load->library('upload', $config);
	                $file_upload = array();
	                
                    $_FILES['Image']['name'] = $value['name'];
                    $_FILES['Image']['type'] = $value['type'];
                    $_FILES['Image']['tmp_name'] = $value['tmp_name'];
                    $_FILES['Image']['error'] = $value['error'];
                    $_FILES['Image']['size'] = $value['size'];
                    if ( $this->upload->do_upload('Image'))
                    { 
                        $imgdata = $this->upload->data();   
                        $addData[$key] = "cms/cms_home/".$imgdata['file_name'];
                    }
                    else
                    { 
                        $error = 'invalid image';
                        $response['status'] = "401";
						$response['message'] = "Invalid image! please try again!";
                    }
	            } 
			}
			if (empty($error)) {
				$id = $this->common_model->addData('cms_home',$addData);
				$response['status'] = 200;
				$response['message'] = "Cms_home details added successfully.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function update_cms_home(){ //echo 'post result '; print_r($_POST);  print_r($_FILES); exit;
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);	
		$post_data = (array) json_decode( $_POST['Data'] ); 
		//$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data); 
			$alreadyAdded = $this->common_model->getSingleRow('cms_home','id',$data['id']);
			if (!empty($alreadyAdded)) {
				foreach ($_FILES as $key => $value) {
					$array[] = $alreadyAdded->$key;
				}
				$updateData = array(
					'title'=> (!empty($data['title']))?$data['title']:$alreadyAdded->title,
					'description'=> (!empty($data['description']))?$data['description']:$alreadyAdded->description,
					'section1_title'=> (!empty($data['section1_title']))?$data['section1_title']:$alreadyAdded->section1_title,
					'section1_description'=> (!empty($data['section1_description']))?$data['section1_description']:$alreadyAdded->section1_description,
					'section1_title1'=> (!empty($data['section1_title1']))?$data['section1_title1']:$alreadyAdded->section1_title1,
					'section1_desc1'=> (!empty($data['section1_desc1']))?$data['section1_desc1']:$alreadyAdded->section1_desc1,
					'section1_title2'=> (!empty($data['section1_title2']))?$data['section1_title2']:$alreadyAdded->section1_title2,
					'section1_desc2'=> (!empty($data['section1_desc2']))?$data['section1_desc2']:$alreadyAdded->section1_desc2,
					'section1_title3'=> (!empty($data['section1_title3']))?$data['section1_title3']:$alreadyAdded->section1_title3,
					'section1_desc3'=> (!empty($data['section1_desc3']))?$data['section1_desc3']:$alreadyAdded->section1_desc3,
					'section2_title'=> (!empty($data['section2_title']))?$data['section2_title']:$alreadyAdded->section2_title,
					'section3_title'=> (!empty($data['section3_title']))?$data['section3_title']:$alreadyAdded->section3_title,
					'section3_description'=> (!empty($data['section3_description']))?$data['section3_description']:$alreadyAdded->section3_description,
					'section4_title'=> (!empty($data['section4_title']))?$data['section4_title']:$alreadyAdded->section4_title,
					'section4_description'=> (!empty($data['section4_description']))?$data['section4_description']:$alreadyAdded->section4_description,
					'updated_by'=> (!empty($data['user_id']))?$data['user_id']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				foreach ($_FILES as $key => $value) {
					if (!empty($key))
		            {   
		                $config['upload_path']          = "./uploads/cms/cms_home";
		                $config['allowed_types']        = 'gif|jpg|png|jpeg';
		                $config['encrypt_name']         = TRUE;

		                if (!@is_dir($config['upload_path'])) {
		                    @mkdir($config['upload_path'], 0777, TRUE);
		                }
		                            
		                $this->load->library('upload', $config);
		                $file_upload = array();
		                
	                    $_FILES['Image']['name'] = $value['name'];
	                    $_FILES['Image']['type'] = $value['type'];
	                    $_FILES['Image']['tmp_name'] = $value['tmp_name'];
	                    $_FILES['Image']['error'] = $value['error'];
	                    $_FILES['Image']['size'] = $value['size'];
	                    if ( $this->upload->do_upload('Image'))
	                    { 
	                        $imgdata = $this->upload->data();   
	                        $updateData[$key] = "cms/cms_home/".$imgdata['file_name'];
	                    }
	                    else
	                    { 
	                        $error = 'invalid image';
	                        $response['status'] = "401";
							$response['message'] = "Invalid image! please try again!";
	                    }
		            } 
				}
				if (empty($error)) {
					$this->common_model->updateData('cms_home',$updateData,'id',$data['id']);
					if(!empty($array)){
						foreach ($array as $key => $value) {
							@unlink(FCPATH.'uploads/'.$value);
						}
					} 
					$response['status'] = 200;
					$response['message'] = "Cms_home details updated successfully.";
				}
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, cms id is not correct.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function fetch_cms_about_us()
	{
		$detail=fetch("cms_about_us");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	/*public function fetch_cms_about_us(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$cmsAboutUsData = $this->common_model->getSingleRow('cms_about_us','id',$data['id']);
			if (!empty($cmsAboutUsData)) {
				$response['status'] = 200;
				$response['message'] = "Cms_about_us details fetched successfully.";
				$response['data'] = $cmsAboutUsData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Cms About Us record not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}*/

	public function update_cms_about_us(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('cms_about_us','id',$data['id']);
			if (!empty($alreadyAdded)) {
				foreach ($_FILES as $key => $value) {
					$array[] = $alreadyAdded->$key;
				}
				$updateData = array(
					'main_title'=> (!empty($data['main_title']))?$data['main_title']:$alreadyAdded->main_title,
					'section1_title'=> (!empty($data['section1_title']))?$data['section1_title']:$alreadyAdded->section1_title,
					'section1_description'=> (!empty($data['section1_description']))?$data['section1_description']:$alreadyAdded->section1_description,
					'section2_title'=> (!empty($data['section2_title']))?$data['section2_title']:$alreadyAdded->section2_title,
					'section2_description'=> (!empty($data['section2_description']))?$data['section2_description']:$alreadyAdded->section2_description,
					'section2_title1'=> (!empty($data['section2_title1']))?$data['section2_title1']:$alreadyAdded->section2_title1,
					'section2_desc1'=> (!empty($data['section2_desc1']))?$data['section2_desc1']:$alreadyAdded->section2_desc1,
					'section2_title2'=> (!empty($data['section2_title2']))?$data['section2_title2']:$alreadyAdded->section2_title2,
					'section2_desc2'=> (!empty($data['section2_desc2']))?$data['section2_desc2']:$alreadyAdded->section2_desc2,
					'section2_title3'=> (!empty($data['section2_title3']))?$data['section2_title3']:$alreadyAdded->section2_title3,
					'section2_desc3'=> (!empty($data['section2_desc3']))?$data['section2_desc3']:$alreadyAdded->section2_desc3,
					'section3_title'=> (!empty($data['section3_title']))?$data['section3_title']:$alreadyAdded->section3_title,
					'section3_description'=> (!empty($data['section3_description']))?$data['section3_description']:$alreadyAdded->section3_description,
					'section4_title'=> (!empty($data['section4_title']))?$data['section4_title']:$alreadyAdded->section4_title,
					'section4_description'=> (!empty($data['section4_description']))?$data['section4_description']:$alreadyAdded->section4_description,
					'updated_by'=> (!empty($data['user_id']))?$data['user_id']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				foreach ($_FILES as $key => $value) {
					if (!empty($key))
		            {   
		                $config['upload_path']          = "./uploads/cms/cms_about_us";
		                $config['allowed_types']        = 'gif|jpg|png|jpeg';
		                $config['encrypt_name']         = TRUE;

		                if (!@is_dir($config['upload_path'])) {
		                    @mkdir($config['upload_path'], 0777, TRUE);
		                }
		                            
		                $this->load->library('upload', $config);
		                $file_upload = array();
		                
	                    $_FILES['Image']['name'] = $value['name'];
	                    $_FILES['Image']['type'] = $value['type'];
	                    $_FILES['Image']['tmp_name'] = $value['tmp_name'];
	                    $_FILES['Image']['error'] = $value['error'];
	                    $_FILES['Image']['size'] = $value['size'];
	                    if ( $this->upload->do_upload('Image'))
	                    { 
	                        $imgdata = $this->upload->data();   
	                        $updateData[$key] = "cms/cms_about_us/".$imgdata['file_name'];
	                    }
	                    else
	                    { 
	                        $error = 'invalid image';
	                        $response['status'] = "401";
							$response['message'] = "Invalid image! please try again!";
	                    }
		            } 
				}
				if (empty($error)) {
					$this->common_model->updateData('cms_about_us',$updateData,'id',$data['id']);
					if(!empty($array)){
						foreach ($array as $key => $value) {
							@unlink(FCPATH.'uploads/'.$value);
						}
					} 
					$response['status'] = 200;
					$response['message'] = "Cms_about_us details updated successfully.";
				}
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, content does not exist.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function fetch_cms_how_it_works()
	{
		$detail=fetch("cms_how_it_works");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	/*public function fetch_cms_how_it_works(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$cmsAboutUsData = $this->common_model->getSingleRow('cms_how_it_works','id',$data['id']);
			if (!empty($cmsAboutUsData)) {
				$response['status'] = 200;
				$response['message'] = "Cms_how_it_works details fetched successfully.";
				$response['data'] = $cmsAboutUsData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Cms_how_it_works Us record not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}*/

	public function update_cms_how_it_works(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('cms_how_it_works','id',$data['id']);
			if (!empty($alreadyAdded)) {
				foreach ($_FILES as $key => $value) {
					$array[] = $alreadyAdded->$key;
				}
				$updateData = array(
					'main_title'=> (!empty($data['main_title']))?$data['main_title']:$alreadyAdded->main_title,
					'content'=> (!empty($data['content']))?$data['content']:$alreadyAdded->content,
					'title'=> (!empty($data['title']))?$data['title']:$alreadyAdded->title,
					'description'=> (!empty($data['description']))?$data['description']:$alreadyAdded->description,
					'step1_title'=> (!empty($data['step1_title']))?$data['step1_title']:$alreadyAdded->step1_title,
					'step1_desc'=> (!empty($data['step1_desc']))?$data['step1_desc']:$alreadyAdded->step1_desc,
					'step2_title'=> (!empty($data['step2_title']))?$data['step2_title']:$alreadyAdded->step2_title,
					'step2_desc'=> (!empty($data['step2_desc']))?$data['step2_desc']:$alreadyAdded->step2_desc,
					'step3_title'=> (!empty($data['step3_title']))?$data['step3_title']:$alreadyAdded->step3_title,
					'step3_desc'=> (!empty($data['step3_desc']))?$data['step3_desc']:$alreadyAdded->step3_desc,
					'step4_title'=> (!empty($data['step4_title']))?$data['step4_title']:$alreadyAdded->step4_title,
					'step4_desc'=> (!empty($data['step4_desc']))?$data['step4_desc']:$alreadyAdded->step4_desc,
					'step5_title'=> (!empty($data['step5_title']))?$data['step5_title']:$alreadyAdded->step5_title,
					'step5_desc'=> (!empty($data['step5_desc']))?$data['step5_desc']:$alreadyAdded->step5_desc,
					'updated_by'=> (!empty($data['user_id']))?$data['user_id']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				foreach ($_FILES as $key => $value) {
					if (!empty($key))
		            {   
		                $config['upload_path']          = "./uploads/cms/cms_how_it_works";
		                $config['allowed_types']        = 'gif|jpg|png|jpeg';
		                $config['encrypt_name']         = TRUE;

		                if (!@is_dir($config['upload_path'])) {
		                    @mkdir($config['upload_path'], 0777, TRUE);
		                }
		                            
		                $this->load->library('upload', $config);
		                $file_upload = array();
		                
	                    $_FILES['Image']['name'] = $value['name'];
	                    $_FILES['Image']['type'] = $value['type'];
	                    $_FILES['Image']['tmp_name'] = $value['tmp_name'];
	                    $_FILES['Image']['error'] = $value['error'];
	                    $_FILES['Image']['size'] = $value['size'];
	                    if ( $this->upload->do_upload('Image'))
	                    { 
	                        $imgdata = $this->upload->data();   
	                        $updateData[$key] = "cms/cms_how_it_works/".$imgdata['file_name'];
	                    }
	                    else
	                    { 
	                        $error = 'invalid image';
	                        $response['status'] = "401";
							$response['message'] = "Invalid image! please try again!";
	                    }
		            } 
				}
				if (empty($error)) {
					$this->common_model->updateData('cms_how_it_works',$updateData,'id',$data['id']);
					if(!empty($array)){
						foreach ($array as $key => $value) {
							@unlink(FCPATH.'uploads/'.$value);
						}
					} 
					$response['status'] = 200;
					$response['message'] = "Cms how it works details updated successfully.";
				}
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, content does not exist.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function fetch_cms_faqs_both()
	{
		$detail=fetch("cms_faqs");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function fetch_cms_faqs(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$cmsAboutUsData = $this->common_model->getSingleRow('cms_faqs','id',$data['id']);
			if (!empty($cmsAboutUsData)) {
				$response['status'] = 200;
				$response['message'] = "Cms_faqs details fetched successfully.";
				$response['data'] = $cmsAboutUsData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Cms_faqs Us record not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function update_cms_faqs(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('cms_faqs','id',$data['id']);
			if (!empty($alreadyAdded)) {
				foreach ($_FILES as $key => $value) {
					$array[] = $alreadyAdded->$key;
				}
				$updateData = array(
					'main_title'=> (!empty($data['main_title']))?$data['main_title']:$alreadyAdded->main_title,
					'content_title'=> (!empty($data['content_title']))?$data['content_title']:$alreadyAdded->content_title,
					'description'=> (!empty($data['description']))?$data['description']:$alreadyAdded->description,
					'updated_by'=> (!empty($data['user_id']))?$data['user_id']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				foreach ($_FILES as $key => $value) {
					if (!empty($key))
		            {   
		                $config['upload_path']          = "./uploads/cms/cms_faqs";
		                $config['allowed_types']        = 'gif|jpg|png|jpeg';
		                $config['encrypt_name']         = TRUE;

		                if (!@is_dir($config['upload_path'])) {
		                    @mkdir($config['upload_path'], 0777, TRUE);
		                }
		                            
		                $this->load->library('upload', $config);
		                $file_upload = array();
		                
	                    $_FILES['Image']['name'] = $value['name'];
	                    $_FILES['Image']['type'] = $value['type'];
	                    $_FILES['Image']['tmp_name'] = $value['tmp_name'];
	                    $_FILES['Image']['error'] = $value['error'];
	                    $_FILES['Image']['size'] = $value['size'];
	                    if ( $this->upload->do_upload('Image'))
	                    { 
	                        $imgdata = $this->upload->data();   
	                        $updateData[$key] = "cms/cms_faqs/".$imgdata['file_name'];
	                    }
	                    else
	                    { 
	                        $error = 'invalid image';
	                        $response['status'] = "401";
							$response['message'] = "Invalid image! please try again!";
	                    }
		            } 
				}
				if (empty($error)) {
					$this->common_model->updateData('cms_faqs',$updateData,'id',$data['id']);
					if(!empty($array)){
						foreach ($array as $key => $value) {
							@unlink(FCPATH.'uploads/'.$value);
						}
					} 
					$response['status'] = 200;
					$response['message'] = "Cms_faqs details updated successfully.";
				}
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, content does not exist.";
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