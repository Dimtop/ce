import React, {useState,useEffect} from 'react';


//Helpers
import { getAllUsers,deleteUser} from "../../helpers/dataManager";


//Libraries
import Cookies from 'js-cookie'

//Components
import {Button,Grid,Row,Col} from 'rsuite'
import GearIcon from '@rsuite/icons/Gear';

import {Pane,Text,Card,Heading,Spinner, toaster,IconButton,TrashIcon,Dialog} from "evergreen-ui"


export default function AdminUsers(){
    
    const [users,setUsers] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)
    const [showDeleteFileDialog,setShowDeleteFileDialog] = useState(false)
    const [userToDelete,setUserToDelete] = useState("")

    useEffect(()=>{
        getAllUsers((res)=>{
            if(res.error){
                toaster.error(res.error)
                return;
            }

           setUsers(res.data.users);
            setShowSpinner(false)
        })
    },[]);


    return(

        <div id="machinesContainer">
        <Heading size={900} textAlign="center" color="white">Users</Heading>
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
                <>
                {
                    users.map(user=>{
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
                                textAlign="center"
                                flexDirection="column"
                                background="tint1"
                                cursor="pointer"
                                hoverElevation={2}
                               
                                >
                                    <Text  onClick={()=>location.replace("/admin/users/" + user._id )}>{user.bussinesName}</Text>
                                    <IconButton icon={TrashIcon} intent="danger" onClick={()=>{
                                                setUserToDelete(user._id)
                                                setShowDeleteFileDialog(true)
                                            }}/>
                                </Card>
                            </>
                        )
                    })   
                }
                <Dialog
                        isShown={showDeleteFileDialog}
                        title="Διαγραφή χρήστη"
                        intent="danger"
                        onCloseComplete={() => setShowDeleteFileDialog(false)}
                        confirmLabel="Διαγραφή"
                        onConfirm={()=>{
                            if(!userToDelete || userToDelete==""){
                                toaster.danger("No user selected.")
                                return;
                            }
                            deleteUser(userToDelete,(res)=>{
                                if(res.error){
                                    toaster.danger(res.error)
                                    return;
                                }
                                location.reload()
                            })
                        }}
                    >
                       
                        <Text>Θέλετε σίγουρα να διαγράψετε αυτόν τον χρήστη;</Text>
                    </Dialog>
                </>
              
                :
                <Spinner />
            }
        </Pane>
           

        </div>
    )
}