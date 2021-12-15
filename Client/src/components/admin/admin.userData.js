import React, {useState,useEffect} from 'react'

//Libraries
import Cookies from "js-cookie"

//Components
import { TextInputField,Button,toaster,Heading,FilePicker,Text,Switch} from 'evergreen-ui';
import{DatePicker,Panel} from 'rsuite';

//Helpers
import {getUserByID,updateUser,createUser} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL";

export default function AdminUserData(props){
    const [userID,setUserID] = useState(getIDFromURL(window.location.href, "users"));
    const [user,setUser] = useState({
        address:"",
        bussinesName:"",
        phone:"",
        email:"",
        AFM:"",
        DOI:""
    })
    const [tmpLogo,setTmpLogo] = useState(null)
    const [tmpSignature,setTmpSignature] = useState(null)

    useEffect(()=>{
        if(!userID){
            toaster.error("Ο χρήστης δεν βρέθηκε")
            return;
        }

        if(userID !="new"){
            getUserByID(getIDFromURL(window.location.href, "users") ,(data)=>{
                setUser(data.user)
            })
        }
     
    },[])



    return(
        <>
        <Heading size={900} textAlign="center"             color="white">{userID=="new"?"New user data":"User " + user.bussinesName + " data"}</Heading>
        <div id="accountForm">
            <TextInputField 
              label="Username"
              type="text"
              placeholder="Εισάγετε το username"
              color="white"
              value={user.username}
              onChange={(e)=>{
                  setUser({...user,username:e.target.value})
              }}
            />
              <TextInputField 
              label="Password"
              type="password"
              placeholder="Εισάγετε το password"
              color="white"
              value={user.password}
              onChange={(e)=>{
                  setUser({...user,password:e.target.value})
              }}
            />
            
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
              label="Address"
              type="text"
              placeholder="Εισάγετε την διεύθυνση της επιχείρισης"
              color="white"
              value={user.address}
              onChange={(e)=>{
                  setUser({...user,address:e.target.value})
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
            <Text             color="white">Ημερομηνία έναρξης συνδρομής</Text>
             <DatePicker style={{minWidth:"100%"}} value={user.subscriptionStart?new Date(user.subscriptionStart):new Date()} onChange={(date)=>setUser({
                 ...user,
                 subscriptionStart:new Date(date)
             })}/>
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
            <div>
            <Text             color="white">Κλείδωμα λογαριασμού</Text>
            <Switch checked={user.isLocked} onChange={(e) =>setUser({
                ...user,
                isLocked:e.target.checked
            })} />
            </div>
           
            <Button className="withMarginTop" style={{marginTop:"2rem",width:"100%"}} onClick={()=>{
                if(userID=="new"){
                    createUser(user,(res)=>{
                        if(res.error){
                            toaster.danger(res.error)
                            return
                        }
                        location.replace("/admin/users/" + res.data.user._id + "/data")
                    })
                }else{
                    updateUser(getIDFromURL(window.location.href, "users"),user,(res)=>{
                        if(res.error){
                            toaster.danger(res.error)
                            return;
                        }
                        toaster.success(res.success)
                    })
                }
              
            }}>Αποθήκευση</Button>
           
        </div>
        </>
    )
}

