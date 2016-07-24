// This is the line of words that the app is editing.
line = 'The quick brown fox jumped over the lazy dogs.'.split(' ');

function checkElements(parts){
  if (parts.length < 2) {
    setError('usage: <tt>' + parts[0] + ' WORD</tt>');
    return;
  }
}
function doPrepend(parts) {
  checkElements(parts)
  var word = parts[1];
  
  line.splice(0, 0, word);
}

function doAppend(parts) {
  checkElements(parts)
  var word = parts[1];
  
  line.push(word);
}
function doInsert(parts){
  checkElements(parts)
  var indexNumber = Number(parts[3])
  if(parts[2] === 'before'){
    line.splice(indexNumber - 1 , 0, parts[1])
  } else if (parts[2] === 'after'){
    line.splice(indexNumber, 0, parts[1])
  }
}

function doReplace(parts){
  
}
function doSwap(parts){
  
}
function doDelete(parts){
  
}
function doReverse(parts){
  
}
function doPigLatin(parts){
  
}

/**
 * This function is called when the user submits a command.
 * 
 * The argument is a string containing the command.
 */
function execute(command) {
  // Split the command into parts (words). Filter out any empty words.
  var parts = command.split(' ').filter(function (s) { return s.length > 0; });
  
  // Interpret the first word, which is the command.
  switch (parts[0]) {
    case 'insert': doInsert(parts); break;
    case 'prepend': doPrepend(parts); break;
    case 'append': doAppend(parts); break;
    case 'replace': doReplace(parts); break;
    case 'swap': doSwap(parts); break;
    case 'delete': doDelete(parts); break;
    case 'reverse': doReverse(parts); break;
    case 'pigLatin': doPigLatin(parts); break;

    default: 
      // Unknown command, so show an error message.
      setError('unknown command: ' + parts[0]); break;
  }
}

//-----------------------------------------------------------------------------------------------

$('#command').keyup(function (event) {
  var ENTER = 13;
  if (event.keyCode === ENTER) $('#execute').click();
});

$(document).on("click", "#execute",function () {
  var command = $('#command').val();
  if (command) {
    clearError();
    execute(command);
    updateLine();
    // Clear the command.
    $('#command').val('');
  }
});

function updateLine() {
  var lineDiv = $('#line');
  lineDiv.empty();
  for (var i = 0; i < line.length; ++i) {
    var word = line[i];
    var html = '<div class="element"><div class="word">' + word + '</div>' + 
      '<div class="position">' + (i + 1) + '</div></div>';
    lineDiv.append(html);
  }
}

function setError(error) {
  $('#error').html(error).show();
}

function clearError() {
  $('#error').hide();
}

$(function () {
  clearError();
  updateLine();
});

