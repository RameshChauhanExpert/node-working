<?php
class User_management_model extends CI_Model {
    function __construct()
    {
        parent::__construct();		
    }	

    public function checkAlreadyExist($wherearray,$user_id){
		$this->db->where($wherearray);
		if($user_id){
			$this->db->where("user_id != '".$user_id."'");
		}
        return $this->db->get('user_master')->num_rows();
	}
  
}
?>