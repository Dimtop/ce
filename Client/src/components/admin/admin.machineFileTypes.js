import React, {useState,useEffect} from 'react';

//Helpers
import {getMachineByID} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL";

//Components
import { toaster,Heading,Card,Pane,Text} from 'evergreen-ui';
import { withRouter } from 'react-router-dom';

export default withRouter(function AdminMachineFileTypes(props){

    const [machine,setMachine] = useState({})

    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];
        getMachineByID(machineID,(res)=>{
            if(res.error){
                toaster.danger(error);
                return;
            }
            setMachine(res.data.machine);
        })
        props.history.push("/admin/users/" +getIDFromURL(window.location.href, "users") +"/machines/" +machineID+"/fileTypes"  )
    },[])

    return(
        <div id="machinesContainer">
            <Heading size={900} textAlign="center"             color="white">Αρχεία για το μηχάνημα {machine.name + " " + machine.type}</Heading>
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
                    onClick={()=>location.replace("/admin/users/" +getIDFromURL(window.location.href, "users") + "/machines/" + machine._id )}
                    >
                        <Text>Machine data</Text>
                        <Text size={300} textAlign="center">Ενημέρωση στοιχείων μηχανήματος</Text>
                </Card>
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
                    onClick={()=>location.replace("/admin/users/" +getIDFromURL(window.location.href, "users") + "/machines/" + machine._id + "/files/presetFiles")}
                    >
                        <Text>Preset files</Text>
                        <Text size={300} textAlign="center">Αρχεία που έχουν καταχωρηθεί από τον διαχειριστή</Text>
                </Card>
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
                    onClick={()=>location.replace("/admin/users/" +getIDFromURL(window.location.href, "users") + "/machines/" + machine._id + "/files/manualFiles")}
                    >
                        <Text>Manual files</Text>
                        <Text size={300} textAlign="center">Αρχεία που πρέπει να καταχωρηθούν από τον χρήστη</Text>
                </Card>
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
                    onClick={()=>location.replace("/admin/users/" +getIDFromURL(window.location.href, "users") + "/machines/" + machine._id + "/files/variableFiles")}
                    >
                        <Text>Variable files</Text>
                        <Text size={300} textAlign="center">Αρχεία που πρέπει να συμπληρωθούν από τον χρήστη</Text>
                </Card>
            </Pane>
           

        </div>
    )
    
})