//Libraries
import Cookies from "js-cookie"


function getUserMachines(userID,cb){
    fetch("/api/users/" +userID + "/machines",{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res.data);
    })
}


function getUserByID(userID,cb){
    fetch("/api/users/" + userID,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res.data)
    })
}


function getMachineByID(machineID,cb){
    fetch("/api/machines/" + machineID,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function updateUser(userID,user,cb){

    var formData = new FormData()
    formData.append("user",JSON.stringify(user))
    formData.append("logo",user.logo)
    formData.append("signature",user.signature)
    
    fetch("/api/users/" + userID,{
        method:"put",
      
        body:formData
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function deleteMachineFile(fileType,fileMode,file,machineID,cb){

    fetch("/api/machines/" + machineID + "/files/delete",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            fileType:fileType,
            fileMode:fileMode,
            file:file,
            machineID:machineID
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function uploadMachineFile(fileType,fileMode,file,machineID,cb){

    var formData = new FormData();
    

    formData.append("fileType",fileType)
    formData.append("fileMode",fileMode)
    formData.append("machineID",machineID);
    formData.append("userID",Cookies.get("authID"))
    formData.append("newFile",file[0]);

    console.log(file)
    fetch("/api/machines/" + machineID + "/files/upload",{
        method:"post",
        headers:{},
        body:formData
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function getUserUnreadMessagesCount(cb){
    fetch("/api/messages/users/" + Cookies.get("authID") + "/count",{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function getUserMessages(cb){
    fetch("/api/messages/users/" + Cookies.get("authID"),{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function markMessageAsRead(mID,cb){
    fetch("/api/messages/" + mID + "/read",{
        method:"put"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


export {getUserMachines}
export {getUserByID}
export {updateUser}
export {getMachineByID}
export {deleteMachineFile}
export {uploadMachineFile}
export {getUserUnreadMessagesCount}
export {getUserMessages}
export {markMessageAsRead}