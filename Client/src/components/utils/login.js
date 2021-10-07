import React, {useState,useEffect} from 'react'

//Components
import {Button,Input,Grid,Row,Col,Alert} from 'rsuite'

//Libraries
import Cookies from "js-cookie"

export default function Login(props){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const [error,setError] = useState("")


    return(
        <>
        <div>
            <p>Username</p>
            <Input className="mainInput" type='text' value={username} onChange={value=>setUsername(value)}/>
            <p>Password</p>
            <Input className="mainInput" type='password' value={password} onChange={value=>setPassword(value)}/>
            <Button appearance="primary" className="mainButton" onClick={()=>{
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
                        Alert.error(res.error)
                        return;
                    }
                    if(!res.error && !res.success){
                        Alert.error("There was an error.")
                        return;
                    }
                    
                    Cookies.set("authID",res.data.userID)
                    location.replace("/dashboard")
                })
            }}>Login</Button>
        </div>

        
 


        </>
    );
}