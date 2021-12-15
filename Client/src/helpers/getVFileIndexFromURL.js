export default function getIDFromURL(url){
    var urlSplit = url.split("/");
    var index = urlSplit.indexOf("variableFiles");
    if(index<0){
        return null;
    }
    return urlSplit[index+1]
}