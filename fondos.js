document.addEventListener("DOMContentLoaded", function(event) {
  var slides = document.getElementsByClassName("slide");
  var currentSlide = 0;

  function showSlide(slideIndex) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slides[slideIndex].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 5000);

  showSlide(currentSlide);
});
