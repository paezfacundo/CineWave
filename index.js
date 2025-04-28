const apiKey = '8883673d';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const loadingAnimation = document.getElementById('loadingAnimation');
let deferredPrompt;

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    showLoadingAnimation();
    searchMovies(searchTerm);
  }
});

function searchMovies(searchTerm) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  showLoadingAnimation();

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        setTimeout(() => {
          hideLoadingAnimation();
          displayMovies(data.Search);
        }, 2000);
      } else {
        hideLoadingAnimation(); 
        displayNoResults();
      }
    })
    .catch(error => {
      hideLoadingAnimation();
      console.log('An error occurred:', error);
      displayError();
    });
}



function displayMovies(movies) {
  searchResults.innerHTML = '';

  const watchlist = getWatchlistFromLocalStorage();

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie, watchlist);
    searchResults.appendChild(movieCard);
  });
}

function createMovieCard(movie, watchlist) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('card', 'mb-3');

  const imageSrc = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';

  const isInWatchlist = watchlist.some(item => item.imdbID === movie.imdbID);
  const buttonText = isInWatchlist ? 'Quitar de la Lista' : 'Agregar a Mi Lista';
  const buttonColor = isInWatchlist ? 'btn-danger' : 'btn-primary';

  movieCard.innerHTML = `
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${imageSrc}" class="card-img" alt="${movie.Title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year}</p>
          <a href="#" class="btn ${buttonColor} add-to-watchlist" data-imdbid="${movie.imdbID}">${buttonText}</a>
        </div>
      </div>
    </div>
  `;

  const addToWatchlistButton = movieCard.querySelector('.add-to-watchlist');
  addToWatchlistButton.addEventListener('click', () => {
    toggleWatchlist(movie, addToWatchlistButton);
  });

  return movieCard;
}

function toggleWatchlist(movie, button) {
  const watchlist = getWatchlistFromLocalStorage();
  const movieIndex = watchlist.findIndex(item => item.imdbID === movie.imdbID);

  if (movieIndex > -1) {
    watchlist.splice(movieIndex, 1);
    button.textContent = 'Agregar a Mi Lista';
    button.classList.remove('btn-danger');
    button.classList.add('btn-primary');
  } else {
    watchlist.push(movie);
    button.textContent = 'Quitar de la Lista';
    button.classList.remove('btn-primary');
    button.classList.add('btn-danger');
  }

  saveWatchlistToLocalStorage(watchlist);
}

function displayNoResults() {
  searchResults.innerHTML = '<p>No se encontraron resultados.</p>';
}

function displayError() {
  searchResults.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
}

function getWatchlistFromLocalStorage() {
  const watchlist = localStorage.getItem('watchlist');
  return watchlist ? JSON.parse(watchlist) : [];
}

function saveWatchlistToLocalStorage(watchlist) {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration.scope);
      })
      .catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

function showLoadingAnimation() {
  loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
  loadingAnimation.style.display = 'none';
}
