'use strict'

//  >> Слайдер

var slider = {
  slides: document.querySelectorAll(".slides .slide"),
  indicators__list: document.querySelector(".sliders-indicators__list"),
  indicators: '',
  scrollLeft: document.querySelector(".slider__button-previous"),
  scrollRight: document.querySelector(".slider__button-next"),
  currentSlide: 0,
  playing: true
}

if (slider.slides.length) {
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
}

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

//  Слайдер << 

///////////////////////////

//  >> Модалки 

var modal = {
  map: document.querySelector('.modal__map'),
  writeUs: document.querySelector('.modal__write-us'),
  buying: document.querySelector('.modal__buying'),
  close: document.querySelectorAll('.modal__close')
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

//  Модалки << 

////////////////////////////////////////

//  >> Ползунки

var range = {
  minValue: 0,
  maxValue: 50000,
  container: {
    elem: document.querySelector('.price-range__context'),
    getCoords: function() {
      return getCoords(this.elem);
    }
  },
  select: document.querySelector('.price-range__selected'),
  thumb: {
    min:  document.querySelector('.price-range__handler_min'),
    max: document.querySelector('.price-range__handler_max')
  },
  input: {
    min: document.querySelector('.price-range__input-min'),
    max: document.querySelector('.price-range__input-max')
  },
  min: function() {
    return parseInt(getComputedStyle(this.select).left) 
  },
  max: function() {
    return parseInt(getComputedStyle(this.select).right) 
  },
}

var distance = range.maxValue - range.minValue;
var rangeWidth = range.container.elem.offsetWidth;

range.thumb.min.onmousedown = function(e) {
  var coords = getCoords(range.thumb.min);
  var shiftX = e.pageX - coords.left;
  
  document.onmousemove = function(e) {
    var newLeft = e.pageX - shiftX - range.container.getCoords().left;
    
    //если вне слайдера
    if (newLeft < 0) {
        newLeft = 0;
    }

    if (newLeft > range.max() - range.thumb.min.offsetWidth / 2) {
        newLeft = range.max() - range.thumb.min.offsetWidth / 2;
    }

    range.min = newLeft;
    range.select.style.left = newLeft + 'px';
    
    range.input.min.value = Math.floor(distance * newLeft / rangeWidth);
  }
  
  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  }
  
}

range.input.min.onchange = function(e) {
  console.log(e.defaultValue);
  if (e.target.value > range.maxValue || e.target.value < range.minValue) {
    e.preventDefault();
//    console.log('Недопустимое значение!')
  }
  var newValue = parseInt(e.target.value, 10);
  console.log(newValue);
}

range.thumb.min.ondragstart = function () {
  return false;
}

range.thumb.max.ondragstart = function () {
  return false;
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

//  Ползунки <<