import React,{useState,useEffect} from 'react';

//Components
import { SideSheet,Button,Position,Pane,Pill} from 'evergreen-ui';


//Libraries
import Cookies from "js-cookie"

export default function MenuDrawer(props){


    console.log(props)
   

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
                    <Button width="100%" margin={"1rem"}>Dashboard</Button>
                    <Button width="100%" margin={"1rem"} onClick={()=>location.replace("/account")}>Account settings</Button>
                    <Button width="100%" margin={"1rem"}>
                        Messages
                        <Pill display="inline-flex" margin={8} color="red">
                            24
                        </Pill>
                    </Button>
                    <Button width="100%" margin={"1rem"}>Request new machine</Button>
                    <Button width="100%" margin={"1rem"}>Contact</Button>
                    <Button appearance="primary" width="100%" margin={"1rem"} onClick={()=>{
                        Cookies.remove("authID")
                        location.reload()
                    }}>Logout</Button>
                </Pane>
          
            </SideSheet>
        </>
    )
}