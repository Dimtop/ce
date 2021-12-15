import React, {useEffect,useState} from 'react';

//Components
import AppLogo from './appLogo';
import Login from "./login"
import PermissionDenied from "./permissionDenied"
import Dashboard from "./dashboard"
import Header from "./header"
import Account from "../account"
import MachineFileTypes from '../machineFilesTypes';
import PresetFiles from "../presetFiles"
import ManualFiles from "../manualFiles"
import VariableFilesList from '../variableFilesList';
import VariableFiles from '../variableFiles';
import Messages from '../messages';
import DeclarationOfComplinace from '../templates/declarationOfCompliance';
import Production from '../templates/production';
import PartsList from "../templates/partsList"
import FileValidator from "../fileValidator"

//----Admin
import AdminDashboard from "../admin/admin.dashboard"
import AdminHeader from "../admin/admin.header"
import AdminUserActions from "../admin/admin.userActions"
import AdminAddNewMachine from "../admin/admin.addNewMachine"
import AdminMachineFileTypes from '../admin/admin.machineFileTypes';
import AdminMachines from "../admin/admin.machines"
import AdminPresetFiles from "../admin/admin.presetFiles"
import AdminManualFiles from "../admin/admin.manualFiles"
import AdminVariableFilesList from '../admin/admin.variableFilesList';
import AdminVariableFiles from '../admin/admin.variableFiles';
import AdminUserData from "../admin/admin.userData"
import AdminMessages from "../admin/admin.messages"
import AdminCategory from "../admin/admin.category"

import {Spinner} from "evergreen-ui"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


//Libraries
import Cookies from 'js-cookie';

//Helpers 
import { getUserByID } from "../../helpers/dataManager"

export default function AppRouter(props){


    const [auth,setAuth] = useState(Cookies.get("authID"))
    const [locked,setLocked] = useState(Cookies.get("locked"))
    const [admin,setAdmin] = useState(Cookies.get("admin"))
    const [user,setUser] = useState(null)
    const [isLocked,setIsLocked] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [showSpinner,setShowSpinner] = useState(true)

    useEffect(()=>{
        getUserByID(Cookies.get("authID"),(data)=>{
            console.log(data)
            if(data){
                if(data.user){
                    setUser(data.user);
                    setIsLocked(data.user.isLocked)
                    setIsAdmin(data.user.isAdmin)
                }
        
            }

            setShowSpinner(false)
        })
    },[])


    return(
        <>
        {
            showSpinner?
            <Spinner />
            :
            <>
            <Router>

            <Switch>
                <Route exact path="/">
                    {
                        !user || isLocked?
                        <>
                            <AppLogo/>
                            <Login/>
                        </>
                        :
                        <>
                        {
                            isAdmin?
                            <Redirect to="/admin/dashboard"/>
                            :
                            <Redirect to="/dashboard"/>
                        }
                    
                        </>
                    }
                </Route>
                <Route exact path="/admin/dashboard">
                    {
                    user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminDashboard />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/categories/new">
                    {
                    user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminCategory />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/new">
                    {
                      user && isAdmin?
                    <>
                    <AdminHeader/>
                    <AdminUserData />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID">
                    {
                      user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminUserActions />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/messages">
                    {
                  user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminMessages />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/new">
                    {
                    user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminAddNewMachine />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID">
                    {
                    user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminAddNewMachine />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/">
                    {
                    user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminMachines />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID/fileTypes">
                    {
             user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminMachineFileTypes />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID/files/presetFiles">
                    {
               user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminPresetFiles />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID/files/manualFiles">
                    {
              user && isAdmin?
                    <>
                    <AdminHeader />
                    <AdminManualFiles />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID/files/variableFiles/:fileIndex">
                    {
                 user && isAdmin?
                    <>
                    <AdminHeader/>
                    <AdminVariableFiles />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/machines/:machineID/files/variableFiles">
                    {
              user && isAdmin?
                    <>
                    <AdminHeader/>
                    <AdminVariableFilesList />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
                <Route exact path="/admin/users/:userID/data">
                    {
              user && isAdmin?
                    <>
                    <AdminHeader/>
                    <AdminUserData />
                    </>
                    :
                    <PermissionDenied checkAdmin="true"/>
                    }
                </Route>
            
                
                <Route exact path="/dashboard">
                    {
                    user && !isLocked?
                    <>
                    <Header/>
                    <Dashboard />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/fileValidator">
                    
                    <FileValidator />
                
                </Route>
                <Route exact path="/machines/:machineID/fileTypes">
                    {
                      user && !isLocked?
                    <>
                    <Header/>
                    <MachineFileTypes />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/presetFiles">
                    {
                    user && !isLocked?
                    <>
                    <Header/>
                    <PresetFiles />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/manualFiles">
                    {
                  user && !isLocked?
                    <>
                    <Header/>
                    <ManualFiles />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/variableFiles/:fileIndex">
                    {
                          user && !isLocked?
                    <>
                    <Header/>
                    <VariableFiles />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/variableFiles">
                    {
                       user && !isLocked?
                    <>
                    <Header/>
                    <VariableFilesList />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/variableFiles/:fileIndex/declarationOfCompliance">
                    {
                   user && !isLocked?
                    <>
                    <DeclarationOfComplinace />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/variableFiles/:fileIndex/production">
                    {
                         user && !isLocked?
                    <>
                    <Production />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/machines/:machineID/files/variableFiles/:fileIndex/partsList">
                    {
                        user && !isLocked?
                    <>
                    <PartsList />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/admin/machines/:machineID/files/variableFiles/:fileIndex/declarationOfCompliance">
                    {
                   user && !isLocked?
                    <>
                    <DeclarationOfComplinace />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/admin/machines/:machineID/files/variableFiles/:fileIndex/production">
                    {
                         user && !isLocked?
                    <>
                    <Production />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/admin/machines/:machineID/files/variableFiles/:fileIndex/partsList">
                    {
                        user && !isLocked?
                    <>
                    <PartsList />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/account">
                    {
                  user && !isLocked?
                    <>
                    <Header/>
                    <Account />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
                <Route exact path="/messages">
                    {
                        user && !isLocked?
                    <>
                    <Header/>
                    <Messages />
                    </>
                    :
                    <PermissionDenied isLocked={isLocked}/>
                    }
                </Route>
            </Switch>
            </Router>

            </>
        }

         
        </>
    )
}