import React,{useState,useEffect} from 'react'

//Icons
import MenuIcon from '@rsuite/icons/Menu';
//Components
import {Drawer,Button} from "rsuite"
import MenuDrawer from "./menuDrawer"

export default function Header(props){

    const [showMenu,setShowMenu] = useState(true)


    return(
        <>
     

        <div id="header">
        
            <div className="left">
                <h3 className="whiteText">Pavlos Topalidis CE Platform</h3>
            </div>
            <div  className="right">
                <Button appearance="primary" size="xs" onClick={()=>{
                    setShowMenu(!showMenu)
                }}>
                    <MenuIcon className="mainIcon whiteText"/>
                </Button>
          
            </div>
           
        </div>
           <MenuDrawer showMenu={showMenu} setShowMenu={setShowMenu}/>
        </>
    )
}