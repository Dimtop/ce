//Libraries
import Cookies from "js-cookie"



function createUser(user,cb){
    var formData = new FormData()
    formData.append("user",JSON.stringify(user))
    formData.append("logo",user.logo)
    formData.append("signature",user.signature)
   
    fetch("/api/users",{
        method:"post",

        body:formData
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function deleteUser(userID,cb){
    fetch("/api/users/" + userID,{
        method:"delete"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

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

function getUserMessages(userID,cb){
    fetch("/api/messages/users/" + userID,{
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


function updateMachineFiles(mID,machine,cb){
    fetch("/api/machines/" + mID + "/files",{
        method:"put",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            machine:machine
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function validateFile(fileCode,cb){
    fetch("/api/machines/validateFile",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            fileCode:fileCode
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function generateFileCode(machineID,fid,fileIndicator,cb){
    fetch("/api/machines/generateFileCode",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            machineID:machineID,
            fid:fid,
            fileIndicator:fileIndicator
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}



function getAllUsers(cb){
    fetch("/api/users/all",{
        method:"get",
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


function getAllMachineCategories(cb){
    fetch("/api/machineCategories/all",{
        method:"get",
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function postMachine(machine,cb){
    fetch("/api/machines/",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            machine:machine
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function updateMachine(machineID,machine,cb){
    fetch("/api/machines/"+machineID,{
        method:"put",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            machine:machine
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function deleteMachine(machineID,cb){
    fetch("/api/machines/"+machineID,{
        method:"delete"
      
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function createMessage(message,cb){
    fetch("/api/messages/",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}

function createMachineCategory(category,cb){
    fetch("/api/machineCategories/",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


export {createUser}
export {deleteUser}
export {getAllMachineCategories}
export {getAllUsers}
export {getUserMachines}
export {getUserByID}
export {updateUser}
export {getMachineByID}
export {deleteMachineFile}
export {uploadMachineFile}
export {getUserUnreadMessagesCount}
export {getUserMessages}
export {markMessageAsRead}
export { updateMachineFiles}
export {validateFile}
export {generateFileCode}

export {postMachine}
export {createMessage}
export {createMachineCategory}
export {updateMachine}
export {deleteMachine}