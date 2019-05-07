import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./loader.css"

class Loader extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
        <div className="lodaer-section">
          <CircularProgress   disableShrink />
        </div>
        
        
        )
    }
}
export default Loader;