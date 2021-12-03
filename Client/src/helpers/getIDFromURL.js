export default function getIDFromURL(url,indicator){
    var urlSplit = url.split("/");
    var index = urlSplit.indexOf(indicator);
    if(index<0){
        return null;
    }
    return urlSplit[index+1]
}