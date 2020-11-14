
var db = firebase.firestore();


function redeemCode() {
        
    //get the editable element
    var editElem = document.getElementById('userCode').value;
    //console.log(editElem);

    var userEntered = editElem.trim();

    var docRef = db.collection("stickers").doc(userEntered);
    var string = "";
    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            //console.log("Document data:", doc.data().aaaaa === true);
            string = doc.data().sticker + " from " + doc.data().place;
            document.getElementById("update").innerHTML = string;
            //update stats
            updateStats(doc.data().org);
            updateUser(doc.data().sticker, userEntered);
        } else {
            // doc.data() will be undefined in this case
            string = "invalid code!";
            document.getElementById("update").innerHTML = string;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


    //now save the sticker stats for the user (that is logged in)

}

function updateUser(sticker_, code){
    var docRefUser = db.collection("users").doc(firebase.auth().currentUser.uid);

    //console.log("hello");
    //check if user already has sticker
    docRefUser.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Hello 2", doc.data()[sticker_] === true);
            if(doc.data()[sticker_] != null){
                //has sticker, don't increment count
            } else {
                //has sticker, don't increment count
                //doesn't have sticker
                //add stick to true
                db.collection("users").doc(firebase.auth().currentUser.uid).set({
                    [sticker_]: code,
                    sticker_count: firebase.firestore.FieldValue.increment(1),
                    }, { merge: true });
            }
        } else {
            //some error
        }
    });

}

function updateStats(org){

    var docRef = db.collection("stats").doc("sticker");
    docRef.update({
        count: firebase.firestore.FieldValue.increment(1)
    });

    if(org === "parks"){
        docRef.update({
            parks: firebase.firestore.FieldValue.increment(1)
        });
    } else if(org === "restaurants"){
        docRef.update({
            restaurants: firebase.firestore.FieldValue.increment(1)
        });
    } else if (org === "recreational"){
        docRef.update({
            recreational: firebase.firestore.FieldValue.increment(1)
        });
    } else if(org === "special_events"){
        docRef.update({
            special_events: firebase.firestore.FieldValue.increment(1)
        });
    } 
    docRef.update({
        weekly: firebase.firestore.FieldValue.increment(1)
    });

}


// function checkEdits() {
    
//     //find out if the user has previously saved edits
//     if(localStorage.userEdits!=null){
//         document.getElementById("code-redeem").innerHTML=localStorage.userEdits;
//     }
// }


//firebase