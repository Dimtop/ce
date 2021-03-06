import React,{useState,useEffect} from "react";

//Helpers
import {getMachineByID,updateMachineFiles} from "../helpers/dataManager"
import getIDFromURL from "../helpers/getIDFromURL"
import changeMachineVariableFilesData from "../helpers/changeMachineVariableFilesData"

//Components
import { toaster,Heading,Card,Pane,Text,Tablist,Tab,Spinner,Button,TextInputField} from 'evergreen-ui';
import{DatePicker,Panel} from 'rsuite';

//Libraries
import download from "downloadjs"

//Constants
import variableFilesFields from "../constants/variableFilesFields"

export default function VariableFiles(props){
    const [machine,setMachine] = useState({})
    const [showSpinner,setShowSpinner] = useState(true)
    const [fID,setFID] = useState(getIDFromURL(window.location.href,"variableFiles"))
    const [tabs] = useState([
        {
            name:"Δήλωση συμμόρφωσης",
            accessor:"declarationOfCompliance"
        },
        {
            name:"Έντυπα ελέγχου παραγωγικής διαδικασίας",
            accessor:"production"
        },
        {
            name:"Έντυπα δοκιμών και ποιοτικού ελέγχου",
            accessor:"qualityControlAndTests"
        },
        {
            name:"Λίστα υλικών",
            accessor:"partsList"
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
            console.log(res.data.machine)
            setMachine(res.data.machine);
            setShowSpinner(false)
        })

 
    },[])


 

    return(
        <>
        {

            !showSpinner?
            <div id="machinesContainer">
                <Heading size={900} textAlign="center" color="white">Variable files for {machine.name + " " + machine.type}</Heading>
                <Heading size={700} textAlign="center" color="white">Serial number: {machine.variableFiles[fID].serialNumber}</Heading>
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
                    <Pane padding={16} background="#F4F5F9"  flex={"0 0 100%"} textAlign="center" justifyContent="center" justifyItems="center" alignItems="center" width="100%" height="100%">
                    {
                        tabs.map((tab, index) => {
                            return(
                                <>
                                 <Pane
                                    key={tab.accessor}
                                    id={`panel-${tab.accessor}`}
                                    role="tabpanel"
                                    aria-labelledby={tab}
                                    aria-hidden={index !== selectedIndex}
                                    display={index === selectedIndex ? 'flex' : 'none'}
                                    flexDirection="column"
                                    justifyContent="center" 
                                    justifyItems="center" 
                                    alignItems="center" 
                                    width="100%"
                                >
                                {
                                    tab.accessor=="declarationOfCompliance"?
                                  
                                        <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                            <Pane width="100%" marginBottom="2rem">
                                                <Button intent="success" width="20rem" onClick={()=>{
                                                    console.log(machine)
                                                    updateMachineFiles(machine._id,machine,(res)=>{
                                                        if(res.error){
                                                            toaster.danger(res.error);
                                                            return;
                                                        }
                                                        toaster.success(res.success);
                                                        
                                                    })
                                           
                                                }}>Αποθήκευση</Button>
                                                <Button intent="info" width="20rem" marginTop="1rem" onClick={()=>{
                                                    window.open("/machines/" + machine._id + "/files/variableFiles/"+fID+"/declarationOfCompliance","_blank")
                                                }}>Εκτύπωση αρχείου</Button>
                                            </Pane>

                                            <Heading size="400">{"Ημερομηνία έκδοσης"}</Heading>
                                            <DatePicker style={{minWidth:"100%"}} value={new Date(
                                                machine.variableFiles?
                                                machine.variableFiles[fID][tab.accessor]?
                                                machine.variableFiles[fID][tab.accessor].data?
                                                machine.variableFiles[fID][tab.accessor].data["issueDate"]
                                                :""
                                                :""
                                                :""
                                            )} onChange={(date)=>setMachine(
                                                changeMachineVariableFilesData(machine,fID,tab.accessor,"issueDate",date.toString())
                                            )}/>

                                            <Heading size="400">{"Ημερομηνία παραγωγής"}</Heading>
                                            <DatePicker style={{minWidth:"100%"}} value={new Date(
                                                machine.variableFiles?
                                                machine.variableFiles[fID][tab.accessor]?
                                                machine.variableFiles[fID][tab.accessor].data?
                                                machine.variableFiles[fID][tab.accessor].data["productionDate"]
                                                :""
                                                :""
                                                :""
                                            )} onChange={(date)=>setMachine(
                                                changeMachineVariableFilesData(machine,fID,tab.accessor,"productionDate",date.toString())
                                            )}/>

                                            <TextInputField width="100%" marginBottom="0" label="Υπεύθυνος παραγωγής" color="black" value={
                                                machine.variableFiles?
                                                machine.variableFiles[fID][tab.accessor]?
                                                machine.variableFiles[fID][tab.accessor].data?
                                                machine.variableFiles[fID][tab.accessor].data["productionManager"]
                                                :""
                                                :""
                                                :""
                                            } onChange={(e)=>setMachine(
                                                changeMachineVariableFilesData(machine,fID,tab.accessor,"productionManager",e.target.value)
                                            )}/>

                                           
                                        </Pane>
                                    :
                                    tab.accessor=="qualityControlAndTests"?
                                    <Heading>Under construction</Heading>
                                   
                                   
                                    :
                                    tab.accessor=="production"?
                                    <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem" onClick={()=>{
                                                    updateMachineFiles(machine._id,machine,(res)=>{
                                                        if(res.error){
                                                            toaster.danger(res.error);
                                                            return;
                                                        }
                                                        toaster.success(res.success);
                                                        
                                                    })
                                                }}>Αποθήκευση</Button>
                                            <Button intent="info" width="20rem" marginTop="1rem" onClick={()=>{
                                                 window.open("/machines/" + machine._id + "/files/variableFiles/"+fID+"/production","_blank")
                                            }}>Εκτύπωση αρχείου</Button>
                                        </Pane>
                                        
                                        <Heading size="400">{"Ημερομηνία έναρξης εργασιών"}</Heading>
                                        <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["startDate"]
                                            :""
                                            :""
                                            :""
                                        )} onChange={(date)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"startDate",date.toString())
                                        )}/>

                                      

                                        <TextInputField width="100%" marginBottom="0" label="Υπεύθυνος παραγωγής" color="black" value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["productionManager"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"productionManager",e.target.value)
                                        )}/>

                                       

                                        <TextInputField width="100%" marginBottom="0"  label="Αριθμός παραγγελίας" color="black" type="number" value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["orderNumber"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"orderNumber",e.target.value)
                                        )}/>

                                        <TextInputField width="100%" marginBottom="0"  label="Τεμάχια" color="black" type="number" value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["quantity"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"quantity",e.target.value)
                                        )}/>

                                        <Heading size="400">{"Σειρά εκτέλεσης και είδος εργασιών"}</Heading>
                                        <Card
                                            elevation={1}
                                            float="left"
                                            width={"100%"}
                                            padding="1rem"
                                            margin="0.5rem"
                                            display="flex"
                                            justifyContent="center"
                                            justifyItems="center"
                                            alignItems="center"
                                            flexDirection="row"
                                            background="tint1"
                                            flexWrap="wrap"
                                        >
                                            <Heading size="500"  marginBottom="10px" >{"Κοπές"}</Heading>
                                     
                                            <TextInputField width="100%" marginBottom="0"  label="Τεχνίτης"  value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.cuts.name
                                            :""
                                            :""
                                            :""
                                            } 
                                            onChange={e=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.cuts.name = e.target.value;
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            
                                            }}/>
                                            <Heading size="400">{"Ημερομηνία"}</Heading>
                                            <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.cuts.date
                                            :""
                                            :""
                                            :""
                                            )} onChange={(date)=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.cuts.date = date.toString();
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            }
                                            
                                             
                                            }/>

                                        </Card>
                                        <Card
                                            elevation={1}
                                            float="left"
                                            width={"100%"}
                                            padding="1rem"
                                            margin="0.5rem"
                                            display="flex"
                                            justifyContent="center"
                                            justifyItems="center"
                                            alignItems="center"
                                            flexDirection="row"
                                            background="tint1"
                                            flexWrap="wrap"
                                        >
                                            <Heading size="500"  marginBottom="10px" >{"Συγκολλήσεις"}</Heading>
                                     
                                            <TextInputField width="100%" marginBottom="0"  label="Τεχνίτης"  value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.soldering.name
                                            :""
                                            :""
                                            :""
                                            } onChange={(e)=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.soldering.name = e.target.value;
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            }}/>
                                            <Heading size="400">{"Ημερομηνία"}</Heading>
                                            <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.soldering.date
                                            :""
                                            :""
                                            :""
                                            )} onChange={(date)=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.soldering.date = date.toString();
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            }}/>

                                        </Card>
                                        <Card
                                            elevation={1}
                                            float="left"
                                            width={"100%"}
                                            padding="1rem"
                                            margin="0.5rem"
                                            display="flex"
                                            justifyContent="center"
                                            justifyItems="center"
                                            alignItems="center"
                                            flexDirection="row"
                                            background="tint1"
                                            flexWrap="wrap"
                                        >
                                            <Heading size="500"  marginBottom="10px" >{"Μοντάρισμα"}</Heading>
                                     
                                            <TextInputField width="100%" marginBottom="0"  label="Τεχνίτης"  value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.modding.name
                                            :""
                                            :""
                                            :""
                                            } onChange={(e)=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.modding.name = e.target.value;
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            }}/>
                                            <Heading size="400">{"Ημερομηνία"}</Heading>
                                            <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data.jobs.modding.date
                                            :""
                                            :""
                                            :""
                                            )} onChange={(date)=>{
                                                var tmpVariableFiles = machine.variableFiles;
                                                tmpVariableFiles[fID][tab.accessor].data.jobs.modding.date = date.toString();
                                                setMachine( {
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles                                            
                                                });
                                            }}/>

                                        </Card>

                                        
                                    </Pane>
                                    :
                                    tab.accessor=="partsList"?
                                    <>
                                    <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem" onClick={()=>{
                                                    updateMachineFiles(machine._id,machine,(res)=>{
                                                        if(res.error){
                                                            toaster.danger(res.error);
                                                            return;
                                                        }
                                                        toaster.success(res.success);
                                                        
                                                    })
                                                }}>Αποθήκευση</Button>
                                            <Button intent="info" width="20rem" marginTop="1rem" onClick={()=>{
                                                   window.open("/machines/" + machine._id + "/files/variableFiles/"+fID+"/partsList","_blank")
                                            }}>Εκτύπωση αρχείου</Button>
                                        </Pane>
                                        
                                        <Heading size="400">{"Ημερομηνία έκδοσης"}</Heading>
                                        <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["issueDate"]
                                            :""
                                            :""
                                            :""
                                        )} onChange={(date)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"issueDate",date.toString())
                                        )}/>

                                        <Heading size="400">{"Ημερομηνία παραγωγής"}</Heading>
                                        <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["productionDate"]
                                            :""
                                            :""
                                            :""
                                        )} onChange={(date)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"productionDate",date.toString())
                                        )}/>

                                        <TextInputField width="100%" marginBottom="0" label="Υπεύθυνος παραγωγής" value={
                                            machine.variableFiles?
                                            machine.variableFiles[fID][tab.accessor]?
                                            machine.variableFiles[fID][tab.accessor].data?
                                            machine.variableFiles[fID][tab.accessor].data["productionManager"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine(
                                            changeMachineVariableFilesData(machine,fID,tab.accessor,"productionManager",e.target.value)
                                        )}/>

           
                                 
                                


                                   
                                        </Pane>
                                        <Heading size="400" marginTop="2rem">{"Λίστα υλικών"}</Heading>
                                        {
                                            machine.variableFiles[fID].partsList?
                                            machine.variableFiles[fID].partsList.data?
                                            machine.variableFiles[fID].partsList.data.parts?
                                            <>
                                            {
                                                machine.variableFiles[fID].partsList.data.parts.length==0?
                                                <>
                                                <Heading size="500">Δεν βρέθηκαν υλικά</Heading>
                                            
                                                </>
                                            
                                                :
                                                machine.variableFiles[fID].partsList.data.parts.map((p,pi)=>{
                                                    return(
                                                        <Card
                                                        elevation={1}
                                                        float="left"
                                                        width={"100%"}
                                                        padding="1rem"
                                                        margin="0.5rem"
                                                        display="flex"
                                                        justifyContent="center"
                                                        justifyItems="center"
                                                        alignItems="center"
                                                        flexDirection="row"
                                                        background="tint1"
                                                        flexWrap="wrap"
                                                        >
                                                        <TextInputField margin="1rem" label="Όνομα" value={p.name} onChange={(e)=>{

                                                            var tmpVariableFiles = machine.variableFiles
                                                            tmpVariableFiles[fID][tab.accessor].data.parts[pi].name = e.target.value
                                                     
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:tmpVariableFiles
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Περιγραφή"  value={p.description} onChange={(e)=>{
                                                             
                                                            var tmpVariableFiles = machine.variableFiles
                                                            tmpVariableFiles[fID][tab.accessor].data.parts[pi].description = e.target.value
                                                     
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:tmpVariableFiles
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Αριθμός σειράς" value={p.serialNumber} onChange={(e)=>{
                                                              
                                                            var tmpVariableFiles = machine.variableFiles
                                                            tmpVariableFiles[fID][tab.accessor].data.parts[pi].serialNumber = e.target.value
                                                     
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:tmpVariableFiles
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Προμηθευτής"  value={p.vendor} onChange={(e)=>{
                                                            
                                                            var tmpVariableFiles = machine.variableFiles
                                                            tmpVariableFiles[fID][tab.accessor].data.parts[pi].vendor = e.target.value
                                                     
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:tmpVariableFiles
                                                              })
                                                        }}/>
                                                        <Pane width="100%">
                                                        <Button intent="danger" width="20rem" onClick={()=>{
                                                            
                                                            var tmpVariableFiles = machine.variableFiles
                                                            tmpVariableFiles[fID][tab.accessor].data.parts.splice(pi,1) 
                                                     
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:tmpVariableFiles
                                                              })
                                                             
                                                           
                                                        }}>Αφαίρεση</Button>
                                                        </Pane>
                                                        
                                                        </Card>
                                                    )
                                                })
                                            }
                                            <Button appearance="primary" marginTop="1rem" width="20rem" onClick={()=>{
                                                var tmpVariableFiles = machine.variableFiles
                                                tmpVariableFiles[fID][tab.accessor].data.parts.push({
                                                    name:"",
                                                    description:"",
                                                    serialNumber:"",
                                                    vendor:""
                                                })

                                                setMachine({
                                                    ...machine,
                                                    variableFiles:tmpVariableFiles
                                                })
                                          
                                            }}>Προσθήκη</Button>
                                            </>
                                            : 
                                            <></>
                                            :
                                            <></>
                                            :<></>
                                        }
                                        </>
                                    :
                                    <></>
                                }
                                </Pane>
                                </>
                            )

                        })

                      
                    }
                    </Pane>
                </Pane>
            

            </div>

            :
            <Spinner />
        }
        </>
        
    )
}





  /*
                                        <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem" onClick={()=>{
                                                    updateMachineFiles(machine._id,machine,(res)=>{
                                                        if(res.error){
                                                            toaster.danger(res.error);
                                                            return;
                                                        }
                                                        toaster.success(res.success);
                                                        
                                                    })
                                                }}>Αποθήκευση</Button>
                                            <Button intent="info" width="20rem" marginTop="1rem">Εκτύπωση αρχείου</Button>
                                        </Pane>
                                        
                                        <Heading size="400">{"Ημερομηνία έκδοσης"}</Heading>
                                        <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[tab.accessor]?
                                            machine.variableFiles[tab.accessor].data?
                                            machine.variableFiles[tab.accessor].data["issueDate"]
                                            :""
                                            :""
                                            :""
                                        )} onChange={(date)=>setMachine({
                                            ...machine,
                                            variableFiles:{
                                                ...machine.variableFiles,
                                                [tab.accessor]:{
                                                    data:{
                                                        ...machine.variableFiles[tab.accessor].data,
                                                        issueDate:date.toString()
                                                    }
                                                }
                                            }
                                        })}/>

                                        <Heading size="400">{"Ημερομηνία παραγωγής"}</Heading>
                                        <DatePicker style={{minWidth:"100%"}} value={new Date(
                                            machine.variableFiles?
                                            machine.variableFiles[tab.accessor]?
                                            machine.variableFiles[tab.accessor].data?
                                            machine.variableFiles[tab.accessor].data["productionDate"]
                                            :""
                                            :""
                                            :""
                                        )} onChange={(date)=>setMachine({
                                            ...machine,
                                            variableFiles:{
                                                ...machine.variableFiles,
                                                [tab.accessor]:{
                                                    data:{
                                                        ...machine.variableFiles[tab.accessor].data,
                                                        productionDate:date.toString()
                                                    }
                                                }
                                            }
                                        })}/>

                                        <TextInputField width="100%" marginBottom="0" label="Υπεύθυνος παραγωγής" value={
                                            machine.variableFiles?
                                            machine.variableFiles[tab.accessor]?
                                            machine.variableFiles[tab.accessor].data?
                                            machine.variableFiles[tab.accessor].data["productionManager"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine({
                                            ...machine,
                                            variableFiles:{
                                                ...machine.variableFiles,
                                                [tab.accessor]:{
                                                    data:{
                                                        ...machine.variableFiles[tab.accessor].data,
                                                        productionManager:e.target.value
                                                    }
                                                }
                                            }
                                        })}/>

                                        <TextInputField width="100%" marginBottom="0"  label="Αριθμός σειράς" value={
                                            machine.variableFiles?
                                            machine.variableFiles[tab.accessor]?
                                            machine.variableFiles[tab.accessor].data?
                                            machine.variableFiles[tab.accessor].data["serialNumber"]
                                            :""
                                            :""
                                            :""
                                        } onChange={(e)=>setMachine({
                                            ...machine,
                                            variableFiles:{
                                                ...machine.variableFiles,
                                                [tab.accessor]:{
                                                    data:{
                                                        ...machine.variableFiles[tab.accessor].data,
                                                        serialNumber:e.target.value
                                                    }
                                                }
                                            }
                                        })}/>


                                        <Button width="100%" marginTop="1rem" onClick={()=>{
                              
                                            setMachine({
                                                ...machine,
                                                variableFiles:{
                                                    ...machine.variableFiles,
                                                    qualityControlAndTests:{
                                                        data:{
                                                            serialNumber:machine.variableFiles.declarationOfCompliance.data.serialNumber,
                                                            productionManager:machine.variableFiles.declarationOfCompliance.data.productionManager,
                                                            productionDate:machine.variableFiles.declarationOfCompliance.data.productionDate.toString(),
                                                            issueDate:machine.variableFiles.declarationOfCompliance.data.issueDate.toString(),
                                                        }
                                                    }
                                                }
                                                
                                            })
                                            console.log(machine)
                                        }}>Copy from declaration of compliance</Button>
                                    </Pane>
                                    */

