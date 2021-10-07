import React, {useState,useEffect} from 'react';


//Helpers
import { getUserMachines } from "../helpers/dataManager";


//Libraries
import Cookies from 'js-cookie'

//Components
import {Button,Grid,Row,Col} from 'rsuite'
import GearIcon from '@rsuite/icons/Gear';


export default function Machines(){
    
    const [machines,setMachines] = useState([])

    useEffect(()=>{
        getUserMachines(Cookies.get("authID"),(data)=>{
            console.log(data)
            setMachines(data.machines);
        })
    },[]);


    return(

        <>
            <Grid >
                <Row>
                        {
                        machines.map(machine=>{
                            return(
                                <div key={machine._id}>
                                <Col xs={12} md={8}>
                                    <Button className="machineButton" appearance="primary">
                                        <GearIcon className="mainIcon"/>
                                        {machine.name + " " + machine.type}
                                    </Button>
                                </Col>
                            
                                </div>
                            )
                        })
                    }
                </Row>
            </Grid>
           

        </>
    )
}