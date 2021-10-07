function getUserMachines(userID,cb){
    fetch("/api/users/" +userID + "/machines",{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        cb(res.data);
    })
}


export {getUserMachines}