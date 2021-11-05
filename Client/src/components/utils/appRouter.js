import React, {useEffect,useState} from 'react';

//Components
import AppLogo from './appLogo';
import Login from "./login"
import Dashboard from "./dashboard"
import Header from "./header"
import Account from "../account"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


//Libraries
import Cookies from 'js-cookie';



export default function AppRouter(props){


    const [auth,setAuth] = useState(Cookies.get("authID"))



    return(
        <>

            <Router>

                <Switch>
                    <Route exact path="/">
                        {
                            !auth?
                            <>
                                <AppLogo/>
                                <Login/>
                            </>
                            :
                            <>
                                <Redirect to="/dashboard"/>
                            </>
                        }
                    </Route>
                    <Route exact path="/dashboard">
                        {
                        auth?
                        <>
                        <Header/>
                        <Dashboard />
                        </>
                        :
                        <Redirect to="/"/>
                        }
                    </Route>
                    <Route exact path="/account">
                        {
                        auth?
                        <>
                        <Header/>
                        <Account />
                        </>
                        :
                        <Redirect to="/"/>
                        }
                    </Route>
                </Switch>
            </Router>
        </>
    )
}