import React, {useState,useEffect} from 'react';

//Components
import AdminUsers from './admin.users';
import { withRouter } from 'react-router-dom';

export default withRouter(function AdminDashboard(props){

    useEffect(()=>{
        props.history.push("/admin/dashboard")
    },[])


    return(
        <>
            <AdminUsers />

        </>
    )
})