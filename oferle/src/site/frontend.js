import React from "react"
import {Header,Footer, ProperySearch,HomeSlider,Page_not_found,PropertImageUpload} from "../components"

import {Routing} from "../config";
import {connect ,withRouter} from "../utilities"
class FrontEnd extends React.Component{
    constructor(props)
    {
        super(props)
       
    }

    render(){
        var path=window.location.pathname.split("/");
        var classname=""
        if((path[2]!="login"&&path[2]!="signup")&&(path[1]=="seller"||path[1]=="buyer"))



        {
            classname="frontend dashboard"
        }else{
            classname="frontend"
        }

        return (
            <div className={classname}>
            {(this.props.header==true)?<div><Header/> </div>:""} 
            <Routing/>
             {(this.props.footer==true)?<Footer/>:""} 
             
           </div>
        )
    }
    
}



const mapStateToProps = state => ({
	state
})

export default withRouter(connect(mapStateToProps)(FrontEnd))

