function solveWires(wires) {
  var wiresLength = wires.length;
  switch (wiresLength) {

    // 3 wires
    case 3:

      // If there are no red wires, cut the second wire.
      if (wires.indexOf('red') == -1){
        return 'Cut the second wire!';
      }

      // If the last wire is white, cut the last wire.
      else if (wires[wiresLength-1] == 'white'){
        return 'Cut the last wire!';
      }

      // if there is more than one blue wire, cut the last blue wire.
      else if (checkForDuplicateValues(wires).length > 0 &&
               checkForDuplicateValues(wires).indexOf('blue') > -1){
        return 'Cut the last blue wire!';
      }

      // Otherwise...
      else {
        return "Cut the last wire!";
      }

      break;

    // 4 wires
    case 4:

      // If there is more than one red wire and the last digit of the serial number is odd, cut the last red wire.
      if (checkForDuplicateValues(wires).length > 0 &&
          checkForDuplicateValues(wires).indexOf('red') > -1 &&
          globalData.serial_odd == true){
        return 'Cut the last red wire!';
      }

      // If the last wire is yellow and there are no red wires, cut the first wire.
      else if (wires[wiresLength-1] == 'yellow' &&
               wires.indexOf('red') == -1) {
        return 'Cut the first wire!';
      }

      // If there is exactly one blue wire, cut the first wire.
      else if (wires.indexOf('blue') > -1 &&
               checkForDuplicateValues(wires).indexOf('blue')) {
        return 'Cut the first wire!';
      }

      // If there is more than one yellow wire, cut the last wire.
      else if (checkForDuplicateValues(wires).indexOf('yellow') > -1) {
        return 'Cut the last wire!';
      }

      // Otherwise...
      else {
        return 'Cut the second wire!';
      }

      break;

    // 5 wires
    case 5:

      // If the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
      if (wires[wiresLength-1] == 'black' &&
          globalData.serial_odd == true) {
        return 'Cut the fourth wire!';
      }

      // If there is exactly one red wire and there is more than one yellow wire, cut the first wire.
      else if (wires.indexOf('red') > -1 &&
          checkForDuplicateValues(wires).indexOf('red') &&
          checkForDuplicateValues(wires).indexOf('yellow') > -1) {
        return 'Cut the first wire!';
      }

      // If there are no black wires, cut the second wire.
      else if (wires.indexOf('black') == -1) {
        return 'Cut the second wire!';
      }

      // Otherwise...

      else {
        return 'Cut the first wire!';
      }

      break;

    // 6 wires
    case 6:

      // If there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
      if (wires.indexOf('yellow') == -1 &&
          globalData.serial_odd == true) {
        return 'Cut the third wire!';
      }

      // If there is exactly one yellow wire and there is more than one white wire, cut the fourth wire.
      else if (wires.indexOf('yellow') > -1 &&
          checkForDuplicateValues(wires).indexOf('yellow') == -1 &&
          checkForDuplicateValues(wires).indexOf('white') > -1) {
        return 'Cut the fourth wire!';
      }

      // If there are no red wires, cut the last wire.
      if (wires.indexOf('red') == -1){
        return 'Cut the last wire!';
      }

      // Otherwise...
      else {
        return 'Cut the fourth wire!';
      }

      break;
  }
}

function getWires() {
  var wires = [];
  $('.js-mod-wire-container .js-mod-wire').each(function(){
    var currentColor = $(this).children('.js-mod-wire-indicator').attr('js-color-selected');
    if (currentColor) {
      wires.push(currentColor);
    }
  });

  $('.js-wires-number').text(wires.length);
  return wires;
}

function selectWireColor(el) {
  var currentColor = $(el).attr('js-color');
  $(el).parents('.js-mod-wire').children('.js-mod-wire-indicator').attr('js-color-selected', currentColor);
  $(el).parents('.js-mod-wire').attr('js-color-selected', currentColor);

  $(el).siblings().removeClass('js-color-active');
  $(el).addClass('js-color-active');
}

function clearWires() {
  $('.js-mod-wire-container .js-mod-wire').removeAttr('js-color-selected');
  $('.js-mod-wire-container .js-mod-wire-indicator').removeAttr('js-color-selected');
  $('.js-mod-wire-container .js-mod-wire-color-selector').removeClass('js-color-active');
  $('.js-mod-wires-tips').text('');
  getWires();
}

$('.js-mod-wire-color-selector').click(function(){
  selectWireColor(this);
  setTip( solveWires( getWires() ), '.js-mod-wires-tips' );
})
