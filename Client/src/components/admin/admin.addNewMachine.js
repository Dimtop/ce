import React, {useState,useEffect} from "react"


//Helpers
import {updateMachine,getMachineByID,getAllMachineCategories,postMachine} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL";
//Components
import {TextInputField,Heading,Pane,toaster,SelectField, Spinner,Button,Text} from "evergreen-ui"

//Models 
import machineModel from "../../models/machine.model";

//Libraries
import Cookies from "js-cookie"


export default function AdminAddNewMachine(props){
    const [machineID,setMachineID] = useState(getIDFromURL(window.location.href, "machines"))
    const [machineCategories,setMachineCategories] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)
    const [machine,setMachine] = useState({
        ...machineModel,
        userID:getIDFromURL(window.location.href, "users")
    })


    useEffect(()=>{

        if(!machineID){
            toaster.error("Το μηχάνημα δεν βρέθηκε")
            return;
        }
        if(machineID!="new"){
            getMachineByID(machineID,(res)=>{
                if(res.error){
                    toaster.danger(error);
                    return;
                }
                console.log("MACHINE")
                console.log(res.data.machine)
                setMachine(res.data.machine);
                getAllMachineCategories((res)=>{
                    if(res.error){
                        toaster.error(res.error)
                        return;
                    }
        
                    setMachineCategories(res.data.machineCategories);
                  
                    setShowSpinner(false)
                    
                })
            })
        }else{
            getAllMachineCategories((res)=>{
                if(res.error){
                    toaster.error(res.error)
                    return;
                }
    
                console.log(res.data)
                console.log(machine)
                setMachineCategories(res.data.machineCategories);
                setMachine({
                    ...machine,
                    categories:[res.data.machineCategories[0]._id]
                })
                setShowSpinner(false)
                
            })
        }
    
    },[])


    return(
        <>
        {
            showSpinner?
            <Spinner />
            :
            <>

            <div id="machinesContainer">
            <Heading size={900} textAlign="center" color="white">Add new machine</Heading>
            <Pane 
                clearfix  
                width={"100%"}
                display="flex"
                marginTop="2rem"
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                flexDirection="column"
        
                flexWrap="wrap"
            >
                <TextInputField 
                label="Name"
                type="text"
                placeholder="Machine name"
                color="white"
                value={machine.name}
                onChange={e=>setMachine({
                    ...machine,
                    name:e.target.value
                })}
                />

                <TextInputField 
                label="Type"
                type="text"
                placeholder="Machine type"
                color="white"
                value={machine.type}
                onChange={e=>setMachine({
                    ...machine,
                    type:e.target.value
                })}
                />
                 <TextInputField 
                label="Standard"
                type="text"
                placeholder="Standard"
                color="white"
                value={machine.standard}
                onChange={e=>setMachine({
                    ...machine,
                    standard:e.target.value
                })}
                />

                <Text color="white">Κατηγορία</Text>
                <SelectField
                    color="white"
                    value={machine.categories[0]}
                    onChange={(e)=>setMachine({
                        ...machine,
                        categories:[e.target.value]
                    })}
                >
                    {
                        machineCategories.map(c=>{
                            return <option value={c._id}>{c.name}</option>
                        })
                    }
                </SelectField>
            
      
                <Button className="withMarginTop" style={{marginTop:"2rem"}} onClick={()=>{
                    if(machineID=="new"){
                        postMachine(machine,(res)=>{
                            if(res.error){
                                toaster.error(res.error)
                                return;
                            }
    
                            toaster.success("The machine was added successfull");
                            location.replace("/admin/users/" + machine.userID)
                        })
                    }else{
                        updateMachine(machineID,machine,(res)=>{
                            if(res.error){
                                toaster.error(res.error)
                                return;
                            }
    
                            toaster.success("The machine was added successfull");
                            location.reload()
                        })
                    
                    }
            
                }}>Αποθήκευση</Button>
            </Pane>
          
            </div>
            </>
        }
      

        </>
    )
}