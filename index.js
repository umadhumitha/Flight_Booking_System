
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


// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    confirmPassword = document.getElementById('confirmPassword').value
    // favourite_song = document.getElementById('favourite_song').value
    // milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is empty!!')
        return
        // Don't continue running the code
    }
    // if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    if (validate_field(full_name) == false || validate_field(confirmPassword) == false) {
        alert('One or More Extra Fields are empty!!')
        return
    }

    if (password != confirmPassword) {
        alert('Password and Confirm Password must be same')
        return
    }
    // alert('One or More Extra Fields is Outta Line!!')
    // Move on with Auth
    // auth.createUserWithEmailAndPassword(email, password)
    //     .then(function () {
    //         // Declare user variable
    //         var user = auth.currentUser

    //         // Add this user to Firebase Database
    //         var database_ref = database.ref()

    //         // Create User data
    //         var user_data = {
    //             email: email,
    //             full_name: full_name,
    //             password: password,
    //             role: 'user',
    //             // favourite_song: favourite_song,
    //             // milk_before_cereal: milk_before_cereal,
    //             last_login: Date.now()
    //         }

    //         // Push to Firebase Database
    //         database_ref.child('users/' + user.uid).set(user_data)

    //         // DOne
    //         alert('User Created!!')

    //         // Redirect to user.html
    //         window.location.href = 'user.html';

    //     })
    //     .catch(function (error) {
    //         // Firebase will use this to alert of its errors
    //         var error_code = error.code
    //         var error_message = error.message

    //         alert(error_message)
    //     })
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Get Firestore instance
            var firestore = firebase.firestore();

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                password: password,
                role: 'user',
                last_login: firebase.firestore.Timestamp.now()
            };

            // Add the user data to Firestore
            firestore.collection('users').doc(user.uid).set(user_data)
                .then(function () {
                    // User data added successfully
                    alert('User Created!!');

                    // Redirect to user.html
                    window.location.href = 'user.html';
                })
                .catch(function (error) {
                    // Error occurred while adding user data
                    alert('Error adding user data');
                    console.error('Error adding user data: ', error);
                });
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Empty!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Get Firestore instance
            var firestore = firebase.firestore();

            // Retrieve user data from Firestore
            firestore.collection('users').doc(user.uid).get()
                .then(function (doc) {
                    if (doc.exists) {
                        var user_data = doc.data();
                        var role = user_data.role; // Assuming role field exists in Firestore document

                        // Handle the retrieved user data
                        console.log('User data:', user_data);
                        alert('Logged In!!');

                        // Check user role and redirect accordingly
                        if (role === 'admin') {
                            // Redirect to admin.html
                            window.location.href = 'admin.html';
                        } else {
                            // Redirect to user.html
                            window.location.href = 'user.html';
                        }
                    } else {
                        // Document doesn't exist
                        alert('User document not found!');
                    }
                })
                .catch(function (error) {
                    // Error occurred while retrieving user data
                    alert('Error retrieving user data');
                    console.error('Error retrieving user data: ', error);
                });
        })
        .catch(function (error) {
            // Error occurred while signing in
            alert('Email or password do not exist');
            console.error('Email or password do not exist:', error);
        });

    // auth.signInWithEmailAndPassword(email, password)
    //     .then(function () {
    //         // Declare user variable
    //         var user = auth.currentUser

    //         // Add this user to Firebase Database
    //         var database_ref = database.ref()

    //         // Create User data
    //         var user_data = {
    //             last_login: Date.now()
    //         }

    //         // Push to Firebase Database
    //         database_ref.child('users/' + user.uid).update(user_data)

    //         // DOne
    //         alert('User Logged In!!')

    //     })
    //     .catch(function (error) {
    //         // Firebase will use this to alert of its errors
    //         var error_code = error.code
    //         var error_message = error.message

    //         alert(error_message)
    //     })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


function sentUid() {
    return user.uid;
}