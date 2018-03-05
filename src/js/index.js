'use strict';

(function () {
  var PRODUCT_CLS = 'product';
  var PRODUCT_SELECTED_CLS = 'product--selected';
  var PRODUCT_SELECTED_HVR_CLS = 'product--selected-hover';
  var PRODUCT_DISABLED_CLS = 'product--disabled';
  var PRODUCT_ACTION_CLS = 'product__action';
  var PRODUCT_DESC_CLS = 'product__desc';
  var PRODUCT_DESC_TEXT = 'Котэ не одобряет?';
  var PRODUCT_DISABLED_TEXT = 'Печалька, с курой закончился.';

  var blockPromo = document.querySelector('.promo__products-wrapper');
  var blockProduct = document.querySelectorAll('.' + PRODUCT_CLS);

  for (var i = 0; i < blockProduct.length; i++) {
    if (blockProduct[i].classList.contains(PRODUCT_DISABLED_CLS)) {
      blockProduct[i].querySelector('.' + PRODUCT_ACTION_CLS).textContent = PRODUCT_DISABLED_TEXT;
    }
  }

  if (blockPromo) {
    blockPromo.addEventListener('click', elementSelect, false);
    blockPromo.addEventListener('mouseover', elementMouseOver, false);
    blockPromo.addEventListener('mouseout', elementMouseOut, false);
  }

  function elementSelect(event) {
    var elem = event.target;

    if (elem !== this && !elem.classList.contains(PRODUCT_ACTION_CLS)) {
      event.preventDefault();

      var parentElem = findParentElement(elem, PRODUCT_CLS);

      if (parentElem && !parentElem.classList.contains(PRODUCT_DISABLED_CLS)) {
        var elemProductAction = parentElem.querySelector('.' + PRODUCT_ACTION_CLS);
        var elemProductDesc = parentElem.querySelector('.' + PRODUCT_DESC_CLS);
        var content = elemProductAction.innerHTML;
        console.log(elem);
        console.log(parentElem);


        elemProductAction.innerHTML = elemProductAction.dataset.text;
        elemProductAction.dataset.text = content;
        parentElem.classList.toggle(PRODUCT_SELECTED_CLS);

        if (elemProductDesc.dataset.text) {
          elemProductDesc.textContent = elemProductDesc.dataset.text;
        }

        elemProductDesc.dataset.text = elemProductDesc.textContent;

        if (parentElem.classList.contains(PRODUCT_SELECTED_HVR_CLS)) {
          parentElem.classList.remove(PRODUCT_SELECTED_HVR_CLS);
        }
      }
    }
  }

  function elementMouseOver(event) {
    var elem = event.target;

    if (elem !== this && !elem.classList.contains(PRODUCT_ACTION_CLS)) {
      var parentElem = findParentElement(elem, PRODUCT_CLS);

      if (parentElem && parentElem.classList.contains(PRODUCT_SELECTED_CLS)) {
        var elemProductDesc = parentElem.querySelector('.' + PRODUCT_DESC_CLS);

        elemProductDesc.textContent = PRODUCT_DESC_TEXT;

        if (!parentElem.classList.contains(PRODUCT_SELECTED_HVR_CLS))  {
          parentElem.classList.add(PRODUCT_SELECTED_HVR_CLS);
        }
      }
    }
  }

  function elementMouseOut(event) {
    var elem = event.target;

    if (elem !== this && !elem.classList.contains(PRODUCT_ACTION_CLS)) {
      var parentElem = findParentElement(elem, PRODUCT_CLS);

      if (parentElem && parentElem.classList.contains(PRODUCT_SELECTED_CLS)) {
        var elemProductDesc = parentElem.querySelector('.' + PRODUCT_DESC_CLS);

        elemProductDesc.textContent = elemProductDesc.dataset.text;

        if (parentElem.classList.contains(PRODUCT_SELECTED_HVR_CLS)) {
          parentElem.classList.remove(PRODUCT_SELECTED_HVR_CLS);
        }
      }
    }
  }

  function findParentElement(element, parentClass) {
    var parentElem = element.parentNode;

    if (element.classList.contains(parentClass)) {
      return element;
    } else {
      while (!parentElem.classList.contains(parentClass)) {
        parentElem = parentElem.parentNode;
      }
      return parentElem;
    }
  }
})();
