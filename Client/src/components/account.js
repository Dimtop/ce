import React, {useState,useEffect} from 'react'

//Libraries
import Cookies from "js-cookie"
import { TextInputField,Button,toaster,Heading,FilePicker} from 'evergreen-ui';


//Helpers
import {getUserByID,updateUser} from "../helpers/dataManager"

export default function Account(props){

    const [user,setUser] = useState({})
    const [tmpLogo,setTmpLogo] = useState(null)
    const [tmpSignature,setTmpSignature] = useState(null)

    useEffect(()=>{
        getUserByID(Cookies.get("authID"),(data)=>{
            setUser(data.user)
        })
    },[])



    return(
        <>
        <Heading size={900} textAlign="center" color="white">My account</Heading>
        <div id="accountForm">
            <TextInputField 
              label="Bussiness name"
              type="text"
              placeholder="Εισάγετε την επωνυμία της επιχείρισης"
              color="white"
              value={user.bussinesName}
              onChange={(e)=>{
                  setUser({...user,bussinesName:e.target.value})
              }}
            />
            <TextInputField 
              label="ΑΦΜ"
              type="text"
              placeholder="Εισάγετε τον ΑΦΜ της επιχείρισης"
              color="white"
              value={user.AFM}
              onChange={(e)=>{
                setUser({...user,AFM:e.target.value})
            }}
            />
            <TextInputField 
              label="ΔΟΥ"
              type="text"
              placeholder="Εισάγετε την ΔΟΥ της επιχείρισης"
              color="white"
              value={user.DOI}
              onChange={(e)=>{
                setUser({...user,DOI:e.target.value})
            }}
            />
            <TextInputField 
              label="Phone"
              type="phone"
              placeholder="Εισάγετε το τηλέφωνο της επιχείρισης"
              color="white"
              value={user.phone}
              onChange={(e)=>{
                setUser({...user,phone:e.target.value})
            }}
            />
            <TextInputField 
              label="Email"
              type="email"
              placeholder="Εισάγετε το email της επιχείρισης"
              color="white"
              value={user.email}
              onChange={(e)=>{
                setUser({...user,email:e.target.value})
            }}
            />
            <FilePicker
                className="withMarginTop" 
            
                placeholder="Επιλέξτε το λογότυπό σας"
                onChange={(file)=>{
                    console.log(file)
                    var fr = new FileReader();

                    fr.onload = ()=>{
                        setTmpLogo(fr.result)
                    }
                    fr.readAsDataURL(file[0])

                    setUser({...user,logo:file[0]})
                   
      
                }}
            />
            <img src={tmpLogo?tmpLogo:user.logo} className="thumbnail" /> 
             <FilePicker
                className="withMarginTop" 
                name="logo"
                placeholder="Επιλέξτε την υπογραφή σας"
                onChange={(file)=>{
                    console.log(file)
                    var fr = new FileReader();

                    fr.onload = ()=>{
                        setTmpSignature(fr.result)
                    }
                    fr.readAsDataURL(file[0])

                    setUser({...user,signature:file[0]})
            
      
                }}
            />
            <img src={tmpSignature?tmpSignature:user.signature} className="thumbnail" />     
            <Button className="withMarginTop" style={{marginTop:"2rem",width:"100%"}} onClick={()=>{
                updateUser(Cookies.get("authID"),user,(res)=>{
                    if(res.error){
                        toaster.danger(res.error)
                        return;
                    }
                    toaster.success(res.success)
                })
            }}>Αποθήκευση</Button>
           
        </div>
        </>
    )
}

