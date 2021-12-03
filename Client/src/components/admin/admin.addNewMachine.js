import React, {useState,useEffect} from "react"


//Helpers
import { getAllMachineCategories } from "../../helpers/dataManager"

//Components
import {TextInputField,Heading,Pane,toaster,Combobox} from "evergreen-ui"


export default function AdminAddNewMachine(props){

    const [machineCategories,setMachineCategories] = useState([])


    useEffect(()=>{
        getAllMachineCategories((res)=>{
            if(res.error){
                toaster.error(res.error)
                return;
            }
            setMachineCategories(res.data.machineCategories);
            
        })
    },[])


    return(
        <>

        <div id="machinesContainer">
            <Heading size={900} textAlign="center">Add new machine</Heading>
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

                onChange={e=>setUsername(e.target.value)}
                />

                <TextInputField 
                label="Type"
                type="text"
                placeholder="Machine type"
                color="white"

                onChange={e=>setUsername(e.target.value)}
                />

                <Combobox
                items={machineCategories}
                itemToString={item => (item ? item.name : '')}
                onChange={selected => console.log(selected)}
                placeholder="Machine Category"
                autocompleteProps={{
                    
                    title: 'Category'
                }}
                />
            </Pane>
          
        </div>

        </>
    )
}