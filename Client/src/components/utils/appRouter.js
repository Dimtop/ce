import React, {useEffect,useState} from 'react';

//Components
import AppLogo from './appLogo';
import Login from "./login"
import Dashboard from "./dashboard"
import Header from "./header"
import Account from "../account"
import MachineFileTypes from '../machineFilesTypes';
import PresetFiles from "../presetFiles"
import ManualFiles from "../manualFiles"
import VariableFiles from '../variableFiles';
import Messages from '../messages';

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
                    <Route exact path="/machines/:machineID/fileTypes">
                        {
                        auth?
                        <>
                        <Header/>
                        <MachineFileTypes />
                        </>
                        :
                        <Redirect to="/"/>
                        }
                    </Route>
                    <Route exact path="/machines/:machineID/files/presetFiles">
                        {
                        auth?
                        <>
                        <Header/>
                        <PresetFiles />
                        </>
                        :
                        <Redirect to="/"/>
                        }
                    </Route>
                    <Route exact path="/machines/:machineID/files/manualFiles">
                        {
                        auth?
                        <>
                        <Header/>
                        <ManualFiles />
                        </>
                        :
                        <Redirect to="/"/>
                        }
                    </Route>
                    <Route exact path="/machines/:machineID/files/variableFiles">
                        {
                        auth?
                        <>
                        <Header/>
                        <VariableFiles />
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
                    <Route exact path="/messages">
                        {
                        auth?
                        <>
                        <Header/>
                        <Messages />
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