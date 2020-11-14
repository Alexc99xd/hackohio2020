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
            document.getElementById("count").innerHTML = "Columbus has redeemed " + count " total stickers!";
            document.getElementById("stats").innerHTML = "The Columbus community has revitalized its parks with " + parks " amount of stickers";
            document.getElementById("stats").innerHTML = "The recreational community has given out " + recreational " stickers!";
            document.getElementById("stats").innerHTML = "The restaurant ";
            document.getElementById("stats").innerHTML = "Our current stats";

        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}