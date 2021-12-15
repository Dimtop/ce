import React, {useState,useEffect} from "react"

//Helpers
import getIDFromURL from "../../helpers/getIDFromURL"

//Componetns
import {Pane,Card,Text,Heading} from "evergreen-ui"
import { withRouter } from 'react-router-dom';

export default withRouter(function AdminUserActions(props){



    useEffect(()=>{
        props.history.push("/admin/users/" +getIDFromURL(window.location.href,"users"))
    },[])


    return(
        <>
        <Heading size={900} textAlign="center" color="white">User actions</Heading>
        <Pane 
            clearfix  
            width={"100%"}
            display="flex"
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            flexDirection="column"
            flexDirection="row"
            flexWrap="wrap"
        >

            <Card
                elevation={1}
                float="left"
                width={"10rem"}
                height={"10rem"}
                margin="0.5rem"
                display="flex"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                background="tint1"
                cursor="pointer"
                hoverElevation={2}
                onClick={()=>location.replace("/admin/users/" + getIDFromURL(window.location.href,"users") + "/machines/new")}
            >
                <Text>Add new machine</Text>


            </Card>
            <Card
                elevation={1}
                float="left"
                width={"10rem"}
                height={"10rem"}
                margin="0.5rem"
                display="flex"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                background="tint1"
                cursor="pointer"
                hoverElevation={2}
                onClick={()=>location.replace("/admin/users/" + getIDFromURL(window.location.href,"users") + "/machines")}
            >
                   <Text>Edit machine files</Text>


            </Card>
            <Card
                elevation={1}
                float="left"
                width={"10rem"}
                height={"10rem"}
                margin="0.5rem"
                display="flex"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                background="tint1"
                cursor="pointer"
                hoverElevation={2}
                onClick={()=>location.replace("/admin/users/" + getIDFromURL(window.location.href,"users") + "/data")}
            >
                <Text>Edit user data</Text>


            </Card>
         
            <Card
                elevation={1}
                float="left"
                width={"10rem"}
                height={"10rem"}
                margin="0.5rem"
                display="flex"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                background="tint1"
                cursor="pointer"
                hoverElevation={2}
                onClick={()=>location.replace("/admin/users/" + getIDFromURL(window.location.href,"users") + "/messages")}
            >
                <Text>Send a message</Text>


            </Card>



      
        </Pane>
        </>
    )
})