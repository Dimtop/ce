export default function getObjectPropertySafe(fn){

    
    try{
        console.log(fn())
        return fn();
    }
    catch(error){
        return "";
    }
}