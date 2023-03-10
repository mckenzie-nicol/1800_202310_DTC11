$("#submitbtn").click(function () {
    var user = firebase.auth().currentUser;
    console.log("hi")
    console.log(user.uid)
    db.collection("reports").doc("reports".uid).set({
        user_id: user,
        report_lat: "",
        report_lng: "",
        text_description: "",
        timestamp: "",
        // img set missing
    })
})