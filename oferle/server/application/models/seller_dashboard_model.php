<?php
class Seller_dashboard_model extends CI_Model {

        public $title;
        public $content;
        public $date;
        
        public function seller_dashboard_detail($user_id)
        {

                $this->db->select('user_master.first_name,properties.*,user_master.last_name,user_master.email,user_master.password,user_master.phone,user_master.user_image,properties_condition.*,property_assets.image_base_64,properties.property_id');
                $this->db->from('user_master');
                $this->db->where("user_master.user_id",$user_id);
                $this->db->join('properties', 'user_master.user_id=properties.user_id',"left");
                $this->db->join('property_assets', 'property_assets.property_id=properties.property_id',"left");
                $this->db->join("properties_condition","properties_condition.property_id=properties.property_id","left");
                $this->db->group_by("properties.property_id");
                $query = $this->db->get()->result();
                   

                   for($i=0;$i<count($query);$i++)
                    {
                        $query[$i]->property_id;
                        $this->db->where(["property_id"=>$query[$i]->property_id]);
                        $this->db->from("property_assets");
                        $query[$i]->images=$this->db->get()->result();

                    }


                       
               return   $query;

        }

        public function edit_profile($user_detail)
        {
                   $user_id=$user_detail['user_id'];
                   $this->db->where("email",$user_detail['email']);
                   $this->db->where(['user_id !=' =>$user_id]);
                   $this->db->where('(user_type="Agent" OR user_type="Seller")');
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

        public function change_password($user_detail)
        {
              $this->db->where(["user_id"=>$user_detail['user_id'],"password"=>$user_detail['current_password']]);
              $this->db->from("user_master");
              $data=$this->db->get()->result();
        
              if(count($data)>0)
              {
                $this->db->set(["password"=>$user_detail['new_password']]);
                $this->db->where(["user_id"=>$user_detail['user_id']]);
                $this->db->update('user_master'); 

                $response["status"]=200;
                  

              }
              else
              {
                $response["status"]=401;
                
              }

               return $response;
        }


        public function edit_profile_image($files)
        {
              foreach ($_FILES as $key => $value) {
       $_FILES["file"]=$value;
      
       $parent_directory="user";
       $inner_folder=$_POST['user_id'];

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

                      // $last_id=   insert("property_assets",["property_id"=>$inner_folder,"image_base_64"=>$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name']]);
                         
                      
                      $this->db->set(["user_image"=>$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name']]);
                      $this->db->where(["user_id"=>$_POST['user_id']]);
                      $this->db->update("user_master");

                       $response["status"]=200;
                       $response['image_name']=$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name'];
                         
                         

                } 
        }
    
                     return $response;
}
    

}

?>