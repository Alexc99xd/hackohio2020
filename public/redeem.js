var config = {
    apiKey: "AIzaSyC1JMYCRrAwfe6lay0J70YalT1P7Zbj0Cw",
    authDomain: "hackohio2020-5f83d.firebaseapp.com",
    databaseURL: "https://hackohio2020-5f83d.firebaseio.com",
    projectId: "hackohio2020-5f83d",
    storageBucket: "hackohio2020-5f83d.appspot.com",
    messagingSenderId: "380845883019",
    appId: "1:380845883019:web:e03a859c4600ec8698de8e",
    measurementId: "G-0FLEPL8DWR"
  };
  firebase.initializeApp(config);

var db = firebase.firestore();


function redeemCode() {
        
    //get the editable element
    var editElem = document.getElementById("code-redeem");
    
    //get the edited element content
    var userEntered = editElem.innerHTML;
    var userEntered = userEntered.trim();
    
    //save the content to local storage
    localStorage.userEdits = userEntered;


    var docRef = db.collection("stickers").doc(userEntered);
    var string = "";
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            string = doc.data().sticker + " from " + doc.data().place;
            document.getElementById("update").innerHTML = string;
        } else {
            // doc.data() will be undefined in this case
            string = "invalid code!";
            document.getElementById("update").innerHTML = string;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


}
function checkEdits() {
    
    //find out if the user has previously saved edits
    if(localStorage.userEdits!=null){
        document.getElementById("code-redeem").innerHTML=localStorage.userEdits;
    }
}


//firebase