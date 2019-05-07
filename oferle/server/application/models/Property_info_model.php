<?php
class Property_info_model extends CI_Model {
    function __construct()
    {
        parent::__construct();		
    }	
  
    public function getPropertyDetails($property_id){
        $this->db->select('properties.*,properties_condition.*,multifamily_units.*');
        $this->db->join('properties_condition','properties.property_id = properties_condition.property_id','left');
        $this->db->join('multifamily_units','properties.property_id = multifamily_units.property_id','left');
        $this->db->where('properties.property_id',$property_id);
        $result = $this->db->get('properties')->result(); 
        foreach ($result as $key => $value) {
            $result = $value;
        }
        return $result;
    }

    public function getPropertyMainImage($property_id)
    {   
        $this->db->select('image_base_64');
        $this->db->where('property_id',$property_id);  
        $this->db->where('main_image','Yes');      
        return $this->db->get('property_assets')->first_row();
    }

    public function getNotificationCount($property_id)
    {   
        $this->db->select('notification_count');
        $this->db->where('property_id',$property_id);  
        return $this->db->get('notifications')->first_row();
    }

    public function getPropertyOffers($property_id)
    {
        $this->db->select('offers.*,user_master.*');
        $this->db->join('user_master','offers.user_id = user_master.user_id','left');
        $this->db->where('property_id',$property_id);
        return $this->db->get('offers')->result();
    }

    public function getFilteredProperty($user_id=NULL,$state=NULL,$county_id=array(),$property_type_id=array(),$bed=NULL,$bath=NULL,$sqftFrom=NULL,$sqftTo=NULL,$limit=NULL, $start=NULL)
    {   
        $county_id_q = "";
        $count_county = count($county_id);
        
        $property_type_id_q = "";
        $count_property = count($property_type_id);

        $this->db->select('properties.*,multifamily_units.bedrooms,multifamily_units.bathrooms');
        $this->db->join('multifamily_units','multifamily_units.property_id = properties.property_id','left');
        
        if (!empty($user_id) && $user_id != '') {
            $this->db->where('user_id',$user_id);
        }
        if (!empty($bed)) {
            $this->db->where('multifamily_units.bedrooms',$bed);
        }
        if (!empty($bath)) {
            $this->db->where('multifamily_units.bathrooms',$bath);
        }
        if (!empty($sqftFrom) && !empty($sqftTo) ) {
            $this->db->where("(sq_ft >= ".$sqftFrom." AND sq_ft <= ".$sqftTo.")");       
        }
        if (!empty($sqftFrom) && empty($sqftTo)) {
            $this->db->where("(sq_ft >= ".$sqftFrom.")");
        }
        if (!empty($sqftTo) && empty($sqftFrom)) {
            $this->db->where("(sq_ft <= ".$sqftTo.")");
        }
        if (!empty($state)) {
            $this->db->where_in('state',$state);
        }
        if (!empty($county_id)) {
            $this->db->where_in('county_id',$county_id);
        }
        if (!empty($property_type_id)) {
            $this->db->where_in('property_type_id',$property_type_id);
        }

        /*if (!empty($state) || !empty($county_id) || !empty($property_type_id)) { 
            if (!empty($state)){
              $state = " state = '".$state."'";
            }
            if (!empty($county_id)){
                $close = ($count_county == 1)?')':'';
                $county_id_q = ($state) ?  " AND (county_id = ".$county_id[0]." ".$close." " : "(county_id = ".$county_id[0]." ".$close." ";
                for ($i=1; $i < $count_county ; $i++) { 
                    $close_brac = ($i == ($count_county - 1))?')':'';
                    $county_id_q .=  " OR county_id = ".$county_id[$i]." ".$close_brac." " ;
                }
            }
            if (!empty($property_type_id)){
                $close = ($count_property == 1)?')':'';
                $property_type_id_q = ($county_id || $state) ?   " AND (property_type_id=".$property_type_id[0]." ".$close." " : " (property_type_id=".$property_type_id[0]." ".$close." ";
                for ($i=1; $i < $count_property ; $i++) { 
                    $close_brac = ($i == ($count_property - 1))?')':'';
                    $property_type_id_q .=  " OR property_type_id = ".$property_type_id[$i]." ".$close_brac." " ;
                }
            }
           $this->db->where("(".$state.$county_id_q.$property_type_id_q.")"); 
        }*/

        if($limit!='' && $start!=''){
           $this->db->limit($limit, $start);
        }
        return $this->db->get('properties')->result();
    }

    public function getPropertyTotalCount($user_id=NULL,$state=NULL,$county_id=array(),$property_type_id=array(),$bed=NULL,$bath=NULL,$sqftFrom=NULL,$sqftTo=NULL)
    {   
        $county_id_q = "";
        $count_county = count($county_id);
        
        $property_type_id_q = "";
        $count_property = count($property_type_id);

        $this->db->select('properties.*,multifamily_units.bedrooms,multifamily_units.bathrooms');
        $this->db->join('multifamily_units','multifamily_units.property_id = properties.property_id','left');
        
        if (!empty($user_id) && $user_id != '') {
            $this->db->where('user_id',$user_id);
        }
        if (!empty($bed)) {
            $this->db->where('multifamily_units.bedrooms',$bed);
        }
        if (!empty($bath)) {
            $this->db->where('multifamily_units.bathrooms',$bath);
        }
        if (!empty($sqftFrom) && !empty($sqftTo) )
        {
            $this->db->where("(sq_ft >= ".$sqftFrom." AND sq_ft <= ".$sqftTo.")");       
        }
        if (!empty($sqftFrom) && empty($sqftTo)) {
            $this->db->where("(sq_ft >= ".$sqftFrom.")");
        }
        if (!empty($sqftTo) && empty($sqftFrom)) {
            $this->db->where("(sq_ft <= ".$sqftTo.")");
        }
        if (!empty($state)) {
            $this->db->where_in('state',$state);
        }
        if (!empty($county_id)) {
            $this->db->where_in('county_id',$county_id);
        }
        if (!empty($property_type_id)) {
            $this->db->where_in('property_type_id',$property_type_id);
        }
        return $this->db->get('properties')->num_rows();
    }

    public function getFilteredAdminProperty($property_id=NULL,$property_title=NULL,$seller_name=NULL,$property_status=NULL,$limit=NULL, $start=NULL)
    {
        $this->db->select("properties.property_id,properties.property_title,properties.property_status,user_master.first_name,user_master.last_name,CONCAT_WS( ' ',user_master.first_name ,user_master.last_name ) as name");
        $this->db->join('user_master','user_master.user_id = properties.user_id','left');
        
        if (!empty($property_id)) {
            $this->db->where('property_id',$property_id);
        }
        if (!empty($property_title)) {
            $this->db->like('property_title', $property_title);
        }
        if (!empty($seller_name)) {
            $this->db->where("(user_master.first_name LIKE '%".$seller_name."%' OR user_master.last_name LIKE '%".$seller_name."%')");
        }
        if ($property_status !== '') {
            $status = ($property_status == 1)?'1':'0';
            $this->db->where('property_status',$status);
        }
        /*if (!empty($property_id) || !empty($property_title) || !empty($seller_name) || $property_status !== '') {
            if (!empty($property_id)){
              $property_id = "property_id = '".$property_id."'";
            }
            if (!empty($property_title)){
                $property_title = ($property_id) ?  " AND property_title LIKE '%".$property_title."%'" : "property_title LIKE '%".$property_title."%'";
            }
            if (!empty($seller_name)){
                $seller_name = ($property_title || $property_id) ?   " AND (user_master.first_name LIKE '%".$seller_name."%' OR user_master.last_name LIKE '%".$seller_name."%')" : " (user_master.first_name LIKE '%".$seller_name."%' OR user_master.last_name LIKE '%".$seller_name."%')";
            }
            if ($property_status !== '') { 
                $status = ($property_status == 1)?'1':'0';
                $property_status = ($property_title || $property_id || $seller_name) ?   " AND property_status = '".$status."'" : "property_status = '".$status."'";

            }
           $this->db->where('('.$property_id.''.$property_title.''.$seller_name.''.$property_status.')'); 
        }*/
        if($limit!='' && $start!=''){
           $this->db->limit($limit, $start);
        }
        return $this->db->get('properties')->result(); 
    }

    public function deleteProperty($property_id)
    {
        $this->db->delete('properties', array('property_id' => $property_id));
        $this->db->delete('property_assets', array('property_id' => $property_id));
        $this->db->delete('properties_condition', array('property_id' => $property_id));
        $this->db->delete('offers', array('property_id' => $property_id));
        $this->db->delete('notifications', array('property_id' => $property_id));
        $this->db->delete('multifamily_units', array('property_id' => $property_id));
    }

    public function getOfferNum($property_id,$user_id){
        $this->db->where("property_id = '".$property_id."' AND user_id = '".$user_id."'");
        return $this->db->get('offers')->num_rows();
    }
}
?>