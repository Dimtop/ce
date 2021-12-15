import React, {useState,useEffect} from "react";


//Components
import {Button,Heading,TextInputField,toaster} from "evergreen-ui"

//Helpers
import {createMachineCategory} from "../../helpers/dataManager"

export default function AdminCategory(props){

    const [category,setCategory] = useState({})



    return(
        <>
        <Heading size={900} textAlign="center"             color="white">Εισαγωγή νέας κατηγορίας</Heading>
        <div>
        <TextInputField 
                label="Όνομα κατηγορίας"
                type="text"
                color="white"
                value={category.name}
                onChange={e=>setCategory({
                    ...category,
                    name:e.target.value
                })}        
        />
            <Button appearance="primary" onClick={()=>{
                createMachineCategory(category,(res)=>{
                    if(res.error){
                        toaster.danger(res.error)
                        return;
                    }
                    location.replace("/admin/dashboard")
                })
            }}>Αποθήκευση</Button>
            </div>
        </>
 
      
    )
}