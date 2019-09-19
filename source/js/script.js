'use strict'

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
