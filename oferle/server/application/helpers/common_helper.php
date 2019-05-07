<?php
// create slug based on title
function slugify($text,$tablename,$fieldname,$idfield=NULL,$id=NULL)
{
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);
  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);
  // trim
  $text = trim($text, '-');
  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);
  // lowercase
  $text = strtolower($text);
  if (empty($text)) {
    return 'n-a';
  }
  $i = 1; 
  $baseSlug = $text;
  while(slug_exist($text,$tablename,$fieldname,$idfield,$id))
  {    
  	$text = $baseSlug . "-" . $i++;        
  }
  return $text;
}

function slug_exist($text,$tablename,$fieldname,$idfield,$id)
{
  //check slug is uniquee or not.
  $CI =& get_instance();  
  //$checkSlug = $CI->db->get_where($tablename,array($fieldname=>$text))->num_rows();  
  if($id!=''){
    $checkSlug = $CI->db->get_where($tablename,array($idfield."!="=>$id,$fieldname=>$text))->num_rows();
  }else{
    $checkSlug = $CI->db->get_where($tablename,array($fieldname=>$text))->num_rows();
  }

  if($checkSlug > 0)
  {
    return true;
  }
}

function generateEmailBody($body,$arrayVal){ //echo '<pre>';print_r($arrayVal);exit;
  // replace # email body variable's
  if($arrayVal['FirstName']==""){
    $arrayVal['FirstName'] = 'Unknown';
  }  
  $body = @str_replace("#firstname#",$arrayVal['FirstName'],$body);  
  $body = @str_replace("#lastname#",$arrayVal['LastName'],$body);
  $body = @str_replace("#s_firstname#",$arrayVal['SFirstName'],$body);  
  $body = @str_replace("#s_lastname#",$arrayVal['SLastName'],$body);
  $body = @str_replace("#forgotlink#",$arrayVal['ForgotPasswordLink'],$body);  
  $body = @str_replace("#email#",$arrayVal['Email'],$body);  
  $body = @str_replace("#password#",$arrayVal['Password'],$body);    
  $body = @str_replace("#siteurl#",$arrayVal['siteurl'],$body);
  $body = @str_replace("#account_verify_url#",$arrayVal['account_verify_url'],$body);
  $body = @str_replace("#loginlink#",$arrayVal['LoginLink'],$body);
  $body = @str_replace("#body_cotent_area#",$arrayVal['body_cotent_area'],$body);
  $body = @str_replace("#hotel_order_id#",$arrayVal['hotel_order_id'],$body);
  return $body;
}
?>