
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