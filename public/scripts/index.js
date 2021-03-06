var signin = document.getElementById("googleSign");
var db = firebase.firestore();
signin.addEventListener("click", () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log
            var token = result.credential.accessToken;
            var user = result.user;
            var base_url = window.location.origin;
            base_url += '/pages/dashboard.html'
            window.location.assign(base_url);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        }).then(() => {
            db.collection("users").doc(firebase.auth().currentUser.uid).set({
                email: firebase.auth().currentUser.email,
                sticker_count: 0,
            }, { merge: true });
        });
})