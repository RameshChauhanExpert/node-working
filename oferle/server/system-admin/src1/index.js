import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store/store";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';




import{Header,Login,Product,Product_Add,Software,Software_Add,UserManagement,Category,Category_Add,Caution,Caution_Add,Sidebar,Dashboard,All_tickets,Edit_ticket,Page_not_found,} from "./Container/index" 



class Admin extends React.Component{
  constructor(props){ 
    super(props);
    localStorage.setItem('isLoading',0);
    
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
          {("" === localStorage.getItem("authId") || null === localStorage.getItem("authId"))?
          
            <div>
              <Switch>
                <Route exact path='' component={Login} />
                <Route exact path='/Header' component={Header} />
                <Route exact path='/Sidebar' component={Sidebar} />
                <Route exact path='/Dashboard' component={Dashboard} />
                <Route exact path='/Product' component={Product} />
                <Route exact path='/Product_Add' component={Product_Add} />
                <Route exact path='/Caution' component={Caution} />
                <Route exact path='/Caution_Add' component={Caution_Add} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/All_tickets' component={All_tickets} />
                <Route exact path='/Category' component={Category} />
                <Route exact path='/Category_Add' component={Category_Add} />
                <Route path='/Category_Add/:id' component={Category_Add} />
                <Route path='/UserManagement' component={UserManagement} />
                <Route path='/Software' component={Software} />
                <Route path='/Software_Add' component={Software_Add} />
                <Route path='/Software_Edit/:id' component={Software_Add} />
                <Route path='/Edit_ticket/:id' component={Edit_ticket} />
              </Switch>
            </div>
            :
            <div>
              <Sidebar/>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/Header' component={Header} />
                <Route exact path='/Sidebar' component={Sidebar} />
                <Route exact path='/Dashboard' component={Dashboard} />
                <Route exact path='/Product' component={Product} />
                <Route exact path='/Product_Add' component={Product_Add} />
                <Route exact path='/Product_Add/:id' component={Product_Add} />
                <Route exact path='/Caution' component={Caution} />
                <Route exact path='/Caution_Add' component={Caution_Add} />
               
               
                <Route exact path='/Login' component={Login} />
                <Route exact path='/All_tickets' component={All_tickets} />
                <Route exact path='/Category' component={Category} />
                <Route exact path='/Category_Add' component={Category_Add} />
                <Route path='/Category_Add/:id' component={Category_Add} />
                <Route path='/UserManagement' component={UserManagement} />
                <Route path='/Software' component={Software} />
                <Route path='/Software_Add' component={Software_Add} />
                <Route path='/Software_Edit/:id' component={Software_Add} />
                <Route path='/Edit_ticket/:id' component={Edit_ticket} />
                <Route path='*' component={Page_not_found} />
              </Switch>
            </div>
          }
      </Router>
    );
  }
}

ReactDOM.render(<Provider store={store}><Admin/></Provider>,document.getElementById('root'));
registerServiceWorker();