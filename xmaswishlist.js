firebase.initializeApp({
    apiKey: "AIzaSyAR0tzJM0wkVPRKT8Ax34YJE_nQcbZkxA0",
    authDomain: "cse134bhw5-cc389.firebaseapp.com",
    databaseURL: "https://cse134bhw5-cc389.firebaseio.com",
    projectId: "cse134bhw5-cc389",
    storageBucket: "cse134bhw5-cc389.appspot.com",
    messagingSenderId: "491932596441",
    appId: "1:491932596441:web:17c370655e264224d566c8",
    measurementId: "G-8S6VFYHG3G"
  });
var db = firebase.firestore();
const currentUserID = firebase.auth().W;

let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let dialog = document.getElementById('add-dialog');

let form = document.getElementById('form');
let name = document.getElementById('name');
let photo = document.getElementById('item-pic');
let desc = document.getElementById('description');
let price = document.getElementById('price');
let category = document.getElementById('category');


function getWishlist() {
    let wishlist = db.collection(`users/${currentUserID}/wishlist`).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let item = doc.data();
            // load item into html 
        });
    });
    console.log(wishlist);
}

addBtn.addEventListener('click', function showDialog(){
    form.reset();
    dialog.open = true;
});

cancelBtn.addEventListener('click', function hideDialog(){
    form.reset();
    dialog.open = false;
});

saveBtn.addEventListener('click', function saveData(){
    // save data to firebase db
    db.collection(`users/${currentUserID}/wishlist`).doc(`${name.value}`).set({
        name: name.value,
        photo: photo.value,
        desc: desc.value,
        price: price.value,
        category: category.value
    })
    .then(function() {
        console.log('Document successfully written!');
    })
    .catch(function(error) {
        console.error('Error writing document: ', error);
    });
    dialog.open = false;
});

function deleteItem(itemName){
    db.collection(`users/${currentUserID}/wishlist`).doc(`${itemName}`).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    })
}

function editItem(){
    dialog.open = true;
}