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

function updateUser(userID,user,cb){
    fetch("/api/users/" + userID,{
        method:"put",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            user:user
        })
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res)
    })
}


export {getUserMachines}
export {getUserByID}
export {updateUser}