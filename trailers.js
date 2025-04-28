window.onYouTubeIframeAPIReady = function() {
    const trailersContainer = document.getElementById('trailersContainer');
    const videoIds = [
        'JoWdhvrkKjo',
        'I9sn1CdPyvo',
        'XuDwndGaCFo',
        'Dg0KNwCXdd0',
        'RMINHy1KwCY',
        'KQp1ZGGHKAE',
        'avz06PDqDbM',
        'Y274jZs5s7s',
        'nnCZ4dfrxpo',
    ];
  
    videoIds.forEach(function(videoId) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('col-md-4', 'mt-3');
  
      const videoElement = document.createElement('div');
      videoElement.id = 'player-' + videoId; 
  
      videoWrapper.appendChild(videoElement);
      trailersContainer.appendChild(videoWrapper);
  
      // Crea el reproductor de YouTube
      new YT.Player('player-' + videoId, {
        videoId: videoId,
        width: '100%',
        height: '315',
        playerVars: {
          autoplay: 0,
        },
      });
    });
  };
  
  function loadYouTubeIframeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  loadYouTubeIframeAPI();


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