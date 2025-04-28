
if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      if (!navigator.onLine) {
        function showOfflineNotification() {
          if (document.querySelector(".offline-notification")) {
            return; 
          }

          var notificationElement = document.createElement("div");
          notificationElement.classList.add("offline-notification");
          notificationElement.textContent = "Estás desconectado. Verifica tu conexión a internet para acceder al contenido.";
          notificationElement.style.position = "fixed";
          notificationElement.style.top = "0";
          notificationElement.style.left = "0";
          notificationElement.style.width = "100%";
          notificationElement.style.backgroundColor = "#f44336";
          notificationElement.style.color = "#fff";
          notificationElement.style.padding = "10px";
          notificationElement.style.textAlign = "center";
          notificationElement.style.zIndex = "9999";

          document.body.appendChild(notificationElement);

          notificationElement.addEventListener("click", function () {
            document.body.removeChild(notificationElement);
          });
        }

        showOfflineNotification(); 

        window.addEventListener("online", function () {
          var offlineNotification = document.querySelector(".offline-notification");
          if (offlineNotification) {
            document.body.removeChild(offlineNotification);
          }
        });

        window.addEventListener("offline", showOfflineNotification);
      }
    }
  });
}

  