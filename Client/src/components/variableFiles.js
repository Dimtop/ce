import React,{useState,useEffect} from "react";

//Helpers
import {getMachineByID} from "../helpers/dataManager"
import getFileNameFromURL from "../helpers/getFileNameFromURL"
import getObjectPropertySafe from "../helpers/getObjectPropertySafe"

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
            setMachine(res.data.machine);
            setShowSpinner(false)
        })
    },[])


 

    return(
        <>
        {

            !showSpinner?
            <div id="machinesContainer">
                <Heading size={900} textAlign="center">Variable files for {machine.name + " " + machine.type}</Heading>
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
                                                <Button intent="success" width="20rem">Αποθήκευση</Button>
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
                                        </Pane>
                                    :
                                    tab.accessor=="qualityControlAndTests"?
                                    <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem">Αποθήκευση</Button>
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
                                    :
                                    tab.accessor=="production"?
                                    <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem">Αποθήκευση</Button>
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
                                                    production:{
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
                                    :
                                    tab.accessor=="partsList"?
                                    <>
                                    <Pane width="20rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" justifyItems="center">
                                        <Pane width="100%" marginBottom="2rem">
                                            <Button intent="success" width="20rem">Αποθήκευση</Button>
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
                                            console.log(machine)
                                            setMachine({
                                                ...machine,
                                                variableFiles:{
                                                    ...machine.variableFiles,
                                                    partsList:{
                                                    
                                                        data:{
                                                            ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
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
                                        <Heading size="400" marginTop="2rem">{"Λίστα υλικών"}</Heading>
                                        {
                                            machine.variableFiles.partsList?
                                            machine.variableFiles.partsList.data?
                                            machine.variableFiles.partsList.data.parts?
                                            <>
                                            {
                                                machine.variableFiles.partsList.data.parts.length==0?
                                                <>
                                                <Heading size="500">Δεν βρέθηκαν υλικά</Heading>
                                            
                                                </>
                                            
                                                :
                                                machine.variableFiles.partsList.data.parts.map((p,pi)=>{
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
                                                              var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                                              parts[pi].name = e.target.value
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:{
                                                                      ...machine.variableFiles,
                                                                      partsList:{
                                                                          ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                                          data:{
                                                                              parts:parts
                                                                          }
                                                                      }
                                                                  }
                                                                  
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Περιγραφή"  value={p.description} onChange={(e)=>{
                                                              var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                                              parts[pi].description = e.target.value
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:{
                                                                      ...machine.variableFiles,
                                                                      partsList:{
                                                                          ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                                          data:{
                                                                              parts:parts
                                                                          }
                                                                      }
                                                                  }
                                                                  
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Αριθμός σειράς" value={p.serialNumber} onChange={(e)=>{
                                                              var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                                              parts[pi].serialNumber = e.target.value
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:{
                                                                      ...machine.variableFiles,
                                                                      partsList:{
                                                                          ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                                          data:{
                                                                              parts:parts
                                                                          }
                                                                      }
                                                                  }
                                                                  
                                                              })
                                                        }}/>
                                                        <TextInputField margin="1rem" label="Προμηθευτής"  value={p.vendor} onChange={(e)=>{
                                                              var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                                              parts[pi].vendor = e.target.value
                                                              setMachine({
                                                                  ...machine,
                                                                  variableFiles:{
                                                                      ...machine.variableFiles,
                                                                      partsList:{
                                                                          ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                                          data:{
                                                                              parts:parts
                                                                          }
                                                                      }
                                                                  }
                                                                  
                                                              })
                                                        }}/>
                                                        <Pane width="100%">
                                                        <Button intent="danger" width="20rem" onClick={()=>{
                                                             var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                                             parts.splice(pi,1)
                                                             setMachine({
                                                                 ...machine,
                                                                 variableFiles:{
                                                                     ...machine.variableFiles,
                                                                     partsList:{
                                                                         ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                                         data:{
                                                                             parts:parts
                                                                         }
                                                                     }
                                                                 }
                                                                 
                                                             })
                                                        }}>Αφαίρεση</Button>
                                                        </Pane>
                                                        
                                                        </Card>
                                                    )
                                                })
                                            }
                                            <Button appearance="primary" marginTop="1rem" width="20rem" onClick={()=>{

                                            var parts =machine.variableFiles.partsList?machine.variableFiles.partsList.data?machine.variableFiles.partsList.data.parts:[]:[]
                                            parts.push({
                                                name:"",
                                                description:"",
                                                serialNumber:"",
                                                vendor:""
                                            })
                                            setMachine({
                                                ...machine,
                                                variableFiles:{
                                                    ...machine.variableFiles,
                                                    partsList:{
                                                        ...machine.variableFiles.partsList?machine.variableFiles.partsList.data:{},
                                                        data:{
                                                            parts:parts
                                                        }
                                                    }
                                                }
                                                
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

