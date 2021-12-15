import React, {useState,useEffect} from 'react';

//Components
import Machines from '../machines';
import { withRouter } from 'react-router-dom';

export default withRouter(function Dashboard(props){

    useEffect(()=>{
        props.history.push("/dashboard")
    },[])

    return(
        <>
            <Machines />

        </>
    )
})