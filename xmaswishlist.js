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

var db;
let currentUserID;
var storageRef = firebase.storage().ref();

/**
 * @desc
    * Load the current user's wishlist
    * Also creates a reference to the database
    * If no user is signed in, they get redirected to home   
 */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //set up db and get current user
        db = firebase.firestore();
        currentUserID = (user.uid);

        storageRef = firebase.storage().ref();
        db.collection(`users/${currentUserID}/wishlist`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let item = doc.data();
                name.value = item.name;
                //photo.value = item.photo;
                desc.value = item.desc;
                price.value = item.price;
                category.value = item.category;
                index = item.imageIndex;

                //starts putting the info on the screen
                let ref = createListing();
                putInHTML(ref);
                putImageInHTML(ref)
            });
        });
    }

    else {
        console.log("User is not signed in")
        window.location.href = "home.html";
    }

})

let wishList = document.getElementById('wishlist');

let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let signOutBtn = document.getElementById('signOut');
let dialog = document.getElementById('add-dialog');

let form = document.getElementById('item-form');
let name = document.getElementById('name');
let photo = document.getElementById('item-pic');
let desc = document.getElementById('description');
let price = document.getElementById('price');
let category = document.getElementById('category');

let editBtn = document.getElementsByClassName('edit');
let deleteBtn = document.getElementsByClassName('delete');


let itemToEdit = null;

//This variable is how we reference image/data after a user makes an edit
let index;

addBtn.addEventListener('click', function showDialog() {
    name.value = '';
    desc.value = '';
    price.value = '';
    category.value = '';
    itemToEdit = null;
    dialog.open = true;
});


/**
 * @desc - Hides the dialog form whenever the user hits a cancel button
 */
cancelBtn.addEventListener('click', function hideDialog() {
    dialog.open = false;
});

/**
 * @desc - This method handles saving data when the user hits a save button
 */
saveBtn.addEventListener('click', function saveData() {

    //when user is saving their edit //Also updates database
    if (itemToEdit != null) {
        editFirestore();
    }
    //when user is saving their new item
    else {
        index = null;
        // save data to firebase db
        db.collection(`users/${currentUserID}/wishlist`).doc(`${name.value}`).set({
            name: name.value,
            photo: photo.files[0].name,
            desc: desc.value,
            price: price.value,
            category: category.value,
            imageIndex: name.value
        })
            .then(function () {
                console.log('Document successfully written!');
                let ref = createListing()
                putInHTML(ref);
                storageRef.child(`${currentUserID}/${index}`).put(photo.files[0]).then(function (snapshot) {
                    console.log('Uploaded a blob or file!');
                    putImageInHTML(ref)
                });

            })
            .catch(function (error) {
                console.error('Error writing document: ', error);
            });

        itemToEdit = null;
    }

    dialog.open = false;
});

//method to edit the listing on the database  
function editFirestore() {
    db.collection(`users/${currentUserID}/wishlist`).doc(`${index}`).update({
        name: name.value,
        photo: photo.files[0].name,
        desc: desc.value,
        price: price.value,
        category: category.value,
    })
        .then(function () {
            console.log('Document successfully written!');
            putInHTML(itemToEdit);
        
            storageRef.child(`${currentUserID}/${index}`).put(photo.files[0]).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                putImageInHTML(itemToEdit);
        itemToEdit = null;
            })
                .catch(function (error) {
                    console.error('Error writing document: ', error);
                });
        });
}

//added param item to be able to delete the html item only when the promise is successful
function deleteItem(itemName, item) {

    //deleting from database
    db.collection(`users/${currentUserID}/wishlist`).doc(`${itemName}`).delete()
        .then(function () {
            console.log("Document successfully deleted!");

            //deleting from HTML
            wishList.removeChild(item.parentElement)

            //deleting from storage
            var deleteImg = storageRef.child(`${currentUserID}/${index}`)
            deleteImg.delete().then(function () {
                console.log("Success")
            })

        }).catch(function (error) {
            console.error("Error removing document: ", error);
        })
}

/**
 * @desc - opens the dialog form when user presses the edit button
 */
function editItem() {
    dialog.open = true;
}

/**
 * @desc - creates a li element whose data attributes contain the item's info
 */
function createListing() {
    let li = document.createElement('li');
    li.setAttribute("data-name", name.value);
    li.setAttribute("data-photo", photo.value);
    li.setAttribute("data-desc", desc.value);
    li.setAttribute("data-price", price.value);
    li.setAttribute("data-category", category.value);

    //initialies data-index if not set before 
    if (index == null) {
        li.setAttribute("data-index", name.value);
        index = name.value;
    }
    //keeps the original data-index

    else {
        li.setAttribute("data-index", index);
    }
  
    return (li);
}

/**
 * @desc
    * This function puts in the texts fields for the user's item
    * 
    * I made this a separate function so the user will see something happen once
    * they click save rather than seeing a blank screen and wondering if something 
    * went wrong
    * 
    * Also I put a place holder blank image so it doesn't load weird
 * @param item - takes in the element containing the item's info 
 */
function putInHTML(item) {
    console.log("entered")
    item.innerHTML = `${name.value} ${desc.value} ${category.value} : $${price.value} 
            <button class="edit" onclick="editFun(this)">Edit</button><button class="delete" onclick="deleteFun(this)">Delete</button>`;
    wishList.appendChild(item);
    item.insertAdjacentHTML("afterbegin", `<img id="placeholder" width=100px height = 100px>`)

}

/**
 * @desc
    * This function puts in the image the user uploaded inside the HTML
    * 
    * I made this a separate function so the user will see something happen once
    * they click save rather than seeing a blank screen and wondering if something 
    *  went wrong
 * @param item - takes in the element containing the item's info 
 */
function putImageInHTML(item) {
    let photoRef = storageRef.child(`${currentUserID}/${index}`).getDownloadURL().then(function (url) {
        
        //removes the placeholder image
        var placeholder = document.getElementById("placeholder")
        placeholder.remove();

        //insert the image the user uploaded
        item.insertAdjacentHTML("afterbegin", `<img src=${url} width=100px height = 100px>`)
    }).catch();
}


/**
 * @desc 
    * Updates the info of the item. 
    * Also sets itemToEdit to the element so the save method knows that its for edit 
 *
 * @param {} item - takes in the element containing the item's info 
 */
function editFun(item) {

    name.value = item.parentElement.getAttribute("data-name");
    photo.value = item.parentElement.getAttribute("data-photo");
    desc.value = item.parentElement.getAttribute("data-desc");
    price.value = item.parentElement.getAttribute("data-price");
    category.value = item.parentElement.getAttribute("data-category");
    index = item.parentElement.getAttribute("data-index");

    dialog.open = true;
    itemToEdit = item.parentElement;
}

/**
 * @desc - helper method to delete the item from the html and database
 * 
 * @param {@} item -takes in the element containing the item's info 
 */
function deleteFun(item) {
    let itemName = item.parentElement.getAttribute("data-index");
    console.log(itemName)
    deleteItem(itemName, item);
}

/**
 * @desc - Signs out the user from the website and redirects them to Home
 */
signOutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Signed Out');
        window.location.href = "home.html";
    }, function (error) {
        console.error('Sign Out Error', error);
    });
})


