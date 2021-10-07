import React,{useState,useEffect} from 'react';

//Components
import {Drawer,Button} from "rsuite" 


export default function MenuDrawer(props){


    console.log(props)
   

    return(
        <>
   
            <Drawer placement="left" open={props.showMenu} onClose={() => props.setShowMenu(false)} size="lg">
            <Button appearance="primary">Στοιχεία λογαριασμού</Button>
                    <Button appearance="primary">Αποσύνδεση</Button>
               
            </Drawer>
        </>
    )
}