let movies = [
    {title: "Star Wars", year: 1977, rating: "PG"},
    {title: "The Empire Strikes Back", year: 1980, rating: "PG"},
    {title: "Revenge of the Jedi", year: 1983, rating: "PG"}
];

let movieList = document.getElementById('movies');

let addBtn = document.getElementById('add');
let saveBtn = document.getElementById('save');
let cancelBtn = document.getElementById('cancel');

let dialog = document.getElementById('add-dialog');

let title = document.getElementById('title');
let year = document.getElementById('year');
let rating = document.getElementById('rating');

let editBtns = document.getElementsByClassName('edit');
let deleteBtns = document.getElementsByClassName('delete');

function renderMovies(){
    movieList.innerHTML = "";
    movies.forEach(function (movie) {
        let li = document.createElement('li');
        li.setAttribute("data-title", movie.title);
        li.setAttribute("data-year", movie.year);
        li.setAttribute("data-rating", movie.rating);
        li.innerHTML += `${movie.title} (${movie.year}) - Rated: ${movie.rating} 
            <button class="edit">Edit</button><button class="delete">Delete</button>`;
        movieList.appendChild(li);
    });
}

function initBtns(){
    for(let button of editBtns){
        button.addEventListener('click', function editMovie(){
            title.value = this.parentElement.getAttribute("data-title");
            year.value = this.parentElement.getAttribute("data-year");
            rating.value = this.parentElement.getAttribute("data-rating");
            dialog.setAttribute("data-edit", title.value);
            dialog.open = true;
        });
    }
    for(let button of deleteBtns){
        button.addEventListener('click', function deleteMovie(){
            for(i = 0; i < movies.length; i++){
                if(movies[i].title == this.parentElement.getAttribute("data-title")){
                    movies.splice(i, 1);
                }
            }
            movieList.removeChild(this.parentElement);
            dialog.open = false;
        });
    }
}   

addBtn.addEventListener('click', function showDialog(){
    title.value = "";
    year.value = "";
    rating.value = "G";
    dialog.open = true;
});

saveBtn.addEventListener('click', function saveMovie(){
    let edited = dialog.getAttribute("data-edit");
    if(edited != "none"){
        for(i = 0; i < movies.length; i++){
            if(movies[i].title == edited){
                movies[i] = {
                    title: DOMPurify.sanitize(title.value),
                    year: year.value,
                    rating: rating.value,
                };
            }
        }
    }
    else{
        movies.push({
            title: DOMPurify.sanitize(title.value),
            year: year.value,
            rating: rating.value
        });
    }
    renderMovies();
    initBtns();
    dialog.setAttribute("data-edit", "none");
    dialog.open = false;
});

cancelBtn.addEventListener('click', function (){
    dialog.open = false;
});

renderMovies();
initBtns();