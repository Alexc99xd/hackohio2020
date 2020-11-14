var db = firebase.firestore();

function checkStats(){
    
    var docRef = db.collection("stats").doc("sticker");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var docData = doc.data();
            var count = docData.count;
            var parks = docData.parks;
            var recreational = docData.recreational;
            var restaurants = docData.restaurants;
            var special_events = docData.special_events;

            //update stuff
            document.getElementById("stats").innerHTML = "Our current stats";
            document.getElementById("count").innerHTML = "Columbus has redeemed " + count + " total stickers!";
            document.getElementById("parks").innerHTML = "The Columbus community has revitalized its parks with " + parks + " amount of stickers";
            document.getElementById("recreational").innerHTML = "The recreational community has given out " + recreational + " stickers!";
            document.getElementById("restaurants").innerHTML = "The restaurants of Columbus thank you for the " + restaurants + " stickers given out!";
            document.getElementById("special_events").innerHTML = "Special Events of Columbus has given out " + special_events + " stickers!";

        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}