let addBtn = document.getElementById('add');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let dialog = document.getElementById('add-dialog');

addBtn.addEventListener('click', function showDialog(){
    dialog.open = true;
});

cancelBtn.addEventListener('click', function hideDialog(){
    dialog.open = false;
});

saveBtn.addEventListener('click', function saveData(){
    // TODO : save data to firebase db
    dialog.open = false;
});
