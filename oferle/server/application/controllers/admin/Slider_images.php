<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Slider_images extends CI_Controller {
		
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


	public function fetch_slider_images()
	{
		$detail=fetch("cms_slider_images");
		$response['status']=200;
		$response['data']=$detail;
		echo json_encode($response);      
	}

	public function add_slider_images()
	{ 
		if (!empty($_FILES['Images']['name']))
        {   
            $config['upload_path']          = "./uploads/cms/slider_images";
            $config['allowed_types']        = 'gif|jpg|png|jpeg';
            $config['encrypt_name']         = TRUE;

            if (!@is_dir($config['upload_path'])) {
                @mkdir($config['upload_path'], 0777, TRUE);
            }
                        
            $this->load->library('upload', $config);
            $file_upload = array();
            for($i=0;$i<count($_FILES['Images']['name']);$i++) 
            {
                $_FILES['Image']['name'] = $_FILES['Images']['name'][$i];
                $_FILES['Image']['type'] = $_FILES['Images']['type'][$i];
                $_FILES['Image']['tmp_name'] = $_FILES['Images']['tmp_name'][$i];
                $_FILES['Image']['error'] = $_FILES['Images']['error'][$i];
                $_FILES['Image']['size'] = $_FILES['Images']['size'][$i];
                if ( $this->upload->do_upload('Image'))
                {
                    $imgdata = $this->upload->data();   
                    $file_upload[] = array(
                        'image' => "cms/slider_images/".$imgdata['file_name'],
                        'created_by' => (!empty($data['user_id']))?$data['user_id']:1,
						'created_at'=> date('Y-m-d H:i:s'),
                    );
                }
                else
                { 
                    $data['Error'] = $this->upload->display_errors();
                }
            }
            if(empty($data['Error'])) 
            {
                $image_id = $this->common_model->insertBatch('cms_slider_images',$file_upload);
                $response['status'] = 200;
				$response['message'] = "Slider Images added successfully.";
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

	public function delete_slider_images(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] ); 
		$post_data = array_map('trim',$post_data);
		$paramArray = array("image_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$alreadyAdded = $this->common_model->getSingleRow('cms_slider_images','image_id',$data['image_id']);
			if (!empty($alreadyAdded)) {
				$this->common_model->deleteData('cms_slider_images','image_id',$data['image_id']);
				// code for delete existing image
				if($alreadyAdded->image){
					@unlink(FCPATH.'uploads/'.$alreadyAdded->image);
				} 
				$response['status'] = 200;
				$response['message'] = "Slider Image deleted successfully.";	
			}
			else
			{ 
				$response['status'] = "401";
				$response['message'] = "Sorry, slider image does not exist.";
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