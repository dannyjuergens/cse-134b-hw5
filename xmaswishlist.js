const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var db = firebase.firestore();

let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let dialog = document.getElementById('add-dialog');

let name = document.getElementById('name');
let photo = document.getElementById('item-pic');
let desc = document.getElementById('description');
let price = document.getElementById('price');
let category = document.getElementById('category');

let wishlistDB = db.collection('wishlist');

addBtn.addEventListener('click', function showDialog(){
    dialog.open = true;
});

cancelBtn.addEventListener('click', function hideDialog(){
    dialog.open = false;
});

saveBtn.addEventListener('click', function saveData(){
    // save data to firebase db
    wishlistDB.doc('name').set({
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
