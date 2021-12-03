import React,{useState,useEffect} from 'react'

//Icons

//Components
import {Drawer,Button} from "rsuite"
import {Pane,Heading,MenuIcon,IconButton } from "evergreen-ui"
import AdminMenuDrawer from "./admin.menuDrawer"

export default function AdminHeader(props){

    const [showMenu,setShowMenu] = useState(false)


    return(
        <>
     

        <div id="header">
            <Pane  style={{width:"100%",height:"100%"}} display="flex" alignItems="center" justifyContent="start" border="none">
            <IconButton icon={MenuIcon} marginRight="2rem" onClick={()=>setShowMenu(true)}/> 
            <Heading size="500" >Pavlos Topalidis CE Platform</Heading>
            </Pane>

        </div>
        <AdminMenuDrawer showMenu={showMenu} setShowMenu={setShowMenu}/>
           
        </>
    )
}