import React,{useState,useEffect} from "react";

//Helpers
import {getMachineByID} from "../helpers/dataManager"
import getFileNameFromURL from "../helpers/getFileNameFromURL"

//Components
import { toaster,Heading,Card,Pane,Text,Tablist,Tab,Spinner,Button} from 'evergreen-ui';


//Libraries
import download from "downloadjs"

export default function PresetFiles(props){
    const [machine,setMachine] = useState({})
    const [showSpinner,setShowSpinner] = useState(true)
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
                <Heading size={900} textAlign="center">Preset files for {machine.name + " " + machine.type}</Heading>
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
                <Pane padding={16} background="#F4F5F9"  flex={"0 0 100%"} textAlign="center" width="100%" heigh="100%">
                    <Text>Click in any file to view</Text>
                    {tabs.map((tab, index) => (
                    <Pane
                        key={tab}
                        id={`panel-${tab}`}
                        role="tabpanel"
                        aria-labelledby={tab}
                        aria-hidden={index !== selectedIndex}
                        display={index === selectedIndex ? 'block' : 'none'}
                    >
                        {
                            machine.fixedFiles[tab.accessor].links.length==0?
                            <Text fontWeight="bold">No files found.</Text>
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

                                   </Card>
                                )
                            })
                            }
                            </>
                         
                        }
                    </Pane>
                    ))}
                </Pane>
                </Pane>
            

            </div>

            :
            <Spinner />
        }
        </>
        
    )
}