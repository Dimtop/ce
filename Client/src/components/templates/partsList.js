import React, {useState,useEffect} from "react";

//Helpers
import {getMachineByID,getUserByID,generateFileCode} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL"
import getObjectPropertySafe from "../../helpers/getObjectPropertySafe"

///Libraries
import Cookies from "js-cookie"


//Components
import QRCode from "qrcode.react";
import {toaster,Spinner} from "evergreen-ui"



export default function PartsList(props){


    const [machine,setMachine] = useState({})
    const [fileCode,setFileCode] = useState("")
    const [showSpinner,setShowSpinner] = useState(true)
    const [user,setUser] = useState({})
    const [fid,setFID] = useState(getIDFromURL(window.location.href,"variableFiles"))


    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];
        getUserByID(Cookies.get("authID"),(data)=>{
            setUser(data.user)
        })

        generateFileCode(machineID,fid,"partsList",(res)=>{
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
            setMachine(res.data.machine);
            setShowSpinner(false)
        })

        
    },[])


    return(
        <>
        {
                !showSpinner?
                <>
                <div style={{height:"100vh",width:"100vw",backgroundColor:"white"}}>
                <QRCode value={"https://cecloud.gr/fileValidator?fc=" +fileCode}  style={{position:"fixed",width:"5rem",height:"5rem",top:"0",right:"0",margin:"1rem"}}/>
                <div style={{textAlign:"center"}}>
                    <div style={{textAlign:'center'}}>
                        <h4 style={{color:"black"}}>ΛΙΣΤΑ ΥΛΙΚΩΝ</h4>

                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr",width:"100%",marginTop:"2rem"}}>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Αριθμός σειράς: </b> {machine.variableFiles[fid].serialNumber}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Ημερομηνία έκδοσης: </b> {new Date(machine.variableFiles[fid].partsList.data.issueDate).toDateString()}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Μηχάνημα: </b> {machine.name + " " + machine.type}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Υπεύθυνος παραγωγής: </b> {machine.variableFiles[fid].partsList.data.productionManager}</p>
                        </div>
                    </div>
                    <div>
                        <table style={{width:"100%",marginTop:"2rem"}}>
                            <th style={{border:"1px solid black",padding:"1rem"}}>Όνομα</th>
                            <th style={{border:"1px solid black",padding:"1rem"}}>Περιγραφή</th>
                            <th style={{border:"1px solid black",padding:"1rem"}}>Αριθμός σειράς</th>
                            <th style={{border:"1px solid black",padding:"1rem"}}>Προμηθευτής</th>

                            {
                                machine.variableFiles[fid].partsList.data.parts.map(p=>{
                                    return(
                                        <tr>
                                            <td style={{border:"1px solid black",padding:"1rem"}}>{p.name}</td>
                                            <td style={{border:"1px solid black",padding:"1rem"}}>{p.description}</td>
                                            <td style={{border:"1px solid black",padding:"1rem"}}>{p.serialNumber}</td>
                                            <td style={{border:"1px solid black",padding:"1rem"}}>{p.vendor}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div>
                    <p style={{fontSize:"0.7rem",color:"black",marginTop:"1rem",wordBreak:"break-all",wordWrap:"break-word"}}>{"Κωδικός εγγράφου: " +fileCode}</p>
                    </div>
                </div>
                </div>
                </>
                :
                <Spinner/>

        }


        </>
    )
}