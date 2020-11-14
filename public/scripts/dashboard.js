var db = firebase.firestore();
var loaded = false;

async function loadStickers(){
    if(!loaded){
        loaded = true;
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                for(let i = 1; i < 5; i++){
                    var str = "sticker_" + i;
                    if(doc.data()[str] != null){
                        //then get code
                        var code = doc.data()[str];

                        //use code to get "place"
                        getPlace(code, str);
                        //document.getElementById('stickerList').innerHTML += ('<li>'+ str + " from " + place +'</li>');

                    }
                }
                
                
                document.getElementById("sticker_title").innerHTML = "Number of stickers you have: " + doc.data().sticker_count + " stickers!";
            } else {

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }
}

function getPlace(code, str){
    
    var docRef2 = db.collection("stickers").doc(code);
    
    docRef2.get().then(function(doc) {
        console.log(doc.data());
        if (doc.exists) {
            document.getElementById('stickerList').innerHTML += ('<li>'+ str + " from " + doc.data().place +'</li>');
            //return doc.data().place;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
}