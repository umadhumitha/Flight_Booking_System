const firebaseConfig = {
    apiKey: "AIzaSyBtlS1VQ3vkXOGcA5-EPXoE_2RswVoTC1A",
    authDomain: "devrev-45ded.firebaseapp.com",
    projectId: "devrev-45ded",
    storageBucket: "devrev-45ded.appspot.com",
    messagingSenderId: "845583531527",
    appId: "1:845583531527:web:3d1d6a1dcaee2943adf4a2"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()


var email = '';

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        email = user.email;
        console.log(user.email);
    } else {
        // No user is signed in.
        console.log('no user logged in');
    }
});

function showAddFlightPopup() {
    document.getElementById("add_flight_popup").style.display = "block";
}

function hideAddFlightPopup() {
    document.getElementById("add_flight_popup").style.display = "none";
}

function showRemoveFlightPopup() {
    document.getElementById("remove_flight_popup").style.display = "block";
}

function hideRemoveFlightPopup() {
    document.getElementById("remove_flight_popup").style.display = "none";
}

function addFlight() {
    // Retrieve the input values
    var flightNumber = document.getElementById("flight_number").value;
    var flightName = document.getElementById("flight_name").value;
    var flightDate = document.getElementById("flight_date").value;
    var flightTime = document.getElementById("flight_time").value;
    var flightFrom = document.getElementById("flight_from").value;
    var flightTo = document.getElementById("flight_to").value;

    // Perform further processing with the input values (e.g., send to server)
    // ...
    var user = auth.currentUser;

    // Get Firestore instance
    var firestore = firebase.firestore();
    if (flightDate == '' || flightName == '' || flightTime == '' || flightNumber == '' || flightFrom == '' || flightTo == '') {
        alert('Add the empty values')
        return
    }
    // Create User data
    var user_data = {
        flightNumber: flightNumber,
        flightName: flightName,
        flightDate: flightDate,
        flightTime: flightTime,
        flightFrom: flightFrom,
        flightTo: flightTo,
        a1: false, a2: false, a3: false, a4: false, a5: false, a6: false, a7: false, a8: false, a9: false, a10: false,
        a11: false, a12: false, a13: false, a14: false, a15: false, a16: false, a17: false, a18: false, a19: false, a20: false,
        a21: false, a22: false, a23: false, a24: false, a25: false, a26: false, a27: false, a28: false, a29: false, a30: false,
        a31: false,
        a32: false,
        a33: false,
        a34: false,
        a35: false,
        a36: false,
        a37: false,
        a38: false,
        a39: false,
        a40: false,
        a41: false,
        a42: false,
        a43: false,
        a44: false,
        a45: false,
        a46: false,
        a47: false,
        a48: false,
        a49: false,
        a50: false,
        a51: false,
        a52: false,
        a53: false,
        a54: false,
        a55: false,
        a56: false,
        a57: false,
        a58: false,
        a59: false,
        a60: false,
    };

    // Add the user data to Firestore
    firestore.collection('flights').doc().set(user_data)
        .then(function () {
            // User data added successfully
            alert('Flight added');
        })
        .catch(function (error) {
            // Error occurred while adding user data
            console.error('Error adding user data: ', error);
        });



    // Clear the input fields and hide the popup
    document.getElementById("flight_name").value = "";
    document.getElementById("flight_date").value = "";
    document.getElementById("flight_time").value = "";
    document.getElementById("flight_number").value = "";
    document.getElementById("flight_to").value = "";
    document.getElementById("flight_from").value = "";
    hideAddFlightPopup();
}
function removeFlight() {
    var flightName = document.getElementById("flight_name1").value;

    // Perform query against Firestore
    var bookingsRef = firebase.firestore().collection('flights');
    var bookingContainer = document.getElementById('flight_container');
    bookingsRef = bookingsRef.where("flightName", "==", flightName);
    //CONTAINS ALL DOCUMENTS OF THE FLIGHT NAME

    bookingsRef.onSnapshot(function (querySnapshot) {
        // Clear the previous contents of the booking container
        bookingContainer.innerHTML = '';

        querySnapshot.forEach(function (doc) {
            var data = doc.data();
            console.log(data);
            var flightName = data.flightName;
            var flightDate = data.flightDate;
            var flightNumber = data.flightNumber;
            var flightFrom = data.flightFrom;
            var flightTo = data.flightTo;
            var flightTime = data.flightTime;

            // Create a new card element to display the flight details
            var card = document.createElement('div');
            card.classList.add('card');

            var cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Flight Number
            var flightNameElement = document.createElement('p');
            flightNameElement.textContent = 'Flight Number: ' + flightNumber;
            cardContent.appendChild(flightNameElement);

            // Flight Name
            var flightNameElement = document.createElement('p');
            flightNameElement.textContent = 'Flight Name: ' + flightName;
            cardContent.appendChild(flightNameElement);

            // Flight Date
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight Date: ' + flightDate;
            cardContent.appendChild(flightDateElement);

            // Flight Time
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight Time: ' + flightTime;
            cardContent.appendChild(flightDateElement);

            // Flight From
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight From: ' + flightFrom;
            cardContent.appendChild(flightDateElement);

            // Flight To
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight To: ' + flightTo;
            cardContent.appendChild(flightDateElement);

            // Seat booked details
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Seat booked details: ';
            cardContent.appendChild(flightDateElement);

            var buttonContainer1 = document.createElement('div');
            buttonContainer1.classList.add('button-container');
            cardContent.appendChild(buttonContainer1);

            var clickedButtons = [];
            for (let i = 1; i <= 10; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            console.log(clickedButtons);

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);

            for (let i = 11; i <= 20; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }

            // for (let i = 11; i <= 20; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 21; i <= 30; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 21; i <= 30; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 31; i <= 40; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 31; i <= 40; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 41; i <= 50; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 41; i <= 50; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);

            for (let i = 51; i <= 60; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }

            var buttonContainer1 = document.createElement('div');
            buttonContainer1.classList.add('button-container');
            cardContent.appendChild(buttonContainer1);

            //flight vacant 
            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '1: ' + data.a1 + ' 2: ' + data.a2 + ' 3: ' + data.a3 + ' 4: ' + data.a4 + ' 5: ' + data.a5 + ' 6: ' + data.a6 + ' 7: ' + data.a7 + ' 8: ' + data.a8 + ' 9: ' + data.a9 + ' 10: ' + data.a10;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '11: ' + data.a11 + ' 12: ' + data.a12 + ' 13: ' + data.a13 + ' 14: ' + data.a14 + ' 15: ' + data.a15 + ' 16: ' + data.a16 + ' 17: ' + data.a17 + ' 18: ' + data.a18 + ' 19: ' + data.a19 + ' 20: ' + data.a20;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '21: ' + data.a21 + ' 22: ' + data.a22 + ' 23: ' + data.a23 + ' 24: ' + data.a24 + ' 25: ' + data.a25 + ' 26: ' + data.a26 + ' 27: ' + data.a27 + ' 28: ' + data.a28 + ' 29: ' + data.a29 + ' 30: ' + data.a30;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '31: ' + data.a31 + ' 32: ' + data.a32 + ' 33: ' + data.a33 + ' 34: ' + data.a34 + ' 35: ' + data.a35 + ' 36: ' + data.a36 + ' 37: ' + data.a37 + ' 38: ' + data.a38 + ' 39: ' + data.a39 + ' 40: ' + data.a40;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '41: ' + data.a41 + ' 42: ' + data.a42 + ' 43: ' + data.a43 + ' 44: ' + data.a44 + ' 45: ' + data.a45 + ' 46: ' + data.a46 + ' 47: ' + data.a47 + ' 48: ' + data.a48 + ' 49: ' + data.a49 + ' 50: ' + data.a50;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '51: ' + data.a51 + ' 52: ' + data.a52 + ' 53: ' + data.a53 + ' 54: ' + data.a54 + ' 55: ' + data.a55 + ' 56: ' + data.a56 + ' 57: ' + data.a57 + ' 58: ' + data.a58 + ' 59: ' + data.a59 + ' 60: ' + data.a60;
            // cardContent.appendChild(flightBookingElement);

            // Delete Button
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                deleteFlight(doc.id);
            });
            cardContent.appendChild(deleteButton);

            card.appendChild(cardContent);

            // Append the card to the booking container
            bookingContainer.appendChild(card);

        });
    });
}

function view() {
    var bookingsRef = firebase.firestore().collection('flights');
    var bookingContainer = document.getElementById('booking_container');

    bookingsRef.onSnapshot(function (querySnapshot) {
        // Clear the previous contents of the booking container
        bookingContainer.innerHTML = '';

        querySnapshot.forEach(function (doc) {
            var data = doc.data();
            var flightName = data.flightName;
            var flightDate = data.flightDate;
            var flightNumber = data.flightNumber;
            var flightFrom = data.flightFrom;
            var flightTo = data.flightTo;
            var flightTime = data.flightTime;

            // Create a new card element to display the flight details
            var card = document.createElement('div');
            card.classList.add('card');

            var cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Flight Number
            var flightNameElement = document.createElement('p');
            flightNameElement.textContent = 'Flight Number: ' + flightNumber;
            cardContent.appendChild(flightNameElement);

            // Flight Name
            var flightNameElement = document.createElement('p');
            flightNameElement.textContent = 'Flight Name: ' + flightName;
            cardContent.appendChild(flightNameElement);

            // Flight Date
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight Date: ' + flightDate;
            cardContent.appendChild(flightDateElement);

            // Flight Time
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight Time: ' + flightTime;
            cardContent.appendChild(flightDateElement);

            // Flight From
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight From: ' + flightFrom;
            cardContent.appendChild(flightDateElement);

            // Flight To
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight To: ' + flightTo;
            cardContent.appendChild(flightDateElement);

            // Seat booked details
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Seat booked details: ';
            cardContent.appendChild(flightDateElement);


            var buttonContainer1 = document.createElement('div');
            buttonContainer1.classList.add('button-container');
            cardContent.appendChild(buttonContainer1);

            var clickedButtons = [];
            for (let i = 1; i <= 10; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            console.log(clickedButtons);

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);

            for (let i = 11; i <= 20; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }

            // for (let i = 11; i <= 20; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 21; i <= 30; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 21; i <= 30; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 31; i <= 40; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 31; i <= 40; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);
            for (let i = 41; i <= 50; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }
            // for (let i = 41; i <= 50; i++) {
            //     const button = document.createElement('button');
            //     button.textContent = 'Seat ' + i + '  ';

            //     if (!data['a' + i]) {
            //         button.classList.add('red-button');
            //         button.id = 'button-' + i;
            //     }

            //     button.addEventListener('click', function () {
            //         // data['a' + i] = !data['a' + i];
            //         // button.textContent = 'Button ' + i;
            //         // button.classList.toggle('red-button');
            //         const buttonValue = !data['a' + i];
            //         data['a' + i] = buttonValue;
            //         button.textContent = 'Seat ' + i + ': ' + buttonValue;
            //         button.classList.toggle('red-button');

            //         // Retrieve Firestore document
            //         const query = firestore.collection('flights')
            //             .where('flightDate', '==', flightDate)
            //             .where('flightTime', '==', flightTime);

            //         query.get()
            //             .then((querySnapshot) => {
            //                 if (querySnapshot.empty) {
            //                     console.log('No matching documents found.');
            //                     return;
            //                 }

            //                 // Update Firestore document
            //                 const docRef = querySnapshot.docs[0].ref;
            //                 docRef.update({ ['a' + i]: buttonValue })
            //                     .then(() => {
            //                         console.log('Firestore document updated successfully!');
            //                     })
            //                     .catch((error) => {
            //                         console.error('Error updating Firestore document:', error);
            //                     });
            //             })
            //             .catch((error) => {
            //                 console.error('Error retrieving Firestore document:', error);
            //             });

            //         // // Update Firestore document here
            //         // const docRef = firestore.collection('flights').doc();
            //         // docRef.update({ ['a' + i]: buttonValue })
            //         //     .then(() => {
            //         //         console.log('Firestore document updated successfully!');
            //         //     })
            //         //     .catch((error) => {
            //         //         console.error('Error updating Firestore document:', error);
            //         //     });
            //     });

            //     cardContent.appendChild(button);
            // }

            var buttonContainer2 = document.createElement('div');
            buttonContainer2.classList.add('button-container');
            cardContent.appendChild(buttonContainer2);

            for (let i = 51; i <= 60; i++) {
                const button = document.createElement('button');
                button.textContent = 'Seat ' + i + '  ';

                if (!data['a' + i]) {
                    button.classList.add('red-button');
                    button.id = 'button-' + i;


                    button.addEventListener('click', function () {

                        const buttonValue = !data['a' + i];
                        data['a' + i] = buttonValue;
                        button.textContent = 'Seat ' + i;

                        // Add button name to the array if it was clicked
                        if (buttonValue) {
                            clickedButtons.push(i);
                        } else {
                            const index = clickedButtons.indexOf(i);
                            if (index > -1) {
                                clickedButtons.splice(index, 1);
                            }
                        }

                        button.classList.toggle('red-button');
                        button.classList.toggle('yellow-button');


                        // data['a' + i] = !data['a' + i];
                        // button.textContent = 'Button ' + i;
                        // button.classList.toggle('red-button');

                        // const buttonValue = !data['a' + i];
                        // data['a' + i] = buttonValue;
                        // button.textContent = 'Seat ' + i + ': ' + buttonValue;
                        // button.classList.toggle('red-button');

                        // Retrieve Firestore document
                        // const query = firestore.collection('flights')
                        //     .where('flightDate', '==', flightDate)
                        //     .where('flightTime', '==', flightTime);

                        // query.get()
                        //     .then((querySnapshot) => {
                        //         if (querySnapshot.empty) {
                        //             console.log('No matching documents found.');
                        //             return;
                        //         }

                        //         // Update Firestore document
                        //         const docRef = querySnapshot.docs[0].ref;
                        //         docRef.update({ ['a' + i]: buttonValue })
                        //             .then(() => {
                        //                 console.log('Firestore document updated successfully!');
                        //             })
                        //             .catch((error) => {
                        //                 console.error('Error updating Firestore document:', error);
                        //             });
                        //     })
                        //     .catch((error) => {
                        //         console.error('Error retrieving Firestore document:', error);
                        //     });
                    });
                } else if (data['a' + i]) {
                    button.classList.add('green-button');
                }
                cardContent.appendChild(button);
            }

            card.appendChild(cardContent);

            // Append the card to the booking container
            bookingContainer.appendChild(card);


            //flight vacant 
            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '1: ' + data.a1 + ' 2: ' + data.a2 + ' 3: ' + data.a3 + ' 4: ' + data.a4 + ' 5: ' + data.a5 + ' 6: ' + data.a6 + ' 7: ' + data.a7 + ' 8: ' + data.a8 + ' 9: ' + data.a9 + ' 10: ' + data.a10;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '11: ' + data.a11 + ' 12: ' + data.a12 + ' 13: ' + data.a13 + ' 14: ' + data.a14 + ' 15: ' + data.a15 + ' 16: ' + data.a16 + ' 17: ' + data.a17 + ' 18: ' + data.a18 + ' 19: ' + data.a19 + ' 20: ' + data.a20;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '21: ' + data.a21 + ' 22: ' + data.a22 + ' 23: ' + data.a23 + ' 24: ' + data.a24 + ' 25: ' + data.a25 + ' 26: ' + data.a26 + ' 27: ' + data.a27 + ' 28: ' + data.a28 + ' 29: ' + data.a29 + ' 30: ' + data.a30;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '31: ' + data.a31 + ' 32: ' + data.a32 + ' 33: ' + data.a33 + ' 34: ' + data.a34 + ' 35: ' + data.a35 + ' 36: ' + data.a36 + ' 37: ' + data.a37 + ' 38: ' + data.a38 + ' 39: ' + data.a39 + ' 40: ' + data.a40;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '41: ' + data.a41 + ' 42: ' + data.a42 + ' 43: ' + data.a43 + ' 44: ' + data.a44 + ' 45: ' + data.a45 + ' 46: ' + data.a46 + ' 47: ' + data.a47 + ' 48: ' + data.a48 + ' 49: ' + data.a49 + ' 50: ' + data.a50;
            // cardContent.appendChild(flightBookingElement);


            // var flightBookingElement = document.createElement('p');
            // flightBookingElement.textContent = '51: ' + data.a51 + ' 52: ' + data.a52 + ' 53: ' + data.a53 + ' 54: ' + data.a54 + ' 55: ' + data.a55 + ' 56: ' + data.a56 + ' 57: ' + data.a57 + ' 58: ' + data.a58 + ' 59: ' + data.a59 + ' 60: ' + data.a60;
            // cardContent.appendChild(flightBookingElement);

            // card.appendChild(cardContent);

            // // Append the card to the booking container
            // bookingContainer.appendChild(card);
        });
    });
}

function deleteFlight(flightId) {
    var flightRef = firebase.firestore().collection('flights').doc(flightId);

    flightRef.delete()
        .then(function () {
            alert('Flight successfully deleted!');
            location.reload();
        })
        .catch(function (error) {
            console.error('Error deleting flight: ', error);
        });
}

// function login() {
//     window.location.href = 'index.html';
// }

function logout() {
    firebase.auth().signOut()
        .then(function () {
            alert("Logged out successfully!");
            // Redirect to another page
            window.location.href = 'index.html';
            // Delete all pages from the history stack
            window.history.replaceState({}, document.title, "/");
            // Perform additional operations or redirect to another page if needed
        })
        .catch(function (error) {
            alert("Error occurred while logging out. Please try again.");
            console.log(error);
        });
}