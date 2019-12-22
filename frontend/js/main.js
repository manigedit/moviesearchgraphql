$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<4;i++) {
    next=next.next();
    if (!next.length) {
      next=$(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var moviesWithLocation;
function getMovies(searchText){

const query = `
    query getMovies($searchTxt: String!) {
      movies(searchby: "title",like: $searchTxt) {
        title
        locations
      }
    }
  `
const variables = {
  searchTxt: String(searchText)
}



fetch('http://localhost:4000/api', {
        method: 'POST',
        json: true,
        encoding: 'utf8',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query, variables}),

      })
        .then(function(response){
          return response.json();
        })
        .then( function(data){
          console.log(data.data.movies);
          moviesWithLocation = data.data.movies;
          let output = '';
          if (moviesWithLocation.length < 1){
              output += `    <button type="button" class="btn btn-danger" href="#">OOPS No Results Found</button>    `;            
          }
          if (moviesWithLocation.length < 25){
          $.each(moviesWithLocation, (index, movie) =>{
            
            output += `    <button id="'${index}'"" onclick="movieSelected(${index})" type="button" class="btn btn-warning" href="#">${movie.title}</button>    `;

          });
        }
        if (moviesWithLocation.length > 24) {
          output += `    <button type="button" class="btn btn-danger" href="#">Too many results Please try a detailed search</button>    `; 
        }
          


          $('#moviebuttons').html(output);

        });
}

function movieSelected(index){
  let output = '';
  var places = moviesWithLocation[index].locations;
  $.each(places, (index, place) =>{
    output += `<li class="list-group-item">${place}</li>`
  });

  $('#locationslist').html(output);



  console.log("Clicked movies has");
  console.log(moviesWithLocation[index].locations)
}

