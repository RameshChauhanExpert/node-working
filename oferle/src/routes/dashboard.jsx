// @material-ui/icons
import {Dashboard,Person,LibraryBooks,BubbleChart,Unarchive,Notifications,LocationOn} from "../utilities"
// core components/views
import {UserDetails,PropertyDetails,AccountSetting,EmailTemplate,RegistrationEmail,CmsAbout,DashboardPage,UserProfile,TableList,Icons,Maps,Typography,NotificationsPage,UpgradeToPro,Property_Listing,UserManagement,PropertyManagement,Utility,Cms} from "../admin";
import '../admin/Dashboard/dashboard.css'
const dashboardRoutes = [

  
  {
    path: "/admin/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/admin/Property_Listing",
    sidebarName: "Property List",
    navbarName: "Property List",
    icon: "content_paste",
    component: Property_Listing
  },
  {
    path: "/admin/userprofile",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },

  {
    path: "/admin/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/admin/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/admin/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/admin/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/admin/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  },
 
// ,{ redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" },

];

export default dashboardRoutes;
