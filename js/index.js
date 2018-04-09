"use strict";

(function() {
  var PRODUCT = 'product';
  var PRODUCT_WRAPPER = 'promo__products-wrapper';
  var PRODUCT_SELECTED = 'product--selected';
  var PRODUCT_SELECTED_HVR = 'product--selected-hover';
  var PRODUCT_DISABLED = 'product--disabled';
  var PRODUCT_ACTION = 'product__text--action';
  var PRODUCT_CONSIST = 'product__text--consist';

  var blockPromo = document.querySelector('.' + PRODUCT_WRAPPER);
  var blockProduct = document.querySelectorAll('.' + PRODUCT);

  if (blockPromo) {
    blockPromo.addEventListener("click", elementMouseClick);
    blockPromo.addEventListener("mouseover", elementMouseOver);
    blockPromo.addEventListener("mouseout", elementMouseOut);
  }

  function elementMouseClick(event) {
    var elem = event.target;

    if (!elem.classList.contains(PRODUCT_ACTION) && !elem.classList.contains(PRODUCT_CONSIST)) {
      var parentElem = findParentElement(elem, PRODUCT);

      if (parentElem && !parentElem.classList.contains(PRODUCT_DISABLED)) {
        parentElem.classList.toggle(PRODUCT_SELECTED);
        parentElem.classList.remove(PRODUCT_SELECTED_HVR);
      }
    }
  }

  function elementMouseOver(event) {
    var elem = event.target;

    if (!elem.classList.contains(PRODUCT_ACTION) && !elem.classList.contains(PRODUCT_CONSIST)) {
      var parentElem = findParentElement(elem, PRODUCT);

      if (parentElem && parentElem.classList.contains(PRODUCT_SELECTED)) {
        if (!parentElem.classList.contains(PRODUCT_SELECTED_HVR)) {
          parentElem.classList.add(PRODUCT_SELECTED_HVR);
        }
      }
    }
  }

  function elementMouseOut(event) {
    var elem = event.target;

    if (!elem.classList.contains(PRODUCT_ACTION) && !elem.classList.contains(PRODUCT_CONSIST)) {
      var parentElem = findParentElement(elem, PRODUCT);

      if (parentElem && parentElem.classList.contains(PRODUCT_SELECTED)) {
        if (parentElem.classList.contains(PRODUCT_SELECTED_HVR)) {
          parentElem.classList.remove(PRODUCT_SELECTED_HVR);
        }
      }
    }
  }

  function findParentElement(element, className) {
    while (element !== document.body) {
      if (element.classList.contains(className)) {
        return element;
      }
      element = element.parentNode;
    }

    return null;
  }
})();
