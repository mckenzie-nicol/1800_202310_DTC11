function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var userName = userDoc.data().name;
                    var userAddress = userDoc.data().address;
                    var userAddress2 = userDoc.data().address2;
                    var userCity = userDoc.data().city;
                    var userProvince = userDoc.data().province;
                    var userPostal = userDoc.data().postal;
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
            console.log("No user is signed in");
        }
    });
} 
populateUserInfo();

function editUserInfo() {
    console.log('inside');
    document.getElementById("personalInfoField").disabled = false;
};

function saveUserInfo() {
    console.log('inside');
    var userEmail = document.getElementById("emailInput").value;
    var userName = document.getElementById("nameInput").value;
    var userAddress = document.getElementById("addressInput").value;
    var userAddress2 = document.getElementById("address2Input").value;
    var userCity = document.getElementById("cityInput").value;
    var userProvince = document.getElementById("provinceInput").value;
    var userPostal = document.getElementById("postalInput").value;;    
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

