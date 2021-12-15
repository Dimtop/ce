import React, {useState,useEffect} from 'react';


//Helpers
import { getUserMachines,deleteMachine } from "../../helpers/dataManager";
import getIDFromURL from "../../helpers/getIDFromURL";

//Libraries
import Cookies from 'js-cookie'

//Components
import {Button,Grid,Row,Col} from 'rsuite'
import GearIcon from '@rsuite/icons/Gear';
import { withRouter } from 'react-router-dom';

import {Pane,Text,Card,Heading,Spinner,TrashIcon,Dialog,IconButton} from "evergreen-ui"


export default withRouter(function AdminMachines(props){
    
    const [machines,setMachines] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)
    const [showDeleteMachineDialog,setShowDeleteMachineDialog] = useState(false)
    const [machineToDelete,setMachineToDelete] = useState("")

    useEffect(()=>{
        getUserMachines(getIDFromURL(window.location.href, "users"),(data)=>{
            console.log(data)
           // data.machines = [...data.machines,...data.machines,...data.machines,...data.machines,...data.machines]
            setMachines(data.machines);
            setShowSpinner(false)
        })
        props.history.push("/admin/users/" + getIDFromURL(window.location.href, "users")+"/machines")
    },[]);


    return(

        <div id="machinesContainer">
        <Heading size={900} textAlign="center" color="white">Machines for user {getIDFromURL(window.location.href, "users")}</Heading>
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
                           
                            >
                                <Text    onClick={()=>location.replace("/admin/users/" + getIDFromURL(window.location.href, "users") + "/machines/" +machine._id +"/fileTypes")}>{machine.name}</Text>
                                <Text size={300}>{machine.type}</Text>
                                <IconButton icon={TrashIcon} intent="danger" onClick={()=>{
                     
                                    setMachineToDelete(machine._id)
                                    setShowDeleteMachineDialog(true)
                                }}/>
                            </Card>
                        </>
                    )
                })   
                :
                <Spinner />
            }
        </Pane>
        <Dialog
                isShown={showDeleteMachineDialog}
                title="Διαγραφή μηχανήματος"
                intent="danger"
                onCloseComplete={() => setShowDeleteMachineDialog(false)}
                confirmLabel="Διαγραφή"
                onConfirm={()=>{
               
                    deleteMachine(machineToDelete,(res)=>{
                        if(res.error){
                            toaster.error(res.error)
                            return
                        }
                        location.reload()
                    })
                    
                
                }}
            >
                
                <Text>Θέλετε σίγουρα να διαγράψετε αυτό το μηχάνημα;</Text>
            </Dialog>

        </div>
    )
})