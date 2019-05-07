<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

		public function index()
	{
         // $a= (object) array('1' => 'foo');	
         // $b=$a;
         // unset($a); 
         // print_r($b);  
		$this->load->view("welcome_message");
		
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */