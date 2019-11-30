let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let dialog = document.getElementById('add-dialog');

let wishlistDB = db.collection('wishlist');

addBtn.addEventListener('click', function showDialog(){
    dialog.open = true;
});

cancelBtn.addEventListener('click', function hideDialog(){
    dialog.open = false;
});

saveBtn.addEventListener('click', function saveData(){
    // TODO: get data
    
    // save data to firebase db
    wishlistDB.doc('name').set({
        name: name,
        photo: photo,
        desc: description,
        price: price,
        category: cateogry
    })
    .then(function() {
        console.log('Document successfully written!');
    })
    .catch(function(error) {
        console.error('Error writing document: ', error);
    });
    dialog.open = false;
});
