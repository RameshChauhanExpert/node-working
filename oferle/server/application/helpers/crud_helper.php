<?php


function fetch($table_name,$where=NULL)
{
	         $CI =& get_instance();
	        if($where!=NULL)
	        {
	        	$CI->db->where($where);
	        }
	        
	 
	 		$query = $CI->db->get($table_name);
         
            return $query->result();
	


}

function file_upload()
{
	  $config['upload_path']          = './';
                $config['allowed_types']        = 'gif|jpg|png';
                $config['max_size']             = 100;
                $config['max_width']            = 1024;
                $config['max_height']           = 768;

                $this->load->library('upload', $config);

                if ( ! $this->upload->do_upload('file'))
                {
                        $error = array('error' => $this->upload->display_errors());
                         print_r($error);
                      
                }
                else
                {
                        $data = array('upload_data' => $this->upload->data());
                         print_r($data);
                        
                }
}

function update($table_name,$data)
{
	
}

function insert($table_name,$data)
{
	  $CI =& get_instance();
      $CI->db->insert($table_name, $data);
      $insertId = $CI->db->insert_id();
      return  $insertId;
}

function email($to,$subject,$message)
{
  $CI =& get_instance();
 
      $config['charset'] = "utf-8";
        $config['mailtype'] = "html";
        $config['newline'] = "\r\n"; 

$CI->load->library('email');

$CI->email->initialize($config);
$CI->email->from('rajatdoshi44@gmail.com', 'Offerlane');
$CI->email->to($to);
$CI->email->subject($subject);
$CI->email->message($message);
$CI->email->send();
}


?>