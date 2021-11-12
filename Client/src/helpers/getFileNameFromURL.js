function getFileNameFromURL(url){
    console.log(url)
    url = url.split("/");
    console.log(url)
    var urlLength = url.length;
    console.log(url)
    var filename = url[urlLength-1];
    return filename;
}

export default getFileNameFromURL;