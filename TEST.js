//контейнер 
var sliderElem = document.getElementById('range'); 
// левый ползунок
var thumbMin = document.getElementById('thumb-min'); 
// правый ползунок
var thumbMax = document.getElementById('thumb-max');
//координаты контейнера
var sliderCoords = getCoords(sliderElem);
// ??? ширина элемента - ширина ползунка ???
var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;

// положение ползунка минимума
var min = parseInt(getComputedStyle(thumbMin).left);
// положение ползунка максимума
var max = parseInt(getComputedStyle(thumbMax).left);


//console.log(parseInt(min), parseInt(max));
//минимум - 18, максимум - 48

// при зажатии ползунка минимума
thumbMin.onmousedown = function(e) {
		// получаем координаты ползунка
    var thumbCoords = getCoords(thumbMin);
		// какой-то сдвиг?
    var shiftX = e.pageX - thumbCoords.left;

		// при одновременном свиге ползунка
    document.onmousemove = function(e) {
				
        var newLeft = e.pageX - shiftX - sliderCoords.left;

        //если вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }

        if (newLeft > max - thumbMin.offsetWidth / 2) {
            newLeft = max - thumbMin.offsetWidth / 2;
        }

        min = newLeft;
        thumbMin.style.left = newLeft + 'px';
    }

    document.onmouseup = function() {
//        console.log(getCoords(thumbMin));
//        console.log(min);
        document.onmousemove = document.onmouseup = null;
    }

    return false;
};

thumbMax.onmousedown = function(e) {
    var thumbCoords = getCoords(thumbMax);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function(e) {
        var newLeft = e.pageX - shiftX - sliderCoords.left;

        //если вне слайдера
        if (newLeft < min + thumbMin.offsetWidth / 2) {
            newLeft = min + thumbMin.offsetWidth / 2;
        }

        if (newLeft > rangeEnd) {
            newLeft = rangeEnd;
        }
        max = newLeft;

        thumbMax.style.left = newLeft + 'px';
    }

    document.onmouseup = function() {
        console.log(getCoords(thumbMax));
        console.log(max);
        document.onmousemove = document.onmouseup = null;
    }

    return false;
};

thumbMin.ondragstart = function() {
    return false;
};


////////////////////////

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}