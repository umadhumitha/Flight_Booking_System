// Import the Firebase authentication module
// const sentUid = require('./index');

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


function showSearchFlightPopup() {
    document.getElementById("search_flight_popup").style.display = "block";
    hideMyBookingPopup();
}

function hideSearchFlightPopup() {
    document.getElementById("search_flight_popup").style.display = "none";
}
function showMyBookingPopup() {
    document.getElementById("mybook_flight_popup").style.display = "block";
    myBookFlight();
}

function hideMyBookingPopup() {
    document.getElementById("mybook_flight_popup").style.display = "none";
}

function searchFlight() {
    var flightDate = document.getElementById("flight_date").value;
    var flightTime = document.getElementById("flight_time").value;

    // Perform query against Firestore
    var bookingsRef = firebase.firestore().collection('flights');
    var bookingContainer = document.getElementById('flight_container1');
    bookingsRef = bookingsRef.where("flightDate", "==", flightDate).where("flightTime", "==", flightTime);

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
            // for (let i = 51; i <= 60; i++) {
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


            var buttonContainer1 = document.createElement('div');
            buttonContainer1.classList.add('button-container');
            cardContent.appendChild(buttonContainer1);

            // Create first book button
            var bookButton1 = document.createElement('button');
            bookButton1.textContent = 'Book';
            bookButton1.addEventListener('click', function () {
                bookTicket(doc.id, clickedButtons, flightDate, flightName, flightTime, flightFrom, flightTo, flightNumber);
            });
            buttonContainer1.appendChild(bookButton1);

            card.appendChild(cardContent);

            // Append the card to the booking container
            bookingContainer.appendChild(card);

        });
    });
}
// function bookTicket(flightId, clickedButtons) {

//     var query = firebase.firestore().collection('flights').doc(flightId);

//     query.get()
//         .then((querySnapshot) => {
//             if (querySnapshot.empty) {
//                 console.log('No matching documents found.');
//                 return;
//             }

//             // Update Firestore document
//             const docRef = querySnapshot.ref;

//             // Create an object with all the clicked buttons set to true
//             const updateData = {};
//             clickedButtons.forEach((buttonIndex) => {
//                 updateData['a' + buttonIndex] = true;
//             });

//             docRef.update(updateData)
//                 .then(() => {
//                     alert("Ticket Booked successfully");
//                     location.reload();
//                     console.log('Firestore document updated successfully!');
//                 })
//                 .catch((error) => {
//                     console.error('Error updating Firestore document:', error);
//                 });
//         })
//         .catch((error) => {
//             console.error('Error retrieving Firestore document:', error);
//         });
// }

function bookTicket(flightId, clickedButtons, flightDate, flightName, flightTime, flightFrom, flightTo, flightNumber) {
    const firestore = firebase.firestore();
    const flightRef = firestore.collection('flights').doc(flightId);
    const myBookingRef = firestore.collection('mybooking');

    // Retrieve flight document
    flightRef.get()
        .then((flightSnapshot) => {
            if (!flightSnapshot.exists) {
                console.log('Flight document does not exist.');
                return;
            }

            // Create an object with all the clicked buttons set to true
            const updateData = {};
            clickedButtons.forEach((buttonIndex) => {
                updateData['a' + buttonIndex] = true;
            });

            // Update flight document
            flightRef.update(updateData)
                .then(() => {
                    console.log('Flight document updated successfully!');

                    // Create a new document in mybooking collection for each clicked button
                    clickedButtons.forEach((buttonIndex) => {
                        const bookingData = {
                            user: email,
                            flightNumber: flightNumber,
                            flightName: flightName,
                            flightDate: flightDate,
                            flightTime: flightTime,
                            flightFrom: flightFrom,
                            flightTo: flightTo,
                            flightId: flightId,
                            seat: buttonIndex
                        };

                        // Add a new document to mybooking collection
                        myBookingRef.add(bookingData)
                            .then((docRef) => {
                                // alert("Ticket Booked successfully");
                                location.reload();
                                console.log(auth.currentUser);
                                console.log('Booking added to mybooking collection with ID: ', docRef.id);
                            })
                            .catch((error) => {
                                console.error('Error adding booking to mybooking collection:', error);
                            });
                    });
                })
                .catch((error) => {
                    console.error('Error updating flight document:', error);
                });
        })
        .catch((error) => {
            console.error('Error retrieving flight document:', error);
        });
    alert("Ticket Booked successfully");
}

function myBookFlight() {
    // Perform query against Firestore
    var bookingsRef = firebase.firestore().collection('mybooking');
    var bookingContainer = document.getElementById('booking_container1');
    bookingsRef = bookingsRef.where("user", "==", email);

    bookingsRef.onSnapshot(function (querySnapshot) {
        // Clear the previous contents of the booking container
        bookingContainer.innerHTML = '';

        querySnapshot.forEach(function (doc) {
            var data = doc.data();
            console.log(data);
            var flightName = data.flightName;
            var flightDate = data.flightDate;
            var flightTime = data.flightTime;
            var seat = data.seat;
            var flightNumber = data.flightNumber;
            var flightFrom = data.flightFrom;
            var flightTo = data.flightTo;


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
            var flightTimeElement = document.createElement('p');
            flightTimeElement.textContent = 'Flight Time: ' + flightTime;
            cardContent.appendChild(flightTimeElement);

            // Flight From
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight From: ' + flightFrom;
            cardContent.appendChild(flightDateElement);

            // Flight To
            var flightDateElement = document.createElement('p');
            flightDateElement.textContent = 'Flight To: ' + flightTo;
            cardContent.appendChild(flightDateElement);


            // Seat booked details
            var flightSeatElement = document.createElement('p');
            flightSeatElement.textContent = 'Seat No : ' + seat;
            cardContent.appendChild(flightSeatElement);

            card.appendChild(cardContent);

            // Append the card to the booking container
            bookingContainer.appendChild(card);

        });
    });
}

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
