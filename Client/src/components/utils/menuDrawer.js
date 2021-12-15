import React,{useState,useEffect} from 'react';

//Components
import { SideSheet,Button,Position,Pane,Pill,toaster} from 'evergreen-ui';


//Libraries
import Cookies from "js-cookie"

//Helpers
import {getUserUnreadMessagesCount} from "../../helpers/dataManager"

export default function MenuDrawer(props){


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
                    <Button width="100%" margin={"1rem"} onClick={()=>location.replace("/dashboard")}>Dashboard</Button>
                    <Button width="100%" margin={"1rem"} onClick={()=>location.replace("/account")}>Account settings</Button>
                    <Button width="100%" margin={"1rem"} onClick={()=>location.replace("/messages")}>
                        Messages
                        <Pill display="inline-flex" margin={8} color="red">
                            {messageCount}
                        </Pill>
                    </Button>
                    <Button width="100%" margin={"1rem"}>Request new machine</Button>
                    <Button width="100%" margin={"1rem"}>Contact</Button>
                    <Button appearance="primary" width="100%" margin={"1rem"} onClick={()=>{
                        Cookies.remove("authID")
                        location.replace("/")
                    }}>Logout</Button>
                </Pane>
          
            </SideSheet>
        </>
    )
}