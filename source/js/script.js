'use strict'

var modal = {
  map: document.querySelector('.modal__map'),
  writeUs: document.querySelector('.modal__write-us'),
  buying: document.querySelector('.modal__buying'),
  close: document.querySelectorAll('.modal__close')
}

var slider = {
  slides: document.querySelectorAll(".slides .slide"),
  indicators__list: document.querySelector(".sliders-indicators__list"),
  indicators: '',
  scrollLeft: document.querySelector(".slider__button-previous"),
  scrollRight: document.querySelector(".slider__button-next"),
  currentSlide: 0,
  playing: true
}

for (var i = 0; i < slider.slides.length; i++) {
  slider.indicators__list.innerHTML = slider.indicators__list.innerHTML + '<li><button type="button" name="slider-indicator" class="slider__indicator" data-slide-number="' + i + '"><span class="visually-hidden">Слайд ' + (i + 1) + '</span></button></li>';
}
slider.indicators = document.querySelectorAll(".sliders-indicators__list .slider__indicator");
slider.indicators[0].classList.add('slider__indicator_active');
for (var i = 0; i < slider.slides.length; i++) {
  slider.indicators[i].addEventListener('click', function() {
    goToSlide(Number(this.dataset.slideNumber));
    pauseSlideShow();
  });
}

slider.scrollLeft.addEventListener('click', function() {
  prevSlide();
  pauseSlideShow();
});
slider.scrollRight.addEventListener('click', function() {
  nextSlide();
  pauseSlideShow();
});

var startSlideShow = setInterval(nextSlide, 4000);

function goToSlide(n) {
  slider.slides[slider.currentSlide].className = 'slide';
  slider.indicators[slider.currentSlide].className = 'slider__indicator'
  slider.currentSlide = (n + slider.slides.length) % slider.slides.length;
  slider.slides[slider.currentSlide].classList.add('slide_visible');
  slider.indicators[slider.currentSlide].classList.add('slider__indicator_active');
}

function nextSlide() {
  goToSlide(slider.currentSlide + 1);
}

function prevSlide() {
  goToSlide(slider.currentSlide - 1);
}

function pauseSlideShow() {
  clearInterval(startSlideShow);
}


var buttons__buy = document.querySelectorAll('.button__buy');
var button__shopcart = document.querySelector('.button__shopcart');

var shopcart = {
  innerhtml: button__shopcart.innerHTML,
}
shopcart.template = shopcart.innerhtml.substr(0,  + shopcart.innerhtml.indexOf('Корзина: ') + 9),
shopcart.countItems = Number(shopcart.innerhtml.slice(shopcart.innerhtml.indexOf('Корзина: ') + 9));

function showWriteUsPopUp() {
  if (modal.writeUs) {
    modal.writeUs.classList.add('modal-show');
  }
}

function showMapPopUp() {
  if (modal.map) {
    modal.map.classList.add('modal-show');
  }
}

function hideAllPopups() {
  if (modal.map && modal.map.classList.contains('modal-show')) {
    modal.map.classList.remove('modal-show');
  }
  if (modal.writeUs && modal.writeUs.classList.contains('modal-show')) {
    modal.writeUs.classList.remove('modal-show');
  }
  if (modal.buying && modal.buying.classList.contains('modal-show')) {
    modal.buying.classList.remove('modal-show');
  }
}

function addItemInCart(event) {
  event.preventDefault();
  if (button__shopcart) {
    button__shopcart.innerHTML = shopcart.template + (shopcart.countItems + 1);
    if (shopcart.countItems + 1 > 0 ) {
      button__shopcart.classList.add('button__highlight_red');
    }
  }
  modal.buying.classList.add('modal-show');
  var str = button__shopcart.innerHTML;
  shopcart.countItems = Number(str.slice(str.indexOf('Корзина: ') + 9))
}

if (modal.buying && buttons__buy) {
  for (var i = 0; i < buttons__buy.length; i++) {
    buttons__buy[i].addEventListener('click', addItemInCart, false);
  }
}

if (modal.close) {
  for (var i = 0; i < modal.close.length; i++) {
    modal.close[i].addEventListener('click', hideAllPopups, false);
  }
}
