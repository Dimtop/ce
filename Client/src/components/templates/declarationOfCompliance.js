import React, {useState,useEffect} from 'react'

//Helpers
import {getMachineByID,getUserByID,generateFileCode} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL"
import getObjectPropertySafe from "../../helpers/getObjectPropertySafe"

///Libraries
import Cookies from "js-cookie"


//Components
import QRCode from "qrcode.react";
import {toaster,Spinner} from "evergreen-ui"

//Styles
import "../../styles/template.style.css"


export default function DeclarationOfComplinace(props){

    const [machine,setMachine] = useState({})
    const [fileCode,setFileCode] = useState("")
    const [showSpinner,setShowSpinner] = useState(true)
    const [user,setUser] = useState({})
    const [fid,setFID] = useState(getIDFromURL(window.location.href,"variableFiles"))

    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];

 
      

        generateFileCode(machineID,fid,"declarationOfCompliance",(res)=>{
            if(res.error){
                toaster.danger(res.error);
                return;
            }
            console.log(res.data.fileCode)
            setFileCode(res.data.fileCode)
        })
        getMachineByID(machineID,(res)=>{
            if(res.error){
                toaster.danger(res.error);
                return;
            }
            console.log(res.data.machine)
            setMachine(res.data.machine);

            if(window.location.href.indexOf("admin")>=0){
                console.log(res.data.machine.userID)
                getUserByID(res.data.machine.userID,(data)=>{
                    console.log(data)
                    setUser(data.user)
                    setShowSpinner(false)
                })
            }else{
                getUserByID(Cookies.get("authID"),(data)=>{
                    setUser(data.user)
                    setShowSpinner(false)
                })
            }
         

            
        })

        
    },[])



    return( 
        <>
            {
                showSpinner?
                <Spinner/> 

                :
                <>
                <div style={{height:"100vh",width:"100vw",backgroundColor:"white"}}>
  <QRCode value={"https://cecloud.gr/fileValidator?fc=" +fileCode}  style={{position:"fixed",width:"5rem",height:"5rem",top:"0",right:"0",margin:"1rem"}}/>
            <div style={{width:"100%",display:"grid",justifyItems:"center",pageBreakInside:"avoid"}}>
                <div>
                    <img src={user.logo} style={{width:"12rem",height:"6rem"}}/>
    
                </div>
                <div>
                    <p style={{color:"dimgray",fontSize:"1rem"}}><b>{user.bussinesName + " - " + user.address + " - " + "ΤΗΛ: " + user.phone}</b></p>
                </div>
                <div style={{marginTop:"1rem",textAlign:"center",width:"100%",backgroundColor:"lightgray",padding:"1rem",display:"grid",gridTemplateColumns:"10fr 2fr",alignItems:"center"}}>
                    <div>
                        <h5 style={{color:"dimgray"}}>ΔΗΛΩΣΗ ΣΥΜΜΟΡΦΩΣΗΣ</h5>
                        <h5 style={{color:"dimgray"}}>DECLARATION OF CONFORMITY</h5>
                        <h5 style={{color:"dimgray"}}>DICHIARAZIONE DI CONFORMITA</h5>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/HtMQjT2/1.png" style={{width:"5rem",height:"3rem"}}/>
                    </div>
                  
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",height:"8rem",width:"100%",columnGap:"1rem"}}>
                    <div style={{height:"100%",border:"none",borderBottom:"2px solid black",width:"100%"}}>

                    </div>
                    <div style={{height:"100%",border:"none",borderBottom:"2px solid black",width:"100%"}}>

                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",width:"100%",columnGap:"1rem"}}>
                    <div style={{textAlign:"center"}}>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Σφραγίδα κατασκευαστή</p>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Stamp of manufacturer</p>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Σφραγίδα εντολοδόχου</p>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Stamp of authorized representative</p>
                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",marginTop:"2rem"}}>
                    <div>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>Δηλώνουμε με αποκλειστική μας ευθύνη ότι το προιόν που αναφέρεται παρακάτω:</p>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>We declare with exclusive responsibility that the product:</p>
                        <h4 style={{textAlign:"center",color:"black",marginTop:"1rem"}}>{machine.name + " " + machine.type}</h4>
                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"3fr 9fr",justifyItems:"center",width:"100%",columnGap:"1rem",marginTop:"1rem"}}>
                    <div>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center"}}>Τύπος - Αριθμός Σειράς</p>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center"}}>Type - Serial Number</p>
                    </div>
                    <div style={{width:"100%",borderBottom:"1px solid black"}}>
                        <h4 style={{textAlign:"center",color:"black",fontSize:"1.1rem"}}>{machine.variableFiles[fid].serialNumber}</h4>
                    </div>
                    
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",marginTop:"1rem",width:"100%"}}>
                    <div>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>Και για το οποίο εκδίδεται η παρούσα δήλωση είναι εναρμονισμένο με τα ακόλουθα πρότυπα:</p>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>And to this we publish the declaration is harmonized with the following EU standarts:</p>
         
                    </div>
                    <div style={{border:"2px solid black",textAlign:"center",width:"100%",marginTop:"1rem"}}>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center"}}>{machine.standard}</p>
                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",marginTop:"1rem",width:"100%"}}>
                    <div>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>̈Οπως ορίζεται από τις οδηγίες του Συμβουλίου της Ε.Ε.</p>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center",fontWeight:"normal"}}>As it defined frοm the directions of E.U. :</p>
         
                    </div>
                    <div style={{border:"2px solid black",textAlign:"center",width:"100%",marginTop:"1rem"}}>
                        <p style={{fontSize:"0.8rem",color:"black",textAlign:"center"}}>2006/42/ΕC <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Machinery Directive</p></p>
                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",height:"8rem",width:"100%",columnGap:"1rem"}}>
                    <div style={{height:"100%",border:"none",borderBottom:"2px solid black",width:"100%",textAlign:"center"}}>
                    <img src="https://i.ibb.co/ccGSM1H/sign.png" style={{width:"10rem",height:"5rem",marginTop:"1rem"}} />
                    </div>
                    <div style={{height:"100%",border:"none",borderBottom:"2px solid black",width:"100%",textAlign:"center"}}>
                 
                    </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",width:"100%",columnGap:"1rem"}}>
                    <div style={{textAlign:"center"}}>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Συντάκτης του Τεχνικού Φακέλου</p>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Name of Person Authorized to compile the technical file</p>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Όνομα και Υπογραφή Υπευθύνου Παραγωγής- Τόπος & Ημερομηνία</p>
                        <p style={{fontSize:"0.6rem",color:"black",textAlign:"center"}}>Name and Signature of Production Manager- Place & Date</p>
                    </div>
                </div>
                <div>
                    {
                        machine._id?
                        <p style={{fontSize:"0.7rem",color:"black",marginTop:"1rem",wordBreak:"break-all",wordWrap:"break-word"}}>{"Κωδικός εγγράφου: " +fileCode}</p>
                        :
                        <></>
                    }
                    
                </div>
            </div>  
            </div>
                </>
            }
          
        </>
    )
}