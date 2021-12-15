import React,{useState,useEffect} from "react";

//Helpers
import {getMachineByID,uploadMachineFile,deleteMachineFile} from "../../helpers/dataManager"
import getFileNameFromURL from "../../helpers/getFileNameFromURL"

//Components
import { toaster,Heading,Card,Pane,Text,Tablist,Tab,Spinner,Button,IconButton,TrashIcon,AddIcon,Dialog,FilePicker} from 'evergreen-ui';


//Libraries
import download from "downloadjs"

export default function AdminPresetFiles(props){
    const [machine,setMachine] = useState({})
    const [showSpinner,setShowSpinner] = useState(true)
    const [showNewFileDialog,setShowNewFileDialog] = useState(false)
    const [showDeleteFileDialog,setShowDeleteFileDialog] = useState(false)
    const [fileType] = useState("fixedFiles")
    const [fileMode,setFileMode] = useState("")
    const [fileToDelete,setFileToDelete] = useState("")
    const [fileToUpload,setFileToUpload] = useState(null)

    const [tabs] = useState([
        {
            name:"Λίστα απαιτήσεων ασφαλείας",
            accessor:"safetyList"
        },
        {
            name:"Πίνακας απαιτήσεων ασφαλείας",
            accessor:"safetyMatrix"
        },
        {
            name:"Μελέτη αξιολόγησης κινδύνων",
            accessor:"riskAssessmentStudy"
        },
        {
            name:"Τεύχος τυχόν υπολογισμών",
            accessor:"calculationsFile"
        },
        {
            name:"Τεύχος δοκιμών που απαιτούνται",
            accessor:"testsFile"
        },
        {
            name:"Λίστα νομοθεσίας και προτύπων",
            accessor:"testsFile"
        },
        {
            name:"Εγχειρίδια χρήσης",
            accessor:"manuals"
        },
        {
            name:"Πλάνο ποιοτικού ελέγχου",
            accessor:"qualityControl"
        }
        
    ])
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];
        getMachineByID(machineID,(res)=>{
            if(res.error){
                toaster.danger(error);
                return;
            }
            setMachine(res.data.machine);
            setShowSpinner(false)
        })
    },[])

    return(
        <>
        {

            !showSpinner?
            <div id="machinesContainer">
                <Heading size={900} textAlign="center" color="white">Preset files for {machine.name + " " + machine.type}</Heading>
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
                <Tablist marginBottom={16}   flex={"0 0 100%"} textAlign="center">
                    {tabs.map((tab, index) => (
                    <Tab
                    color="white"
                        key={tab.name}
                        id={tab.accessor}
                        onSelect={() => setSelectedIndex(index)}
                        isSelected={index === selectedIndex}
                        aria-controls={`panel-${tab.name}`}
                    >
                        {tab.name}
                    </Tab>
                    ))}
                </Tablist>
                <Pane padding={16} background="#F4F5F9"  flex={"0 0 100%"} textAlign="center" width="100%" heigh="100%">
                    <Text>Click in any file to view</Text>
                    {tabs.map((tab, index) => (
                    <Pane
                        key={tab.name}
                        id={`panel-${tab.name}`}
                        role="tabpanel"
                        aria-labelledby={tab.name}
                        aria-hidden={index !== selectedIndex}
                        display={index === selectedIndex ? 'block' : 'none'}
                    >
                        {
                            machine.fixedFiles[tab.accessor].links.length==0?
                            <>
                                         <Text fontWeight="bold">No files found.</Text>

                            <Card 
                            key={tab.name+"1"}
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
                                setFileMode(tab.accessor)    
                                setShowNewFileDialog(true)
                                console.log(showNewFileDialog)
                            }}/>
                            </Card>
                            </>
               
                            :
                            <>
                            {
                            machine.fixedFiles[tab.accessor].links.map(l=>{
                                return(
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
                                       <Text 
                                       wordBreak="break-all"
                                       wordWrap="break-word" 
                                       onClick={()=>{
                                           window.open(l,"_blank")
                                   
                                       }}>
                                       {getFileNameFromURL(l)}
                                     
                                       </Text>
                                       <IconButton icon={TrashIcon} intent="danger" onClick={()=>{
                                            setFileMode(tab.accessor)
                                            setFileToDelete(l)
                                            setShowDeleteFileDialog(true)
                                        }}/>
                                   </Card>
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
                            key="addnew"
                            hoverElevation={2}
                        >
                      
                            <IconButton icon={AddIcon} onClick={()=>{
                                setFileMode(tab.accessor)    
                                setShowNewFileDialog(true)
                                console.log(showNewFileDialog)
                            }}/>
                            </Card>
                          
                            </>
                         
                        }
                    </Pane>
                    ))}
                </Pane>
                </Pane>
                <Dialog
                        isShown={showNewFileDialog}
                        title="Μεταφόρτωση νέου αρχείου"
                        onCloseComplete={() => setShowNewFileDialog(false)}
                        confirmLabel="Μεταφόρτωση"
                        onConfirm={()=>{
                            if(!fileToUpload){
                                toaster.danger("Please select a file.");
                                return;
                            }

                            uploadMachineFile(fileType,fileMode,fileToUpload,machine._id,(res)=>{
                                if(res.error){
                                    toaster.danger(res.error)
                                    return;
                                }
                                toaster.success(res.success)
                                setShowNewFileDialog(false)
                                location.reload()
                            })
                        }}
                    >
                         <FilePicker
                            name="newFile"
                            placeholder="Επιλογή αρχείου μεταφόρτωσης"
                            onChange={(file)=>{
                                setFileToUpload(file);
                            }}
                        />
                    </Dialog>
                    <Dialog
                        isShown={showDeleteFileDialog}
                        title="Διαγραφή αρχείου"
                        intent="danger"
                        onCloseComplete={() => setShowDeleteFileDialog(false)}
                        confirmLabel="Διαγραφή"
                        onConfirm={()=>{
                            deleteMachineFile(fileType,fileMode,fileToDelete,machine._id,(res)=>{
                                if(res.error){
                                    toaster.danger(res.error)
                                    return;
                                }
                                toaster.success(res.success)
                                setShowDeleteFileDialog(false)
                                location.reload()
                            })
                        }}
                    >
                       
                        <Text>Θέλετε σίγουρα να διαγράψετε αυτό το αρχείο;</Text>
                    </Dialog>

            </div>

            :
            <Spinner />
        }
        </>
        
    )
}