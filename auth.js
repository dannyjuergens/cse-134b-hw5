const firebaseConfig = {
    apiKey: "AIzaSyAR0tzJM0wkVPRKT8Ax34YJE_nQcbZkxA0",
    authDomain: "cse134bhw5-cc389.firebaseapp.com",
    databaseURL: "https://cse134bhw5-cc389.firebaseio.com",
    projectId: "cse134bhw5-cc389",
    storageBucket: "cse134bhw5-cc389.appspot.com",
    messagingSenderId: "491932596441",
    appId: "1:491932596441:web:17c370655e264224d566c8",
    measurementId: "G-8S6VFYHG3G"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const email = document.getElementById('email');
const password = document.getElementById('password');
const loginEmail = document.getElementById('loginEmail');
const loginpass = document.getElementById('loginPass');
const confirmPass = document.getElementById('confirmPass');
const signUpBtn = document.getElementById('signUpBtn');
const loginBtn = document.getElementById('loginBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userName = document.getElementById('username');

//Log in
loginBtn.addEventListener('click', e => {
    const Email = loginEmail.value;
    const Password = loginpass.value;
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(Email, Password)
        .then(function () {
            window.location.href = "xmaswishlist.html";
        })
        .catch(
            e => alert(e.message)
        );
});

//Sign Up
signUpBtn.addEventListener('click', e => {
    const Email = email.value;
    const Password = password.value;

    //checks to see if passwords match
    if (confirmPass.value != password.value) {
        alert("Passwords do not match. Try again")
    }

    //passwords do match
    else {
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(Email, Password)
            .then(function () {
                window.location.href = "xmaswishlist.html";
            })
            .catch(
                e => alert(e.message)
            );
    }
});

