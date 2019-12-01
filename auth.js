var firebaseConfig = {
    apiKey: "AIzaSyDe_eDj0z9y80MTW76tWB6elNpMcORcfLU",
    authDomain: "test-3b6ae.firebaseapp.com",
    databaseURL: "https://test-3b6ae.firebaseio.com",
    projectId: "test-3b6ae",
    storageBucket: "test-3b6ae.appspot.com",
    messagingSenderId: "843210156578",
    appId: "1:843210156578:web:447cdf3380f1ec1b1f387b",
    measurementId: "G-C7TWH6ENQH"
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

