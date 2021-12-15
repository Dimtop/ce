import React, {useState,useEffect} from "react";

//Helpers
import {getUserMessages,markMessageAsRead,createMessage} from "../../helpers/dataManager"
import getIDFromURL from "../../helpers/getIDFromURL";
//Componets
import {toaster,Spinner,Heading,Card,Text,Pane,Button,TextareaField} from "evergreen-ui"


export default function AdminMessages(props){


    const [messages,setMessages] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)
    const [messageToSend,setMessageToSend] = useState({
        userID:getIDFromURL(window.location.href, "users") ,
        date:new Date(),
        isRead:false,
        text:""
    })

    
    useEffect(()=>{
        getUserMessages(getIDFromURL(window.location.href, "users") ,(res)=>{
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
         <Heading size={900} textAlign="center"             color="white">Messages for user {getIDFromURL(window.location.href, "users")}</Heading>
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
             <Card
                elevation={2}
                float="left"
                width={window.innerWidth<600?"90%":"30rem"}
                padding="1rem"
                margin="0.5rem"
                display="flex"
                flexDirection="column"
                flexBasis="0 0 100%"

                cursor="pointer"
             >
                <TextareaField
                    label="Write a message"
                    description="Your message"
                    value={messageToSend.text}
                    onChange={(e)=>setMessageToSend({
                        ...messageToSend,
                        text:e.target.value
                    })}
                />
                <Button onClick={()=>{
                    createMessage(messageToSend,(res)=>{
                        if(res.error){
                            toaster.danger(res.error)
                            return;
                        }
                        location.reload()
                    })
                }}>Send</Button>    
                </Card>
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
                        >
                                <Text fontWeight="bold">{new Date(m.date).toDateString()}</Text>
                                <Text>{m.text}</Text>
                                {
                                    m.isRead?
                                    <>
                                    <Text fontWeight="bold">Έχει αναγνωστεί</Text>
                                    </>
                                    :
                                    <Text fontWeight="bold">Δεν έχει αναγνωστεί</Text>
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