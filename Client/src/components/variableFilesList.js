import React, {useState,useEffect} from "react"


//Components
import {Pane,Spinner,Heading,IconButton,AddIcon,Card,Dialog,TextInputField,TrashIcon,Text} from "evergreen-ui"
import { withRouter } from 'react-router-dom';


//Helpers
import {getMachineByID,updateMachineFiles} from "../helpers/dataManager"


export default withRouter(function VariableFilesList(props){


    const [showSpinner,setShowSpinner] = useState(true)
    const [machine,setMachine] = useState({})
    const [showNewSerialDialog,setShowNewSerialDialog] = useState(false)
    const [showDeleteSerialDialog,setShowDeleteSerialDialog] = useState(false)
    const [newSerialNumber,setNewSerialNumber] = useState("");
    const [serialToDelete,setSerialToDelete] = useState(-1)

    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];
        getMachineByID(machineID,(res)=>{
            if(res.error){
                toaster.danger(error);
                return;
            }
            console.log(res.data.machine)
            setMachine(res.data.machine);
            setShowSpinner(false)
        })
        props.history.push("/machines/" + machineID + "/files/variableFiles")
    },[])
   



    return(
        <>
        {
            showSpinner?

            <Spinner/>

            :
            <>
            <div id="machinesContainer">
            <Heading size={900} textAlign="center" color="white">Variable files for {machine.name + " " + machine.type}</Heading>
            <Pane 
            clearfix  
            width={"100%"}
            marginTop={"5rem"}
            display="flex"
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            flexDirection="column"
            flexDirection="row"
            flexWrap="wrap"
            >
                <Pane padding={16} background="#F4F5F9"  flex={"0 0 100%"} textAlign="center" width="100%" height="100%">
                {
                    machine.variableFiles.map((f,fi)=>{
                        return(
                            <> 
                                <Card 
                                elevation={1}
                                float="left"
                                width={"7rem"}
                                height={"7rem"}
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
                                <Text  onClick={()=>{
                                    location.replace("/machines/" + machine._id+"/files/variableFiles/" + fi)
                                }}><b>Serial number: </b>{f.serialNumber}</Text>
                                <IconButton icon={TrashIcon} intent="danger" onClick={()=>{
                                        setSerialToDelete(fi);
                                          setShowDeleteSerialDialog(true)
                                      }}/>
                            </Card>

                            </>
                        )
                    })
                }
                <Card 
                            elevation={1}
                            float="left"
                            width={"7rem"}
                            height={"7rem"}
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
                      
                      <IconButton icon={AddIcon} onClick={()=>{
                       // setFileMode(tab.accessor)    
                        setShowNewSerialDialog(true)
                      }}/>
                        </Card>
                </Pane>
            </Pane>
            <Dialog
                isShown={showNewSerialDialog}
                title="???????????????????? ???????? ?????????????????? ??????????????"
                onCloseComplete={() => setShowNewSerialDialog(false)}
                confirmLabel="????????????????????"
                onConfirm={()=>{
                    var currVariableFiles = machine.variableFiles;
                    currVariableFiles.push({
                        serialNumber:newSerialNumber,
                        qualityControlAndTests:{
                            data:{
                                issueDate:new Date(),
                                productionDate:new Date(),
                                productionManager:""
                            },
                            fileCode:""
                        },
                        production:{
                            data:{
                                orderNumber:"",
                                quantity:0,
                                jobs:{
                                    cuts:{
                                        name:"",
                                        date:new Date()
                                    },
                                    soldering:{
                                        name:"",
                                        date:new Date()
                                    },
                                    modding:{
                                        name:"",
                                        date:new Date()
                                    }
                                },
                
                                startDate:new Date(),
                               
                                productionManager:""
                            },
                            fileCode:""
                        },
                        partsList:{
                            data:{
                
                                issueDate:new Date(),
                                productionDate:new Date(),
                                productionManager:"",
                                parts:[]
                            },
                            fileCode:""
                        },
                        declarationOfCompliance:{
                            data:{
                
                                issueDate:new Date(),
                                productionDate:new Date(),
                                productionManager:""
                            },
                            fileCode:""
                        }
                    })
                    updateMachineFiles(machine._id,{
                        ...machine,
                        variableFiles:currVariableFiles
                    },(res)=>{
                        if(res.error){
                            toaster.error(res.error)
                            return
                        }
                        location.reload()
                    })
                 
                
                }}
            >
                <TextInputField 
                label="?? ?????????? ?????????????????? ???????????? ???? ?????????? ??????????-?????????????? ????????????"
                type="text"
                placeholder="Serial Number"
                color="white"
                onChange={e=>{
                    setNewSerialNumber(e.target.value)
                }}
                
                />
        
            </Dialog>
            <Dialog
                        isShown={showDeleteSerialDialog}
                        title="???????????????? ?????????????????? ??????????????"
                        intent="danger"
                        onCloseComplete={() => setShowDeleteSerialDialog(false)}
                        confirmLabel="????????????????"
                        onConfirm={()=>{
                            var currVariableFiles = machine.variableFiles;
                            currVariableFiles.splice(serialToDelete,1);
                            updateMachineFiles(machine._id,{
                                ...machine,
                                variableFiles:currVariableFiles
                            },(res)=>{
                                if(res.error){
                                    toaster.error(res.error)
                                    return
                                }
                                location.reload()
                            })
                         
                        
                        }}
                    >
                       
                       <Text>???????????? ?????????????? ???? ???????????????????? ?????????? ?????? ???????????????? ????????????;</Text>
                    </Dialog>
            </div>
            </>
        }
       

        </>
    )
})