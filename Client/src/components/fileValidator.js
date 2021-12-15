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
    const [decodedData,setDecodedData] = useState({})

    useEffect(()=>{
        var fileCodeFromULR = window.location.href.split("=")[1];
        if(fileCodeFromULR){
            setFileCode(fileCodeFromULR)
            validateFile(fileCodeFromULR,(res)=>{
                console.log(res)
                if(res.error){
                    setIsValid(false)
                    return;
                }
                console.log(res.data.decodedData)
                setDecodedData(res.data.decodedData)
                setIsValid(true);

            })
        }
      
    },[])




    return(
        <>
        <Heading size={900} textAlign="center"             color="white">Επικύρωση γνησιότητας αρχείου</Heading>
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
                    setDecodedData(res.data.decodedData)
                    setIsValid(true);
                })
            }}>Επικυρωση</Button>

            {
                isValid!="notset"?
                isValid?
                <>
                <h3 style={{color:"green"}}>Το έγγραφο είναι έγκυρο.</h3>
                <p style={{color:'black',fontSize:"1.5rem",fontWeight:"normal"}}><b>Για το μηχάνημα: </b>{decodedData[1] + " " + decodedData[2]}</p>
                <p style={{color:'black',fontSize:"1.5rem",fontWeight:"normal"}}><b>Με αριθμό σειράς: </b>{decodedData[4]}</p>
                <p style={{color:'black',fontSize:"1.5rem",fontWeight:"normal"}}><b>Για τον χρήστη: </b>{decodedData[3]}</p>
                </>
              
                :   
                <h3 style={{color:"red"}}>Το έγγραφο δεν είναι έγκυρο.</h3>

                :
                <></>
            }


            
        </div>
        </>
    )
}