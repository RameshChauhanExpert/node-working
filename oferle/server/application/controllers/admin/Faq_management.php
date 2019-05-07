<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Faq_management extends CI_Controller {
		
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

	public function fetch_all_faqs()
	{
		$detail=fetch("faqs");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function fetch_faqs(){ 
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("faq_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$faqData = $this->common_model->getSingleRow('faqs','faq_id',$data['faq_id']);
			if (!empty($faqData)) {
				$response['status'] = 200;
				$response['message'] = "Faqs details fetched successfully.";
				$response['data'] = $faqData;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Faqs record not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function add_faqs(){
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
				'user_type'=> (!empty($data['user_type']))?$data['user_type']:'',
				'question'=> (!empty($data['question']))?$data['question']:'',
				'answer'=> (!empty($data['answer']))?$data['answer']:'',
				'created_by'=> (!empty($data['user_id']))?$data['user_id']:1,
				'created_at'=> date('Y-m-d H:i:s'),
			);
			$id = $this->common_model->addData('faqs',$addData);
			$response['status'] = 200;
			$response['message'] = "Faqs details added successfully.";
			
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function update_faqs(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("faq_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('faqs','faq_id',$data['faq_id']);
			if (!empty($alreadyAdded)) {
				$updateData = array(
					'user_type'=> (!empty($data['user_type']))?$data['user_type']:$alreadyAdded->user_type,
					'question'=> (!empty($data['question']))?$data['question']:$alreadyAdded->question,
					'answer'=> (!empty($data['answer']))?$data['answer']:$alreadyAdded->answer,
					'updated_by'=> (!empty($data['created_at']))?$data['created_at']:'',
					'updated_at'=> date('Y-m-d H:i:s'),
				);
				$this->common_model->updateData('faqs',$updateData,'faq_id',$data['faq_id']);
				$response['status'] = 200;
				$response['message'] = "Faqs details updated successfully.";	
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, faq does not exist.";
			}
			
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There is some technical issue, please try again.";
		}
		echo json_encode($response);
	}

	public function delete_faq(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("faq_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('faqs','faq_id',$data['faq_id']);
			if (!empty($alreadyAdded)) {
				$this->common_model->deleteData('faqs','faq_id',$data['faq_id']);
				$response['status'] = 200;
				$response['message'] = "Faqs details deleted successfully.";	
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, faq does not exist.";
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