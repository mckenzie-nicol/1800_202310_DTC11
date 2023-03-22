$("#submitbtn").click(function () {

    console.log("1")
    let Text_description = document.getElementById("text_input").value;
    console.log(Text_description)

    firebase.auth().onAuthStateChanged(user => {
        // img set missing
        if (user) {
            var user = firebase.auth().currentUser;
            console.log("hi")
            console.log(user.uid)
            var userID = user.uid;
            db.collection("reports").doc("reports".uid).set({
                user_id: userID,
                report_lat: "",
                report_lng: "",
                text_description: Text_description,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            console.log("No user is signed in");
            window.location.href = 'login.html'
        }
    })


})

function preview() {
    frame.src = URL.createObjectURL(event.target.files[0]);
}

function clearImage() {
    document.getElementById('formFile').value = null;
    frame.src = "";
}

function empty_all() {
    document.getElementById("text_input").value = "";
    document.getElementById("formFile").value = "";
    clearImage()
}
