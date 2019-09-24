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
  config: {
    minValue: 0,
    maxValue: 50000
  },
  container: {
    elem: document.querySelector('.price-range__context'),
    getCoords: function() {
      return getCoords(this.elem);
    }
  },
  // цветной блок, закрашивающий диапозон
  select: document.querySelector('.price-range__selected'),
  // ползунки
  thumb: {
    min:  document.querySelector('.price-range__handler_min'),
    max: document.querySelector('.price-range__handler_max')
  },
  //
  input: {
    min: document.querySelector('.price-range__input-min'),
    max: document.querySelector('.price-range__input-max')
  }
}

// величина, необходимая для конвертации координаты ползунков в число
var distance = range.config.maxValue - range.config.minValue;
var rangeWidth = range.container.elem.offsetWidth;

range.min = parseInt(getComputedStyle(range.select).left);
range.max = rangeWidth - parseInt(getComputedStyle(range.select).right);

range.thumb.min.onmousedown = function(e) {
  var coords = getCoords(range.select);
  var shiftX = e.pageX - coords.left;

  document.onmousemove = function(e) {
    var newLeft = e.pageX - shiftX - range.container.getCoords().left;

    // если вне слайдера
    if (newLeft < 0) {
        newLeft = 0;
    }

    if (newLeft > range.max) {
        newLeft = range.max;
    }

    range.min = newLeft;
    range.select.style.left = newLeft + 'px';

    var newValue = pixelsToValue(newLeft);
    range.input.min.value = newValue;
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  }

}

range.thumb.min.ondragstart = function () {
  return false;
}

range.input.min.onchange = function(e) {
  var newValue = e.target.value = e.target.valueAsNumber;
  var newLeft = valueToPixels(newValue);

  range.min = newLeft;
  range.select.style.left = newLeft + 'px';
}



range.thumb.max.onmousedown = function(e) {
  var coords = getCoords(range.select);
  var shiftX = e.pageX - coords.right;
  console.log('left: ' + coords.left);
  console.log('right: ' + coords.right);
  console.log('shiftX: ' + shiftX);

  document.onmousemove = function(e) {
    var newLeft = e.pageX - shiftX - range.container.getCoords().left;
    //если вне слайдера
    if (newLeft > rangeWidth) {
        newLeft = rangeWidth;
    }

    if (newLeft < range.min) {
        newLeft = range.min;
    }

    range.max = newLeft;
    range.select.style.right = rangeWidth - newLeft + 'px';

    var newValue = pixelsToValue(newLeft);
    range.input.max.value = newValue;
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  }

}

range.thumb.max.ondragstart = function () {
  return false;
}

range.input.max.onchange = function(e) {
  var newValue = e.target.value = e.target.valueAsNumber;
  var newLeft = valueToPixels(newValue);

  range.max = newLeft;
  range.select.style.right = rangeWidth - newLeft + 'px';
}




function pixelsToValue(pixels) {
  return Math.floor(distance * pixels / rangeWidth)
}

function valueToPixels(val) {
  return rangeWidth * val / distance;
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    left: box.left + pageXOffset,
    right: box.right + pageXOffset
  };
}

//  Ползунки <<
