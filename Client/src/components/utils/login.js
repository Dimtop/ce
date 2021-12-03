import React, {useState,useEffect} from 'react'



//Libraries
import Cookies from "js-cookie"
import { TextInputField,Button,toaster} from 'evergreen-ui';

export default function Login(props){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const [error,setError] = useState("")


    return(
        <>
        <div id="loginForm">
            <TextInputField 
              label="Username"
              type="text"
              placeholder="Please enter your username"
              color="white"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
              <TextInputField 
              label="Password"
                type="password"
              placeholder="Please enter your password"
              color="white"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
            <Button onClick={()=>{
                fetch("/api/users/authenticate",{
                    method:"post",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        username:username,
                        password:password
                    })

                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.error){
                        toaster.danger(res.error)
                        return;
                    }
                    if(!res.error && !res.success){
                        toaster.danger("There was an error.")
                        return;
                    }
                    
                    Cookies.set("authID",res.data.userID)
                    if(res.data.user.isAdmin){
                        location.replace("/admin/dashboard")
                    }else{
                        location.replace("/dashboard")
                    }
                   
                })
            }}>Login</Button>
           
        </div>

        
 


        </>
    );
}