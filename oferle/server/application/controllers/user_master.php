<?php 

if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
class User_master extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model("user_master_model");
    }


    public function create_user()
      {  
     
          if($user_detail=$_POST['Data'])
          {
               $user_detail= json_decode($_POST['Data']);
         
           if($user_detail->is_owner==1)
           {
            if($user_detail->is_licensed==1)
            {
               $user_type="Agent";
            }
            else
            {
              $user_type="Seller";
            }
            
           }
           else
           {
            $user_type="Agent";
           }
               $user_array=array(
                "first_name"=>($user_type=="Seller")?trim($user_detail->owner_first_name):trim($user_detail->agent_first_name),
                "last_name"=>($user_type=="Seller")?trim($user_detail->owner_last_name):trim($user_detail->agent_last_name),
                "email"=>($user_type=="Seller")?trim($user_detail->owner_email_address):trim($user_detail->agent_email_address),
                "phone"=>($user_type=="Seller")?trim($user_detail->owner_phone_number):trim($user_detail->agent_phone_number),
                "user_type"=>$user_type,
                "user_image"=>"$user_detail->user_image",
                "status"=>1
                          ) ;


                $_POST['email']= $user_array['email'];
                $_POST['phone']= $user_array['phone'];
                $this->form_validation->set_rules(
                      'email', 'Email',
                      'required|is_unique[user_master.email]',
                        array(
                                'required'      => 'You have not provided .',
                                'is_unique'     => 'The email address you have entred already registered.'
                        )
                                            );
                $this->form_validation->set_rules('phone', 'Phone number', 'required|is_unique[user_master.phone]',array(
                                'required'      => 'You have not provided .',
                                'is_unique'     => 'The phone number you have entred already registered.'
                        )); 
            
          //  $user_data=fetch("user_master",["email"=>$user_array['email']]);
            //echo count($user_data);exit;

                 $this->db->where("email",$_POST['email']);
                   $this->db->where('(user_type="Agent" OR user_type="Seller")');
                   $this->db->from("user_master");
                   $data= $this->db->get()->result();

                 if (count( $data)>0)
                {
                           $response['status']=200;
                          $user_data=fetch("user_master",["email"=>$user_array['email']]);
                         $response['user']= $user_array= (array) $data[0];
                         $response['user_exist']=1;
                          


                           //Sales Force start
                          $sales_force=$this->sales_force->access_token();
                          $query="Email='".$user_array['email']."'";
                         // print_r($sales_force);exit;
                          $sales_force_user_data=salesforce_fetch("Contact",$query,$sales_force->instance_url,$sales_force->access_token);



                          $sales_force_inserted_id=$sales_force_user_data['records'][0]['Id'];
                         $account_id= $this->account_insert($sales_force,$user_detail,$user_type,$sales_force_inserted_id);
                         //Sales Force end

                         $property_last_id=$this->property($user_detail,$user_array['user_id'],$user_type);

                         $this->property_condition($user_detail,$property_last_id);
                         // Sales Force Property Condition Start
                        $this->sales_force_property_condition($sales_force,$account_id,$user_detail);
                          // Sales Force Property Condition End

                         if(isset($user_detail->units_data))
                       { 
                              $this->multi_family($user_detail,$property_last_id);
                              //Sales Force Multy family start
                              $this->sales_force_multi_family($sales_force,$user_detail,$account_id);
                              //Sales Force Multy family End
                       }
 
                }
                else
                {
                      $user_array['password']=rand();
                      $last_insert_user_id=insert("user_master",$user_array);
                      $user_array['user_id']=$last_insert_user_id;
                      //Sales Force data insert of account
                      $sales_force=$this->sales_force->access_token();

                      
                     $contact_id= $this->contact_insert($sales_force,$user_array,"1",$user_detail);
                       
                       $account_id= $sales_force_inserted_id= $this->account_insert($sales_force,$user_detail,$user_type,$contact_id);

                     $response['property_last_id']= $property_last_id=$this->property($user_detail,$last_insert_user_id,$user_type);
                      $this->property_condition($user_detail,$property_last_id);
                      $this->sales_force_property_condition($sales_force,$account_id,$user_detail);

                      if(isset($user_detail->units_data))
                       { 
                              $this->multi_family($user_detail,$property_last_id);
                              $this->sales_force_multi_family($sales_force,$user_detail,$account_id);
                       }

                       $message= "Hello, <br/><br/> Your account detail. <br/><br/> Email :".$user_array['email']." <br/> Password : ".$user_array['password'];
                        email($user_array['email'], "Password",$message);
                        
                         $response["user"]=$user_array;
                         $response["status"]=200;
                         $response['user_exist']=0;
                }
                 $response['property']['property_last_id']=$property_last_id;
                 echo json_encode($response);


                     
            
          }      
      }

   
   


  public function sales_force_multi_family($sales_force,$user_detail,$account_id)
  {

                
      $i=0;

                          while ($i<count($user_detail->units_data->multiFamilyBathRooms)) {
                                  
                                  $units_array= array(
                                    'Property_Id__c'=>$account_id,
                                     'bedrooms__c'=>$user_detail->units_data->multiFamilyBedrooms[$i],
                                      'Bathrooms__c'=>$user_detail->units_data->multiFamilyBathRooms[$i],    
                                      'Rent_amount__c'=>$user_detail->units_data->rent_amount[$i],
                                     );
                                  salesforce_insert("Multifamily_units__c",$units_array,$sales_force->instance_url,$sales_force->access_token);
                                  $i++;
                                  
                          }

   


  }
  
   
public function sales_force_property_condition($sales_force,$account_id,$user_detail)
{
$condation_array=array(
                       "Property_id__c"=>$account_id,
                       "Condition_kitchen__c"=>$user_detail->kitchen_range,
                       'Condition_interior_paint__c'=>$user_detail->interior_paint,
                       "Condition_flooring__c"=>$user_detail->flooring_range,
                       "condition_ac_units__c"=>$user_detail->units_range,
                       "Condition_roof__c"=>$user_detail->roof_range,
                       "Condition_exterior_paint__c"=>$user_detail->exterior_range,
                       "condition_windows__c"=>$user_detail->windows_range,
                       "Condition_electrical_panel__c"=>$user_detail->electrical_range,
                       "Condition_water_heater__c"=>$user_detail->water_heater_range,
                       "Condition_appliances__c"=>$user_detail->appliances_range,
                       "Condition_pool_equipment__c"=>$user_detail->pool_range,
                       "Condition_bathroom__c"=>$user_detail->bathroom_range,
                           );
    salesforce_insert("Property_condition__c",$condation_array,$sales_force->instance_url,$sales_force->access_token);
}
      
  public function contact_insert($sales_force,$user_array,$sales_force_inserted_id,$user_detail)
  {
         $contact=array(
                // "AccountId"=>$sales_force_inserted_id,
                 "LastName"=>$user_detail->owner_first_name,
                 "FirstName"=>$user_detail->owner_last_name,
                 "Phone"=>$user_array['phone'],
                 "MobilePhone"=>$user_array['phone'],
                 "Email"=>$user_array['email'],
                 "Street_Address__c"=>$user_detail->street_address,
                 "City__c"=>$user_detail->city,
                 "State__c"=>$user_detail->state,
                 "Owner_first_name__c"=>$user_detail->owner_first_name,
                 "Owner_Last_Name__c"=>$user_detail->owner_last_name,
                 "User_Role__c"=>$user_array['user_type'],
                 "Agent_First_Name__c"=>($user_array['user_type']=="Agent")?$user_detail->agent_first_name:"",
                 "Agent_Last_Name__c"=>($user_array['user_type']=="Agent")?$user_detail->agent_last_name:"",
                  "Zipcode__c"=>$user_detail->zipcode

                  );
       $contact_id= salesforce_insert("Contact",$contact,$sales_force->instance_url,$sales_force->access_token);
       return  $contact_id;
  }

  public function account_insert($sales_force,$user_detail,$user_type,$owner_id)
  {  
      if($user_detail->PropertyType=="1")
     {
      $PropertyType="Single Family";
     }
     if($user_detail->PropertyType=="2")
     {
      $PropertyType="Town House";
     }
     if($user_detail->PropertyType=="3")
     {
      $PropertyType="Condo";
     }
     if($user_detail->PropertyType=="4")
     {
      $PropertyType="Multy Family";
     }
     if($user_detail->PropertyType=="5")
     {
      $PropertyType="Vacant Land";
     }
    
   $account=array(     
                      "contact_id__c"=>$owner_id,
                      "Name"=>$user_type,
                      "Phone"=>($user_type=="Seller")?$user_detail->owner_phone_number:$user_detail->agent_phone_number,
                      "Property_Type__c"=>$PropertyType,
                      "Street_Address__c"=>$user_detail->street_address,
                      "City__c"=>$user_detail->city,
                      "State__c"=>$user_detail->state,
                      "Zipcode__c"=>$user_detail->zipcode,
                      "Property_Owner__c"=>($user_type=="Seller")?"Owner":"Agent",
                      "Owner_First_Name__c"=>$user_detail->owner_first_name,
                      "Owner_Last_Name__c"=>$user_detail->owner_last_name,
                      //"type_of_property"=>"mul",
                      "Multi_Family_Units__c"=>($user_detail->units=="")?0:$user_detail->units,
                      "Year_Built__c"=>$user_detail->year_built,
                      "Square_feet__c"=>"$user_detail->sq_ft",
                      "Is_Garage__c"=>($user_detail->isGarage==1)?"Yes":"No",
                      "Cooling_system__c"=>($user_detail->cooling_system==1)?"Yes":"No",
                      "How_many_car_port__c"=>$user_detail->no_of_cars,
                      //"ac_units"=>$user_detail->ac_units,
                      "Sewer__c"=>($user_detail->waste_water_system==1)?"Septic":"City Sewer",
                      "Is_hoa__c"=>($user_detail->is_hoa==1)?"Yes":"No",
                      "Hoa_paid__c"=>$user_detail->hoa_dues,
                      "How_often_they_are_paid_HOA__c"=>$user_detail->hoa_period,
                      
                      "Amenities_pool__c"=>($user_detail->amenities_pool==1)?"Yes":"No",
                      "Amenities_gym__c"=>($user_detail->amenities_gym==1)?"Yes":"No",
                      "Amenities_spa__c"=>($user_detail->amenities_spa==1)?"Yes":"No",
                      "Amenities_golf__c"=>($user_detail->amenities_golf==1)?"Yes":"No",
                      "Amenities_recreation_area__c"=>($user_detail->amenities_recreation_area==1)?"Yes":"No",
                      "Amenities_other__c"=>$user_detail->amenities_other,
                      "Is_Condo__c"=>($user_detail->is_condo==1)?"Yes":"No",
                      "Condo_paid__c"=>$user_detail->condo_dues,
                      "How_often_they_are_paid_Condo__c"=>$user_detail->condo_period,
                      "X55_community__c"=>($user_detail->is_55_Community==1)?"Yes":"No",
                      "Rental_restrictions__c"=>($user_detail->new_owner_restruction==1)?"Yes":"No",
                      "Rental_restrictions_description__c"=>$user_detail->owner_restruction,
                      
                                    );











    $account_id=salesforce_insert("Account",$account,$sales_force->instance_url,$sales_force->access_token);
     return $account_id;


  }



    public function property($user_detail,$last_insert_user_id,$user_type)
    {


    if($user_detail->PropertyType=="1")
     {
      $PropertyType="Single Family";
     }
     if($user_detail->PropertyType=="2")
     {
      $PropertyType="Town House";
     }
     if($user_detail->PropertyType=="3")
     {
      $PropertyType="Condo";
     }
     if($user_detail->PropertyType=="4")
     {
      $PropertyType="Multy Family";
     }
     if($user_detail->PropertyType=="5")
     {
      $PropertyType="Vacant Land";
     }

     if($user_detail->occupancy==0)
     {
       $occupancy="Vacant";
     }else  if($user_detail->occupancy==1)
     {
       $occupancy="Rented";
     }
     else  if($user_detail->occupancy==2)
     {
        $occupancy="Owner occupied";
     }


   $property_array=array(
                                      "user_id"=>$last_insert_user_id,
                                      "street_address"=>trim($user_detail->street_address),
                                      "latitude"=> trim($user_detail->latitude),
                                      "longitude"=>trim($user_detail->longitude),
                                      "city"=>trim($user_detail->city),
                                      "state"=>$user_detail->state,
                                      "zipcode"=>$user_detail->zipcode,
                                      "property_owner"=>($user_type=="Seller")?"Owner":"Agent",
                                      "owner_firstname"=>trim($user_detail->owner_first_name),
                                      "owner_lastname"=>trim($user_detail->owner_last_name),
                                      "type_of_property"=>$PropertyType,
                                      "multifamily_units"=>($user_detail->units=="")?0:$user_detail->units,
                                      "year_built"=>$user_detail->year_built,
                                      "sq_ft"=>$user_detail->sq_ft,
                                      "is_garage"=>$user_detail->isGarage,
                                      "cooling_system"=>$user_detail->cooling_system,
                                      "howmany_carport"=>($user_detail->no_of_cars=="")?0:$user_detail->no_of_cars,
                                      "ac_units"=>$user_detail->ac_units,
                                      "sewer"=>$user_detail->waste_water_system,
                                      "hoa"=>$user_detail->is_hoa,
                                      "hoa_paid"=>$user_detail->hoa_dues,
                                      "hoa_paid_other"=>$user_detail->hoa_period,
                                      "community_amenities"=>1,
                                      "amenities_pool"=>$user_detail->amenities_pool,
                                      "amenities_gym"=>$user_detail->amenities_gym,
                                      "amenities_spa"=>$user_detail->amenities_spa,
                                      "amenities_golf"=>$user_detail->amenities_golf,
                                      "amenities_recreation_area"=>$user_detail->amenities_recreation_area,
                                      "amenities_other"=>$user_detail->amenities_other,
                                      "condo_assocation"=>$user_detail->is_condo,
                                      "condo_paid"=>$user_detail->condo_dues,
                                      "condo_paid_other"=>$user_detail->condo_period,
                                      "55_community"=>$user_detail->is_55_Community,
                                      "rental_restrictions"=>$user_detail->new_owner_restruction,
                                      "rental_restrictions_description"=>trim($user_detail->owner_restruction),
                                      "brokerage_name"=>trim($user_detail->brokerage_name),
                                      "occupancy"=>$occupancy,
                                      "occupancy_rent_amount"=>($user_detail->occupancy_rent_amount!="")?$user_detail->occupancy_rent_amount:""
                                    );


                           $property_last_id= insert('properties',$property_array);
                            return $property_last_id;

    


    }

    
      public function property_condition($user_detail,$property_last_id)
      {
  $condation_array=array(
                                 "property_id"=>$property_last_id,
                                 "condition_kitchen"=>$user_detail->kitchen_range,
                                 'condition_interior_paint'=>$user_detail->interior_paint,
                                 "condition_flooring"=>$user_detail->flooring_range,
                                 "condition_ac_units"=>$user_detail->units_range,
                                 "condition_roof"=>$user_detail->roof_range,
                                 "condition_exterior_paint"=>$user_detail->exterior_range,
                                 "condition_windows"=>$user_detail->windows_range,
                                 "condition_electrical_panel"=>$user_detail->electrical_range,
                                 "condition_water_heater"=>$user_detail->water_heater_range,
                                 "condition_appliances"=>$user_detail->appliances_range,
                                 "condition_pool_equipment"=>$user_detail->pool_range,
                                 "condition_bathrooms"=>$user_detail->bathroom_range,

                           );
                           insert("properties_condition",$condation_array);

      }

       public function multi_family($user_detail,$property_last_id)
   {
                           $i=0;

                          while ($i<count($user_detail->units_data->multiFamilyBathRooms)) {
                                  
                                  $units_array= array(
                                    'property_id'=>$property_last_id,
                                     'bedrooms'=>$user_detail->units_data->multiFamilyBedrooms[$i],
                                      'bathrooms'=>$user_detail->units_data->multiFamilyBathRooms[$i],
                                      'rent_amount'=>$user_detail->units_data->rent_amount[$i],
                                     );
                                  insert("multifamily_units",$units_array);
                                  $i++;
                          }
                          
                          
   }

public function admin_login()
{
  if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                             
                     $user_detail['isAdmin']=0;

                    
                     $response_data=fetch("user_master",$user_detail);
                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]=$response_data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="There was an error with your E-Mail/Password combination. Please try again.";
                     }
                      
                }
                      echo json_encode($response);

}
public function login()
    {     
            if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                     $user_detail['isAdmin']=0;

                     //$response_data=fetch("user_master",$user_detail);


                      $this->db->where("email",$user_detail['email']);
                       $this->db->where("password",$user_detail['password']);
                   $this->db->where('(user_type="Agent" OR user_type="Seller")');
                   $this->db->from("user_master");
                  $response_data= $this->db->get()->result();

                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]=$response_data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="There was an error with your E-Mail/Password combination. Please try again.";
                     }
                      
                }
                      echo json_encode($response);
    }


    public function buyer_login()
    {     
            if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                     $user_detail['isAdmin']=0;
                     $user_detail['user_type']="Buyer";
                     $response_data=fetch("user_master",$user_detail);
                     $this->db->last_query();
                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]=$response_data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="There was an error with your E-Mail/Password combination. Please try again.";
                     }
                      
                }
                      echo json_encode($response);
    }

    public function user_detail()
    {
          if($user_detail=(array) json_decode($_POST['Data']))
                {                    
                     $response_data=fetch("user_master",$user_detail);
                     if(count($response_data)>0)
                     {
                      $response["status"]=200;
                      $response["data"]=$response_data;
                     }
                     else
                     {
                      $response["data"]=NULL;
                      $response["status"]=401;
                      $response['message']="";
                     }
                }
                      echo json_encode($response);
    }


public function seller_wizard_property_image_upload()
{
  
foreach ($_FILES as $key => $value) {
       $_FILES["file"]=$value;
      
       $parent_directory="property";
       $inner_folder=$_POST['property_id'];

         if (!file_exists('./uploads/'.$parent_directory)) {
          mkdir("./uploads/".$parent_directory,0777,TRUE);
          } 
          if(!file_exists('./uploads/'.$parent_directory."/".$inner_folder))
          {
                  mkdir('./uploads/'.$parent_directory."/".$inner_folder,0777, TRUE);
          }
              $config['upload_path']= './uploads/'.$parent_directory."/".$inner_folder."/";
                $config['allowed_types']        = 'gif|jpg|png';
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
                         insert("property_assets",["property_id"=>$inner_folder,"image_base_64"=>$parent_directory."/".$inner_folder."/".$data['upload_data']['file_name']]);
                         $response["status"]=200;

                }

                echo json_encode($response);
}
  
  
                    

}

public function seller_wizard_image_upload()
{


          if($user_detail=(array) json_decode($_POST['Data']))
                {    
                     if(count($user_detail['image_drop'])>0)
                     {
                            for($i=0;$i<count($user_detail['image_drop']);$i++)
                            {
                              $property_asset=array(
                                    "property_id"=>$user_detail['property_id'],
                                    "image_base_64"=>$user_detail["image_drop"][$i]->value,
                                                  );
                              insert("property_assets",$property_asset);
                            }
                            $response['status']=401;
                            $response['message']="Image drop box is empty";
                            
                     }else
                     {
                            $response['status']=401;
                            $response['message']="Image drop box is empty";
                     }
                }

                echo json_encode($response);

}

public function seller_sign_up()
{
if($user_detail=(array) json_decode($_POST['Data']))
                {    
                  
                   $_POST['email']= $user_detail['email'];
                   $_POST['phone']= $user_detail['phone'];
                  $user_detail['status']=1;
                  $user_detail["user_type"]="Seller";
                   unset($user_detail['validate'],$user_detail['finalCheckAll']);
                   $error=false;
                
                $this->form_validation->set_rules(
                      'email', 'Email',
                      'required|is_unique[user_master.email]',
                        array(
                                'required'      => 'You have not provided .',
                                'is_unique'     => 'The email address you have entred already registered.'
                        )
                                            );



                 // $data=fetch("user_master",["email"=>$_POST['email'],"user_type"=>"Seller"]);
                   

                   $this->db->where("email",$_POST['email']);
                   $this->db->where('(user_type="Agent" OR user_type="Seller")');
                   $this->db->from("user_master");
                   $data= $this->db->get()->result();
    
                   if (count($data)>0)
                {
                       $response['status']=401;
                       $response["message"]="You have already register";
                }
                else
                {
                       $last_id=insert("user_master",$user_detail);
                       $this->user_master_model->sign_up($user_detail);
                       $response['status']=200;
                       $response['data']=(object) ["last_id"=>$last_id];
                }
                   
                   echo json_encode($response);

                }
}
  


  public function buyer_sign_up()
  {
    if($user_detail=(array) json_decode($_POST['Data']))
                {    
                  
                   $_POST['email']= $user_detail['email'];
                   $_POST['phone']= $user_detail['phone'];
                  $user_detail['status']=1;
                  $user_detail["user_type"]="Buyer";
                   unset($user_detail['validate'],$user_detail['finalCheckAll']);
                   $error=false;
                
                $this->form_validation->set_rules(
                      'email', 'Email',
                      'required|is_unique[user_master.email]',
                        array(
                                'required'      => 'You have not provided .',
                                'is_unique'     => 'The email address you have entred already registered.'
                        )
                                            );
                  $data=fetch("user_master",["email"=>$_POST['email'],"user_type"=>"Buyer"]);
                   if (count($data)>0)
                {
                       $response['status']=401;
                       $response["message"]="You have already register";
                }
                else
                {
                       $last_id=insert("user_master",$user_detail);
                       $this->user_master_model->sign_up($user_detail);
                       $response['status']=200;
                       $response['data']=(object) ["last_id"=>$last_id];
                }
                   
                   echo json_encode($response);

                }
  }

}
