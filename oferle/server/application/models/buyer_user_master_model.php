<?php
class Buyer_user_master_model extends CI_Model {

 public function edit_profile($user_detail)
        {
                   $user_id=$user_detail['user_id'];
                   $this->db->where("email",$user_detail['email']);
                   $this->db->where(['user_id !=' =>$user_id]);
                   $this->db->where("user_type","Buyer");
                   $this->db->from("user_master");
                   $data= $this->db->get()->result();
             
            if(count($data)>0)
            {
              $response["status"]=401;
              $response["message"]="This email address already register with us.";
             
            }else
            {
               
                $user_array=array(
                   "first_name"=>$user_detail['first_name'],
                   "last_name"=>$user_detail['last_name'],
                   "email"=>$user_detail['email'],
                   "phone"=>$user_detail['phone'],
                 //  "password"=>$user_detail['password']
            );
            $this->db->set($user_array);
            $this->db->where('user_id',$user_detail['user_id']);
            $this->db->update('user_master');
            $response["status"]=200;
            }
             return $response;
           
        }


}
