<?php
class User_master_model extends CI_Model {


  public function sign_up($seller)
  {
     $sales_force=$this->sales_force->access_token();


      $contact=array(
                // "AccountId"=>$sales_force_inserted_id,
                 "LastName"=>$seller['first_name'],
                 "FirstName"=>$seller['first_name'],
                 "Phone"=>$seller['phone'],
                 "MobilePhone"=>$seller['phone'],
                 "Email"=>$seller['email'],
                 "Street_Address__c"=>"None",
                 "City__c"=>"None",
                 "State__c"=>"None",
                 "Owner_first_name__c"=>$seller['first_name'],
                 "Owner_Last_Name__c"=>$seller['last_name'],
                 "User_Role__c"=>$seller['user_type'],
                 "Agent_First_Name__c"=>"N/A",
                 "Agent_Last_Name__c"=>"None",
                  "Zipcode__c"=>0

                  );
       $contact_id= salesforce_insert("Contact",$contact,$sales_force->instance_url,$sales_force->access_token);
       return  $contact_id;








  }

}

?>