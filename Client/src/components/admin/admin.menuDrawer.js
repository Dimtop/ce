import React,{useState,useEffect} from 'react';

//Components
import { SideSheet,Button,Position,Pane,Pill,toaster} from 'evergreen-ui';


//Libraries
import Cookies from "js-cookie"

//Helpers
import {getUserUnreadMessagesCount} from "../../helpers/dataManager"

export default function AdminMenuDrawer(props){


    const [messageCount,setMessageCount] = useState(0)


    useEffect(()=>{
        getUserUnreadMessagesCount((res)=>{
            if(res.error){
                toaster.danger(res.error)
                return
            }

            setMessageCount(res.data.count)
        })
    },[])
   

    return(
        <>
            <SideSheet
                position={Position.LEFT}
                isShown={props.showMenu}
                onCloseComplete={() => props.setShowMenu(false)}
                preventBodyScrolling
                width={"20rem"}
            >
                <Pane
                  width={"100%"}
                  display="flex"
                  justifyContent="center"
                  justifyItems="center"
                  alignItems="center"
                  flexDirection="column"
                  flexDirection="row"
                  flexWrap="wrap"
                >
                    <Button width="100%" margin={"1rem"} onClick={()=>location.replace("/admin/dashboard")}>Dashboard</Button>
                    <Button width="100%" margin={"1rem"}>Machines</Button>
                    <Button width="100%" margin={"1rem"}>Add new user</Button>
                    <Button appearance="primary" width="100%" margin={"1rem"} onClick={()=>{
                        Cookies.remove("authID")
                        location.reload()
                    }}>Logout</Button>
                </Pane>
          
            </SideSheet>
        </>
    )
}