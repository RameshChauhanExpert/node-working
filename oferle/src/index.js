// import React from "react";
// import ReactDOM from "react-dom";
 //import { createBrowserHistory } from "history";
 //import { Router, Route, Switch } from "react-router-dom";

//import "assets/css/material-dashboard-react.css?v=1.5.0";

 //import indexRoutes from "routes/index.jsx";
 //const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       {indexRoutes.map((prop, key) => {
//         return <Route path={prop.path} component={prop.component} key={key} />;
//       })}
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );



import React from 'react';
import ReactDOM from 'react-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import './assets/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import Store from "./store/index";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router,Route, Switch ,browserHistory} from "./utilities";
import { createBrowserHistory } from "history";
import {LocationSearchInput} from "./components";


 import indexRoutes from "routes/index.jsx";
 const hist = createBrowserHistory();

class Index extends React.Component{
    
    render(){

        return(
            <Router history={browserHistory}>
                <App/>
            </Router>
            
        )
    }


}

ReactDOM.render(<Provider store={Store}><Index /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
