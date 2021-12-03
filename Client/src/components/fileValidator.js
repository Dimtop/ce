import React, {useState,useEffect} from 'react'


//Helpers
import {validateFile} from "../helpers/dataManager"

//Components
import {Heading,TextInputField,Button} from 'evergreen-ui'

//Libraries
import CryptoJS from "crypto-js"

export default function FileValidator(props){
    const [fileCode,setFileCode] = useState("")
    const [isValid,setIsValid] = useState("notset")

    useEffect(()=>{
        var fileCodeFromULR=  new URLSearchParams(window.location.search).get("fc");
        if(fileCodeFromULR){
            setFileCode(fileCodeFromULR)
            validateFile(fileCodeFromULR,(res)=>{
                console.log(res)
                if(res.error){
                    setIsValid(false)
                    return;
                }
                setIsValid(true);
            })
        }
    },[])




    return(
        <>
        <Heading size={900} textAlign="center">Επικύρωση γνησιότητας αρχείου</Heading>
        <div style={{width:"20rem"}}>
            <TextInputField 
                label="Κωδικός εγγράφου"
                type="text"
                placeholder="Εισάγετε τον κωδικό εγγράφου"
                color="white"
                value={fileCode}
                onChange={(e)=>{
                    setFileCode(e.target.value)
                }}  
                />
            <Button appearance="primary" onClick={()=>{
                validateFile(fileCode,(res)=>{
                    console.log(res)
                    if(res.error){
                        setIsValid(false)
                        return;
                    }
                    setIsValid(true);
                })
            }}>Επικυρωση</Button>

            {
                isValid!="notset"?
                <h3 style={{color:isValid?"green":"red"}}>{isValid?"Το έγγραφο είναι έγκυρο.":"Το έγγραφο δεν είναι έγκυρο"}</h3>

                :
                <></>
            }


            
        </div>
        </>
    )
}