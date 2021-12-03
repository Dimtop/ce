import React, {useState,useEffect} from 'react';


//Helpers
import {getMachineByID,getUserByID,generateFileCode} from "../../helpers/dataManager"
import getFileNameFromURL from "../../helpers/getFileNameFromURL"
import getObjectPropertySafe from "../../helpers/getObjectPropertySafe"

///Libraries
import Cookies from "js-cookie"


//Components
import QRCode from "qrcode.react";
import {toaster,Spinner} from "evergreen-ui"


export default function Production(props){

    const [machine,setMachine] = useState({})
    const [fileCode,setFileCode] = useState("")
    const [showSpinner,setShowSpinner] = useState(true)
    const [user,setUser] = useState({})

    useEffect(()=>{
        var machineID = window.location.href.split("/")[window.location.href.split("/").indexOf("machines") + 1 ];
        getUserByID(Cookies.get("authID"),(data)=>{
            setUser(data.user)
        })

        generateFileCode(machineID,"production",(res)=>{
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
                <QRCode value="asd" style={{position:"fixed",width:"5rem",height:"5rem",top:"0",right:"0",margin:"1rem"}}/>
                <div style={{textAlign:"center"}}>
                    <div style={{textAlign:'center'}}>
                        <h4 style={{color:"black"}}>ΕΝΤΟΛΗ ΕΚΤΕΛΕΣΗΣ ΠΑΡΑΓΓΕΛΙΑΣ - No. {machine.variableFiles.production.data.orderNumber}</h4>
                        <p style={{color:"black",fontSize:"1rem"}}>1. ΣΥΝΤΟΜΗ ΠΕΡΙΓΡΑΦΗ ΑΠΑΙΤΟΥΜΕΝΗΣ ΕΡΓΑΣΙΑΣ ΓΙΑ ΤΗΝ ΚΑΤΑΣΚΕΥΗ ΤΟΥ ΠΡΟΪΟΝΤΟΣ</p>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",width:"100%",marginTop:"2rem"}}>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Αριθμός σειράς: </b> {machine.variableFiles.production.data.serialNumber}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Ημερομηνία: </b> {new Date(machine.variableFiles.production.data.startDate).toDateString()}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Μηχάνημα: </b> {machine.name + " " + machine.type}</p>
                        </div>
                        <div>
                            <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Τεμάχια: </b> {machine.variableFiles.production.data.quantity}</p>
                        </div>
                    </div>
                    <div style={{textAlign:'center',marginTop:"2rem"}}>
                        <p style={{color:"black",fontSize:"1rem"}}>2. ΣΕΙΡΑ ΕΚΤΕΛΕΣΗΣ ΚΑΙ ΕΙΔΟΣ ΕΡΓΑΣΙΩΝ ΚΑΤΑΣΚΕΥΗΣ ΠΟΥ ΘΑ ΑΠΑΙΤΗΘΟΥΝ</p>
                        <table style={{width:"100%"}}>
                            <th style={{border:"1px solid black"}}>Σειρά εκτέλεσης</th>
                            <th style={{border:"1px solid black"}}>Είδος εργασίας/μηχάνημα</th>
                            <th style={{border:"1px solid black"}}>Τεχνίτης που θα εκτελέσει</th>
                            <th style={{border:"1px solid black"}}>Τέλος εκτέλεσης εργασίας</th>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>1</td>
                                <td style={{border:"1px solid black"}}>Κοπές</td>
                                <td style={{border:"1px solid black"}}>{machine.variableFiles.production.data.jobs.cuts.name}</td>
                                <td style={{border:"1px solid black"}}>{new Date(machine.variableFiles.production.data.jobs.cuts.date).toDateString()}</td>
                            </tr>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>1</td>
                                <td style={{border:"1px solid black"}}>Συγκολλήσεις</td>
                                <td style={{border:"1px solid black"}}>{machine.variableFiles.production.data.jobs.soldering.name}</td>
                                <td style={{border:"1px solid black"}}>{new Date(machine.variableFiles.production.data.jobs.soldering.date).toDateString()}</td>
                            </tr>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>1</td>
                                <td style={{border:"1px solid black"}}>Μοντάρισμα</td>
                                <td style={{border:"1px solid black"}}>{machine.variableFiles.production.data.jobs.modding.name}</td>
                                <td style={{border:"1px solid black"}}>{new Date(machine.variableFiles.production.data.jobs.modding.date).toDateString()}</td>
                            </tr>
                        </table>
                    </div>
                    <div style={{textAlign:'center',marginTop:"2rem"}}>
                        <p style={{color:"black",fontSize:"1rem"}}>3. ΕΝΔΙΑΜΕΣΟΙ / ΤΕΛΙΚΟΙ / ΕΛΕΓΧΟΙ ΠΟΥ ΘΑ ΑΠΑΙΤΗΘΟΥΝ ΣΤΙΣ ΠΑΡΑΠΑΝΩ ΕΡΓΑΣΙΕΣ ΚΑΤΑΣΚΕΥΗΣ</p>
                        <table style={{width:"100%"}}>
                            <th style={{border:"1px solid black"}}>Σειρά</th>
                            <th style={{border:"1px solid black"}}>Είδος ενδιάμεσου/τελικού ελέγχου</th>
                            <th style={{border:"1px solid black"}}>Κριτήρια αποδοχής</th>
                            <th style={{border:"1px solid black"}}>Ελεγκτής</th>
                            <th style={{border:"1px solid black"}}>Αποτέλεσμα</th>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>1</td>
                                <td style={{border:"1px solid black"}}>Οπτικός</td>
                                <td style={{border:"1px solid black"}}>ΔΙΑΡΟΕΣ-ΑΤΕΛΕΙΕΣ ΚΑΤΑΣΚΕΥΗΣ</td>
                                <td style={{border:"1px solid black"}}>Τεχνίτης Υ.Π.Ε.</td>
                                <td style={{border:"1px solid black"}}>ΟΚ</td>
                            </tr>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>2</td>
                                <td style={{border:"1px solid black"}}>Λειτουργικός</td>
                                <td style={{border:"1px solid black"}}>ΑΣΦΑΛΗΣ ΛΕΙΤΟΥΡΓΙΑ</td>
                                <td style={{border:"1px solid black"}}>Τεχνίτης Υ.Π.Ε.</td>
                                <td style={{border:"1px solid black"}}>ΟΚ</td>
                            </tr>

                            <tr style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black"}}>3</td>
                                <td style={{border:"1px solid black"}}>Σήμανση</td>
                                <td style={{border:"1px solid black"}}>ΤΑΥΤΟΤΗΤΑ ΜΗΧΑΝΗΜΑΤΟΣ</td>
                                <td style={{border:"1px solid black"}}>Τεχνίτης Υ.Π.Ε.</td>
                                <td style={{border:"1px solid black"}}>ΟΚ</td>
                            </tr>

                        </table>

                    </div>
                    <div style={{textAlign:'center',marginTop:"2rem"}}>
                        <p style={{color:"black",fontSize:"1rem"}}>4. ΑΠΟΤΕΛΕΣΜΑΤΑ ΜΕΤΑ ΤΗΝ ΟΛΟΚΛΗΡΩΣΗ ΟΛΩΝ ΤΩΝ ΕΡΓΑΣΙΩΝ ΚΑΙ ΕΛΕΓΧΩΝ</p>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Αποδεκτά αποτελέσματα: </b> ΟΚ</p>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Δρομολόγηση παράδοσης: </b></p>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Μη αποδεκτά αποτελέσματα: </b></p>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Παρατηρήσεις: </b></p>
                    </div>
                    <div style={{textAlign:'right',marginTop:"10rem"}}>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}><b>Υπεύθυνος παραγωγής</b><br></br>(Υπογραφή)</p>
                        <p style={{color:"black",fontSize:"1rem",fontWeight:"normal"}}>{machine.variableFiles.production.data.productionManager}</p>
                    </div>
                    <div>
                        <p style={{fontSize:"0.7rem",color:"black",marginTop:"1rem"}}>{"Κωδικός εγγράφου: " +fileCode}</p>
                    </div>
                </div>
                </>
                :
                <Spinner />
            }
           
        </>
    );
}