import React from 'react'


//Components
import {Heading,Strong,Link} from "evergreen-ui"

//Assets
import logo from "../../assets/logo1.png"
import ceplatform from "../../assets/ceplatform.png"


export default function AppLogo(){


    return(
        <>
        <div id="appLogo">
            <img style={{textAlign:"center",width:"10rem",height:"10rem"}} src={logo}/>
            <br></br>
            <img style={{textAlign:"center",width:"20rem",height:"3rem"}} src={ceplatform}/>
            <br></br>
            <Link href="https://topcode.gr" target="_blank" color="white" textDecoration="none" fontSize="1rem" marginTop="2rem">by Topcode</Link>
        </div>
   
        </>
    
    )
}