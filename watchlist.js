document.addEventListener('DOMContentLoaded', () => {
  const watchlistContainer = document.getElementById('watchlist');
  const watchlist = getWatchlistFromLocalStorage();

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = '<p>No hay películas en tu lista.</p>';
  } else {
    watchlist.forEach(movie => {
      const movieCard = createMovieCard(movie);
      watchlistContainer.appendChild(movieCard);
    });
  }
});

  
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('card', 'mb-3');
  
    const imageSrc = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
  
    movieCard.innerHTML = `
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${imageSrc}" class="card-img" alt="${movie.Title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">${movie.Year}</p>
            <a href="#" class="btn btn-danger remove-from-watchlist" data-imdbid="${movie.imdbID}">Quitar de la Lista</a>
          </div>
        </div>
      </div>
    `;
  
    const removeFromWatchlistButton = movieCard.querySelector('.remove-from-watchlist');
    removeFromWatchlistButton.addEventListener('click', () => {
      removeMovieFromWatchlist(movie, movieCard);
    });
  
    return movieCard;
  }
  
  function removeMovieFromWatchlist(movie, card) {
    const watchlist = getWatchlistFromLocalStorage();
    const movieIndex = watchlist.findIndex(item => item.imdbID === movie.imdbID);
  
    if (movieIndex > -1) {
      watchlist.splice(movieIndex, 1);
      saveWatchlistToLocalStorage(watchlist);
      card.remove();
  
      if (watchlist.length === 0) {
        const watchlistContainer = document.getElementById('watchlist');
        watchlistContainer.innerHTML = '<p>No hay películas en tu lista.</p>';
      }
    }
  }
  
  function getWatchlistFromLocalStorage() {
    const watchlist = localStorage.getItem('watchlist');
    return watchlist ? JSON.parse(watchlist) : [];
  }
  
  function saveWatchlistToLocalStorage(watchlist) {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
  

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