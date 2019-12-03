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

let wishList = document.getElementById('wishlist');

let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let signOutBtn = document.getElementById('signOut');
let dialog = document.getElementById('add-dialog');

let form = document.getElementById('form');
let name = document.getElementById('name');
let photo = document.getElementById('item-pic');
let desc = document.getElementById('description');
let price = document.getElementById('price');
let category = document.getElementById('category');

let editBtn = document.getElementsByClassName('edit');
let deleteBtn = document.getElementsByClassName('delete');

let itemToEdit = null;
let itemToEditName = null;

window.onload = function getWishlist() {
    console.log(currentUserID)
    let wishlist = db.collection(`users/${currentUserID}/wishlist`).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let item = doc.data();
            // load item into html 
            name.value = item.name;
            photo.value = item.photo;
            desc.value = item.desc;
            price.value = item.price;
            category.value = item.category;
            createListing();
            btnLogic();
            form.reset()
        });

    });

}


addBtn.addEventListener('click', function showDialog() {
    form.reset();
    dialog.open = true;
});


cancelBtn.addEventListener('click', function hideDialog() {
    form.reset();
    dialog.open = false;
});

saveBtn.addEventListener('click', function saveData() {
    //when user is saving their edit //Also updates database
    if (itemToEdit != null) {
        doEdit(itemToEdit);
        btnLogic();
        editFirestore();
    }
    //when user is saving their new item
    else {
        // save data to firebase db
        db.collection(`users/${currentUserID}/wishlist`).doc(`${name.value}`).set({
            name: name.value,
            photo: photo.value,
            desc: desc.value,
            price: price.value,
            category: category.value
        })
            .then(function () {
                console.log('Document successfully written!');
                createListing();
                btnLogic();
            })
            .catch(function (error) {
                console.error('Error writing document: ', error);
            });
    }
    itemToEdit = null;
    dialog.open = false;
});
//method to edit the listing on the database  
function editFirestore() {
    db.collection(`users/${currentUserID}/wishlist`).doc(`${itemToEditName}`).update({
        name: name.value,
        photo: photo.value,
        desc: desc.value,
        price: price.value,
        category: category.value
    })
        .then(function () {
            console.log('Document successfully written!');
        })
        .catch(function (error) {
            console.error('Error writing document: ', error);
        });
}
//added param item to be able to delete the html item only when the promise is successful
function deleteItem(itemName, item) {
    db.collection(`users/${currentUserID}/wishlist`).doc(`${itemName}`).delete()
        .then(function () {
            console.log("Document successfully deleted!");
            wishList.removeChild(item.parentElement)

        }).catch(function (error) {
            console.error("Error removing document: ", error);
        })
}

function editItem() {
    dialog.open = true;
}
//creates item when user clicks the add button
function createListing() {
    let li = document.createElement('li');
    li.setAttribute("data-name", name.value);
    li.setAttribute("data-photo", photo.value);
    li.setAttribute("data-desc", desc.value);
    li.setAttribute("data-price", price.value);
    li.setAttribute("data-category", category.value);
    li.innerHTML += `${name.value} ${desc.value} ${category.value} : $${price.value} 
        <button class="edit">Edit</button><button class="delete">Delete</button>`;
    wishList.appendChild(li);
}

//preforms the edit changes on the html
function doEdit(item) {
    item.innerHTML = `${name.value} ${desc.value} ${category.value} : $${price.value} 
        <button class="edit">Edit</button><button class="delete">Delete</button>`;
}
//adds the logic to the buttons
function btnLogic() {
    for (let button of editBtn) {
        button.addEventListener('click', editFun);
    }
    for (let button of deleteBtn) {
        button.addEventListener('click', deleteFun);
    }

}

//edit logic
function editFun() {
    name.value = this.parentElement.getAttribute("data-name");
    photo.value = this.parentElement.getAttribute("data-photo");
    desc.value = this.parentElement.getAttribute("data-desc");
    price.value = this.parentElement.getAttribute("data-price");
    category.value = this.parentElement.getAttribute("data-category");
    dialog.open = true;
    itemToEdit = this.parentElement;
    itemToEditName = this.parentElement.getAttribute("data-name");
}

//delete logic
function deleteFun() {
    let itemName = this.parentElement.getAttribute("data-name");
    deleteItem(itemName, this);
}

signOutBtn.addEventListener('click', ()=>{
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.href = "home.html";
      }, function(error) {
        console.error('Sign Out Error', error);
      });
})


