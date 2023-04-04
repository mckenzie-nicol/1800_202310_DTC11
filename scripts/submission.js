$("#submitbtn").click(function () {
    let Text_description = document.getElementById("text_input").value;
    console.log(Text_description)
    console.log($("#formFile").value)
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user = firebase.auth().currentUser;
            console.log(user.uid)
            var userID = user.uid;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    db.collection("reports").add({
                        user_id: userID,
                        report_lat: position.coords.latitude,
                        report_lng: position.coords.longitude,
                        text_description: Text_description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(doc => {
                        console.log("Report document added!");
                        console.log(doc.id);
                        saveReportIDforUser(doc.id, userID);
                        if (ImageFile != null) {
                            uploadPic(doc.id)
                        }
                        alert("Report submitted! Thank you for letting us know the sidewalk conditions.");
                    })
                })
            }
        }
        else {
            console.log("No user is signed in");
            window.location.href = 'login.html'
        }
    })
})

var ImageFile;
function preview() {
    ImageFile = event.target.files[0]
    frame.src = URL.createObjectURL(ImageFile);
}

function uploadPic(ReportsDocID) {
    console.log("inside uploadPic " + ReportsDocID);
    var storageRef = storage.ref("images/" + ReportsDocID + ".jpg");

    storageRef.put(ImageFile)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()
                .then(function (url) {
                    console.log("Got the download URL.");
                    db.collection("reports").doc(ReportsDocID).update({
                        "image": url
                    })
                })
        })
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

function saveReportIDforUser(ReportsDocID, UserID) {
    console.log("user id is: " + UserID);
    console.log("postdoc id is: " + ReportsDocID);
    db.collection("users").doc(UserID).update({
        previous_reports: firebase.firestore.FieldValue.arrayUnion(ReportsDocID)
    })
        .then(() => {
            console.log("Saved to user's document!");
        })
}
