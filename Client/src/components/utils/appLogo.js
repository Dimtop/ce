import React from 'react'


//Components
import {Heading,Strong,Link} from "evergreen-ui"



export default function AppLogo(){


    return(
        <div id="appLogo">
            <Heading size="900" >Pavlos Topalidis CE Platform</Heading>
            <Link href="https://topcode.gr" target="_blank" color="white" textDecoration="none" fontSize="2rem" marginTop="2rem">by Topcode</Link>

        </div>
    
    )
}