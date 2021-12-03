import React, {useState,useEffect} from 'react';


//Helpers
import { getAllUsers } from "../../helpers/dataManager";


//Libraries
import Cookies from 'js-cookie'

//Components
import {Button,Grid,Row,Col} from 'rsuite'
import GearIcon from '@rsuite/icons/Gear';

import {Pane,Text,Card,Heading,Spinner, toaster} from "evergreen-ui"


export default function AdminUsers(){
    
    const [users,setUsers] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)

    useEffect(()=>{
        getAllUsers((res)=>{
            if(res.error){
                toaster.error(res.error)
                return;
            }

           setUsers(res.data.users);
            setShowSpinner(false)
        })
    },[]);


    return(

        <div id="machinesContainer">
        <Heading size={900} textAlign="center">Users</Heading>
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
            {
                !showSpinner?
                users.map(user=>{
                    return(
                        <>
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
                              onClick={()=>location.replace("/admin/users/" + user._id )}
                            >
                                <Text>{user.bussinesName}</Text>

                            </Card>
                        </>
                    )
                })   
                :
                <Spinner />
            }
        </Pane>
           

        </div>
    )
}