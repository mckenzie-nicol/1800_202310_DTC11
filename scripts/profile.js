function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userEmail = userDoc.data().email;
                    var userName = userDoc.data().name;
                    var userAddress = userDoc.data().address;
                    var userAddress2 = userDoc.data().address2;
                    var userCity = userDoc.data().city;
                    var userProvince = userDoc.data().province;
                    var userPostal = userDoc.data().postal;

                    //if the data fields are not empty, then write them in to the form.\
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userAddress;
                    }
                    if (userAddress2 != null) {
                        document.getElementById("address2Input").value = userAddress2;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userProvince != null) {
                        document.getElementById("provinceInput").value = userProvince;
                    }
                    if (userPostal != null) {
                        document.getElementById("postalInput").value = userPostal;
                    }
                })

        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    console.log('inside');
    document.getElementById("personalInfoField").disabled = false;
};

function saveUserInfo() {
    console.log('inside');
    //enter code here

    //a)get user entered values
    var userEmail = document.getElementById("emailInput").value;
    var userName = document.getElementById("nameInput").value;
    var userAddress = document.getElementById("addressInput").value;
    var userAddress2 = document.getElementById("address2Input").value;
    var userCity = document.getElementById("cityInput").value;
    var userProvince = document.getElementById("provinceInput").value;
    var userPostal = document.getElementById("postalInput").value;;    

    //b)update the user document with the new values
    currentUser.update({
        email: userEmail,
        name: userName,
        address: userAddress,
        address2: userAddress2,
        city: userCity,
        province: userProvince,
        postal: userPostal
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById("personalInfoField").disabled = true;
}

$(document).ready(function () {
    $('#personalInfoField').prop('disabled', true);
});

