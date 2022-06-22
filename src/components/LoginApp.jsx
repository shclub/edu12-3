import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ListEmployeeComponent from './ListEmployeeComponent.jsx'
import CreateEmployeeComponent from './CreateEmployeeComponent.jsx'
//import UpdateEmployeeComponent from './UpdateEmployeeComponent.jsx'
import ViewEmployeeComponent from './ViewEmployeeComponent.jsx'



import { withRouter } from 'react-router'

class LoginApp extends Component {
    render() {
        const HeaderWithRouter = withRouter(HeaderComponent);

        return (
            <div className="TodoApp">
                <Router>
                    <div>
                        <HeaderWithRouter/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute path = "/employees" component = {ListEmployeeComponent}/>
                            <AuthenticatedRoute path = "/add-employee/:id" component = {CreateEmployeeComponent}/>
                            <AuthenticatedRoute path = "/view-employee/:id" component = {ViewEmployeeComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default LoginApp