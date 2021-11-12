import React, {useState,useEffect} from "react";

//Helpers
import {getUserMessages,markMessageAsRead} from "../helpers/dataManager"

//Componets
import {toaster,Spinner,Heading,Card,Text,Pane,Button} from "evergreen-ui"


export default function Messages(props){


    const [messages,setMessages] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)

    
    useEffect(()=>{
        getUserMessages((res)=>{
            if(res.error){
                toaster.danger(res.error)
                return
            }
            console.log(res.data.messages.length)
            setMessages(res.data.messages)
            setShowSpinner(false)
        })
    },[])

    return(
        <>
         <Heading size={900} textAlign="center">Messages</Heading>
         <Pane 
            clearfix  
            width={"100%"}
            display="flex"
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            flexDirection="column"
            flexWrap="wrap"
            >
        {
            !showSpinner?
            <>
            {
                messages.map(m=>{
                    return(
                        <>
                        <Card
                              elevation={2}
                              float="left"
                              width={window.innerWidth<600?"90%":"30rem"}
                              padding="1rem"
                              margin="0.5rem"
                              display="flex"
                              flexDirection="column"
                              flexBasis="0 0 100%"
                              background={m.isRead?"#E6E8F0":"#F9FAFC"}
                              cursor="pointer"
                              onClick={()=>location.replace("/machines/" + machine._id + "/fileTypes")}>
                                <Text fontWeight="bold">{new Date(m.date).toDateString()}</Text>
                                <Text>{m.text}</Text>
                                {
                                    m.isRead?
                                    <></>
                                    :
                                    <Button onClick={()=>{
                                        markMessageAsRead(m._id,(res)=>{
                                            if(res.error){
                                                toaster.danger(res.error)
                                                return
                                            }
                                            toaster.success(res.success)
                                            location.reload()
                                        })
                                    }}>Σημείωση ως αναγνωσμένο</Button>
                                }
                              </Card>
                        </>
                    )
                })
            }
     
            </>
            :
            <Spinner />
        }
               </Pane>
        </>
    )
}