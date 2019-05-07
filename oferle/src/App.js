import React, { Component } from 'react';
import { connect, withRouter, Route } from './utilities'
import { nav_operation } from "./action";
import logo from './logo.svg';
import './App.css';
import '../src/assets/css/main.css';

import { Routing } from "./config";
import Admin from "./site/admin";
import FrontEnd from "./site/frontend"
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    AOS.init({
      duration: 2000,
      once: true

    })

    if (this.props.history.listen.length == 1) {
      this.props.nav_operation(this.props.history.location.pathname)
    }
    this.props.history.listen((location, action) => {
      this.props.nav_operation(location.pathname)
    });


  }

  render() {
    window.scrollTo(0, 0)
    return (
      <div className="App">

        {(this.props.state.app_component.frontend == true) ? <div>

        <FrontEnd header={this.props.state.app_component.header} footer={this.props.state.app_component.footer} />
        </div>
          :
          <div>
            <Admin />
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
})
const actionCall = dispatch => ({
  nav_operation: (route) => { dispatch(nav_operation(route)) }
})
export default withRouter(connect(mapStateToProps, actionCall)(App))

