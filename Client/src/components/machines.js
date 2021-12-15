import React, {useState,useEffect} from 'react';


//Helpers
import { getUserMachines } from "../helpers/dataManager";


//Libraries
import Cookies from 'js-cookie'

//Components
import {Button,Grid,Row,Col} from 'rsuite'
import GearIcon from '@rsuite/icons/Gear';

import {Pane,Text,Card,Heading,Spinner} from "evergreen-ui"


export default function Machines(){
    
    const [machines,setMachines] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)

    useEffect(()=>{
        getUserMachines(Cookies.get("authID"),(data)=>{
            console.log(data)
           // data.machines = [...data.machines,...data.machines,...data.machines,...data.machines,...data.machines]
            setMachines(data.machines);
            setShowSpinner(false)
        })
    },[]);


    return(

        <div id="machinesContainer">
        <Heading size={900} textAlign="center"             color="white">My machines</Heading>
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
                machines.map(machine=>{
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
                              flexDirection="column"
                              background="tint1"
                              cursor="pointer"
                              hoverElevation={2}
                              onClick={()=>location.replace("/machines/" + machine._id + "/fileTypes")}
                            >
                                <Text>{machine.name}</Text>
                                <Text size={300}>{machine.type}</Text>
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