function showUserLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    if (userName != null) {
                        document.getElementById("logged_in").innerHTML = userName[0];
                    }
                    else {
                        document.getElementById("logged_in").innerHTML = "No user is logged in";
                    }
                })
        }})
}   

$(document).ready(function () {
    showUserLoggedIn();
});

