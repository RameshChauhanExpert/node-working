export var  constant={
    // fronend_base_url:"http://offerlanedev.alltime.fit:2022/",
    // base_url:"http://offerlanedev.alltime.fit/server",
    // file_url:"http://offerlanedev.alltime.fit/server/uploads/", // live settings. 

    // local settings
      fronend_base_url:"http://localhost:3000",
      base_url:"http://localhost/offerlane/server",
      file_url:"http://localhost/offerlane/server/uploads/",
    server_url:{
        frontend_login:"/user_master/login",
        user_detail:"/user_master/user_detail",
        login:"/login",
        
        county_list:"/zone/count_list",
        seller_wizard:"/user_master/create_user/",
        seller_wizard_image_upload:"/user_master/seller_wizard_image_upload",
       
        seller_signup:"/user_master/seller_sign_up",
        seller_dashboard:"/seller_dashboard/user_detail",
        seller_wizard_property_image_upload:"/user_master/seller_wizard_property_image_upload",
        
       
        
        admin_login:"/user_master/admin_login",
        edit_profile:"/seller_dashboard/edit_profile",
        forgot_password:"/forgot_password/send_link",

        //seller_wizard
        save_locaion_search:"/zone/save_location_search",
         
        //seller dashboard
        seller_property_image_upload:"/seller_dashboard/seller_property_detail",
        seller_profile_image:"/seller_dashboard/edit_profile_image",
        seller_change_password:"/seller_dashboard/change_password",
         
        //buyer 
        buyer_signup:"/user_master/buyer_sign_up",
        buyer_login:"/buyer_user_master/buyer_login",
        buyer_change_password:"/buyer_dashboard/change_password",
        buyer_forgot_password:"/buyer_user_master/forgot_password",
        buyer_edit_profile:"/buyer_user_master/edit_profile",
        
        //contact us
        send_contact_detail:"/contact_us/insert",

        /*admin url*/
            //cms home
            cms_home_fetch:"/admin/cms/fetch_cms_home",
            cms_home_update:"/admin/cms/update_cms_home",
          
             //cms about
             cms_about_update:"/admin/cms_about/detail_update",
             cms_about_fetch:"/admin/cms_about/fetch_detail", 

             //account setting
             account_setting_form_submit:"/admin/account_setting/detail_update",
             account_setting_fetch:"/admin/account_setting/fetch_detail",

             //seller management
             fetch_seller:"/admin/seller_management/fetch_user",
             fetch_seller_detail:"/admin/seller_management/seller_detail",
            

             //dashboard
             fetch_dashboard_details:"/admin/dashboard/fetch_details",
             fetch_user_details:"/admin/user_management/fetch_user_details",
             detail_update:"/admin/user_management/detail_update",

             // property management
             property_listing:"/admin/property_info/property_listing",
             fetch_detail:"/admin/property_info/fetch_detail",

             //Offer management
             offer_creation: "/admin/property_info/add_offers",
        
             
     
        
            //cms about us
            cms_about_us_update:"/admin/cms/update_cms_about_us",
            cms_about_us_fetch:"/admin/cms/fetch_cms_about_us", 

            //cms how it works
            cms_how_it_works_fetch:"/admin/cms/fetch_cms_how_it_works",
            cms_how_it_works_update:"/admin/cms/update_cms_how_it_works",

            //cms faqs
            cms_faq_fetch:"/admin/cms/fetch_cms_faqs_both",
            cms_faq_update:"/admin/cms/update_cms_faqs",

            //faq management
            fetch_all_faqs:"/admin/faq_management/fetch_all_faqs",
            fetch_faqs:"/admin/faq_management/fetch_faqs",
            add_faqs:"/admin/faq_management/add_faqs",
            update_faqs:"/admin/faq_management/update_faqs",
            delete_faq:"/admin/faq_management/delete_faq",

            //account setting
            account_setting_form_submit:"/admin/account_setting/detail_update",
            account_setting_fetch:"/admin/account_setting/fetch_detail",

            //seller management
            // fetch_seller:"/admin/seller_management/fetch_seller",
            // fetch_seller_detail:"/admin/seller_management/seller_detail",

            //dashboard
            fetch_dashboard_details:"/admin/dashboard/fetch_details",
             
    },
    frontend_url:{
       
        home_page:"/home",
        forgot_password:"/forgot-password",
        admin_dashboard:"/admin/dashboard",
        property_detail:"/property-detail",
        
        about:"/about",
        contact:"/contact",
        how_it_work:"/how-it-works",
        seller_wizard:"/seller-wizard",
        seller_faq:"/seller-faq",
        buyer_faq:"/buyer-faq",
        privacy_policy:"/privacy-policy",
        
        
        seller_forgot_password:"/forgot-password",

        //seller routing
        seller:"/seller",
        seller_login:"/seller/login",
        seller_signup:"/seller/signup",
        seller_dashboard:"/seller",
        seller_property_list:"/seller/property-list",
        seller_account_setting:"/seller/account-setting",
        seller_property_detail:"/seller/seller-property-detail",
        seller_forgot_password:"/seller/forgot-password",
        
       
        //buyer routin
        buyer:"/buyer",
        buy_home: "/buyer/buyHome",
        buyer_login:"/buyer/login",
        buyer_sign_up:"/buyer/signup",
        buyer_dashboard:"/buyer/dashboard",
        buyer_propert_list:"/buyer/dashboard/property-list",
        buyer_account_setting:"/buyer/dashboard/account-setting",
        buyer_property_detail:"/buyer/dashboard/propert-detail",
        buyer_forgot_password:"/buyer/forgot-password",
        buyer_property_list:"/property-list",



    },
    admin_url:{
            //Seller managemnet
            seller_management:"/admin/user/",
            seller_detail:"/admin/user/user-detail",
            property_details:"/admin/property/property-details/",
            buyer_management:"/admin/user/buyer/",
            

    },
    error:{
        api_error:"There is some technical error, please try again",
        user_not_exist:"The email address you entered does not exist",
        user_name_password_not_match:"There was an error with your E-Mail\/Password combination. Please try again."
    },
    message:{
           forgot_password_mail:"The email sent to your registred email address.",
           image_uploades:"Image uploaded successfully",
           contact_us_messsage:"Our team will contact you soon !"
    },
    redux:{
        admin_type:{
            seller_detail:"seller_management_detail",
            admin_login_state_update:"admin_login_state_update",
            admin_login_success:"admin_login_success",
            admin_adbout_state_update:"admin_adbout_state_update",
            
            
           //dashboard
           dashboard_fetchAndUpdate:"dashboard_fetch_and_update",
              
       
            //seller
            seller_detail_page:"seller_detail"
            
            
        },
        frontend_type:{


          //seller wizard

          zone_list:"zone_list",


            //dashboard
            edit_profile:"edit_profile",
            user_section_login:"login",
             
            //front end login
            front_end_login:"frontend_login",
            front_end_login_state_update:"login_state_update",
            front_end_logout:"logout",

            //seller
            seller_detail:"seller_detail",
            seller_profile_edit:"seller_profile_edit",

            forgot_password:"email_sent"
        }
    },
    title:{
       
        frontend:{
            landing_page:"",
            about:"",
            contact:"",
            seller_wizard:"",
            how_it_work:"",
            
            //buyer title
            
  
            //seller title
        }

    }

    

}