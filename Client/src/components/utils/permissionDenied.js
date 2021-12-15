import React, {useState,useEffect} from "react"


//Componets
import {Heading,Spinner} from "evergreen-ui"

//Libraries
import Cookies from "js-cookie"

//Helpers 
import { getUserByID } from "../../helpers/dataManager"


export default function PermissionDenied(props){

  


    return(
        <>
     
            <Heading size="900">Δεν έχετε δικαίωμα προβολής αυτής της σελίδας.</Heading>
            {
                props.checkAdmin?
                <>
                <Heading size="700">Δεν είστε διαχειριστής.</Heading>
                <a href="/">Παρακαλώ συνδεθείτε πατώντας εδώ.</a>
                </>
                :
                props.isLocked?
                <>
                <Heading size="700">Ο λογαριασμός σας έχει κλειδωθεί</Heading>
                <a href="/">Παρακαλώ συνδεθείτε πατώντας εδώ.</a>
                </>
                :
                <a href="/">Παρακαλώ συνδεθείτε πατώντας εδώ.</a>
            }
        
     

        </>
    )
}