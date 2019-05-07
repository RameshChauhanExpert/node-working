<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Property_info extends CI_Controller {
		
	function __construct()
    {
        parent::__construct();  
        $this->load->library('security');	
        $this->load->model('common_model');	
        $this->load->model('property_info_model');	
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

	public function fetch_detail(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array("property_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{		
			$data = $this->security->xss_clean($post_data);
            $result['details'] = $this->property_info_model->getPropertyDetails($data['property_id']);
            $result['property_offers'] = $this->property_info_model->getPropertyOffers($data['property_id']);
            $result['user_info'] = $this->common_model->getSingleRow('user_master','user_id',$result['details']->user_id);
            $result['property_images'] = $this->common_model->getMultipleRows('property_assets','property_id',$data['property_id']);
			$response['message'] = "Property details fetched successfully.";
			$response['status'] = 200;
			$response['data'] = $result;
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);
	}

	public function property_listing()
	{
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		//$post_data = array_map('trim',$post_data);
		$paramArray = array();
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$county_id = array();
			if (!empty($data['county_id'])) {
				foreach ($data['county_id'] as $key => $value) {
					$county_details = $this->common_model->getSingleRow('offerlane_county_zone','county_name',$value.' County');
					$county_id[] = $county_details->county_id;
				}
			}
			$property_type_id = array();
			if (!empty($data['property_type_id'])) {
				foreach ($data['property_type_id'] as $key => $value) {
					$property_details = $this->common_model->getSingleRow('property_types','property_type',$value);
					$property_type_id[] = $property_details->property_type_id;
				}
			}
			$properties = $this->property_info_model->getFilteredProperty(trim($data['user_id']),trim($data['state']),$county_id,$property_type_id,trim($data['bed']),trim($data['bath']),trim($data['sqftFrom']),trim($data['sqftTo']),trim($data['limit']),trim($data['offset']));
			$TotalCount = $this->property_info_model->getPropertyTotalCount(trim($data['user_id']),trim($data['state']),$county_id,$property_type_id,trim($data['bed']),trim($data['bath']),trim($data['sqftFrom']),trim($data['sqftTo']));
			$details = array();
			if (!empty($properties)) {
				foreach ($properties as $key => $value) {
					$property_image = $this->property_info_model->getPropertyMainImage($value->property_id);
					$property_notification = $this->property_info_model->getNotificationCount($value->property_id);
            		$property_offers = $this->common_model->getMultipleRows('offers','property_id',$value->property_id);

					$details[] = array(
						'property_main_image'=> (!empty($property_image->image_base_64))?$property_image->image_base_64:'',
						'notification_count' => (!empty($property_notification->notification_count))?$property_notification->notification_count:'',
						'property_details' => $value,
						'property_offers' => (!empty($property_offers))?$property_offers:'',
					);
					$response['message'] = "Property details fetched successfully.";
					$response['status'] = 200;
					$response['total_count'] = $TotalCount;
					$response['data'] = $details;
					
				}
				
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Property not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);	
	}

	public function delete_property(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array("property_id");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{
			$data = $this->security->xss_clean($post_data);
			$count = $this->common_model->getNumRows('property_id',$data['property_id'],'properties');
			if ($count > 0) {
				$this->property_info_model->deleteProperty($data['property_id']);
				$response['message'] = "Property deleted successfully.";
				$response['status'] = 200;
			}
			else{
				$response['status'] = "401";
				$response['message'] = "Property does not exist.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);
	}

	public function update_status(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array("property_id","property_status");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{
			$data = $this->security->xss_clean($post_data);
			$count = $this->common_model->getNumRows('property_id',$data['property_id'],'properties');
			if ($count > 0) {
				$statusData = array(
                  'property_status'=>$data['property_status'],
                );      
				$this->common_model->updateData('properties',$statusData,'property_id',$data['property_id']);
				$response['message'] = "Status updated successfully.";
				$response['status'] = 200;
			}
			else{
				$response['status'] = "401";
				$response['message'] = "Property does not exist.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);
	}

	public function add_offers(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array("user_id","property_id","price_offered","deposit_offered","inspection_days","closing_days");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$offerNum = $this->property_info_model->getOfferNum($data['property_id'],$data['user_id']);
			if ($offerNum == 0) {
				$addData = array(
	            	'user_id' => (!empty($data['user_id']))?trim($data['user_id']):'',
	            	'property_id' => (!empty($data['property_id']))?trim($data['property_id']):'',
	            	'price_offered' => (!empty($data['price_offered']))?trim($data['price_offered']):'',
	            	'deposit_offered' => (!empty($data['deposit_offered']))?trim($data['deposit_offered']):'',
	            	'inspection_days' => (!empty($data['inspection_days']))?trim($data['inspection_days']):'',
	            	'closing_days' => (!empty($data['closing_days']))?trim($data['closing_days']):'',
	            	'other_offer_terms' => (!empty($data['other_offer_terms']))?trim($data['other_offer_terms']):'',
	            	'offer_status' => (!empty($data['offer_status']))?trim($data['offer_status']):0,
	            );
	            $user_id = $this->common_model->addData('offers',$addData);
	            $response['message'] = "Offer added successfully.";
				$response['status'] = 200;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Your offer has already been made, you can edit your offers on your dashboard.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);	
	}

	public function property_management_prop_listing(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		$post_data = array_map('trim',$post_data);
		$paramArray = array();
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			$properties = $this->property_info_model->getFilteredAdminProperty($data['property_id'],$data['property_title'],$data['seller_name'],$data['property_status'],trim($data['limit']),trim($data['offset']));
			if (!empty($properties)) {
				$response['message'] = "Property details fetched successfully.";
				$response['status'] = 200;
				$response['data'] = $properties;
			}
			else
			{
				$response['status'] = "401";
				$response['message'] = "Properties not found.";
			}
		}
		else
		{
			$response['status'] = "401";
			$response['message'] = "There are some technical issue,please try again.";
		}
		echo json_encode($response);	
	}

	public function get_latitude_longitude(){
		$mainParamArray = array("Data~Data");
		$this->checkMainParameter($mainParamArray);
		$post_data = (array) json_decode( $_POST['Data'] );
		//print_r($post_data); exit;
		$post_data = array_map('trim',$post_data);
		$paramArray = array("address");
		$this->checkParameter($paramArray, $post_data);

		if(!empty($post_data))
		{	
			$data = $this->security->xss_clean($post_data);
			if(isset($data['address'])){
				$address = $data['address']; //print_r($address); exit;
				$url = "https://maps.google.com/maps/api/geocode/json?address=".urlencode($address)."&key=AIzaSyBIADAzOmD-_UsCp1pU6LSmlp50Rp943KA";
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    
				$responseJson = curl_exec($ch);
				curl_close($ch);
				$response = json_decode($responseJson);	
				if ($response->status == 'OK') {
					$latitude = $response->results[0]->geometry->location->lat;
					$longitude = $response->results[0]->geometry->location->lng;
					echo $res = json_encode(array('latitude'=>$latitude,'longitude'=>$longitude));
				} else {
					echo $response->status;
				}  
			}
		}
		//echo json_encode($response_address);	
	}
}