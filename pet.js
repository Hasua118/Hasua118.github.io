// var url = "https://rawgit.com/o7planning/webexamples/master/_testdatas_/simple-text-data.txt";

// function doGetText(){
//     // call fetch(ủl) with default options
//     var myPromise = fetch(url)
//     myPromise
//         .then(function(response){
//             console.log("Sever return a response: ");
//             console.log(response);
//             if(!response.ok){
//                 throw new Error("HTTP error, status:" + response.status);
//             }
//             return response.text()
//         })
//         .then(function (myText){
//             console.log("Text:",myText)
//         })
//         .catch(function (error){
//             console.log("noooo! Something went wrong???")
//             console.log(error)
//         })
// }


var url ="http://quotes.rest/qod.json"

function GetContents(){
    var myPromise =fetch(url)
}
