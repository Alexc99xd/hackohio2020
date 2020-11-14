var signout = document.getElementById("signout");

console.log(firebase)

signout.addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        var base_url = window.location.origin;
        window.location.assign(base_url);
    })
})