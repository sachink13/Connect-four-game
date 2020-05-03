//Grab player 1 details
var player1 = prompt('Player one: Enter your name(you will be blue):');
var player1colour = 'rgb(86, 151, 255)';

//Grab player 2 details
var player2 = prompt('Player one: Enter your name(you will be red):');
var player2colour = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

//Only for debugging(to check who has won at which move)
function reportWin(rowNum,colNum) {
  console.log('You won starting at this row,col');
  console.log(rowNum);
  console.log(colNum);
}

//To change the colour of the given table cell
function changeColour(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

//To check the colour of the given table cell
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//To check the bottom-most cell in that particular coloumn
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var i = 5; i > -1 ; i--) {
    colorReport = returnColor(i,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return i;
    }
  }
}

//To match colour
function colorMatchCheck(one,two,three,four) {
  return (one === two  &&  one === three  &&  one === four  &&  one !== 'rgb(128, 128, 128)'  &&  one !== undefined)
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//Game logic

//Start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1colour;

$('h3').text(player1+' it is your turn, pick a coloumn to drop into!')


$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColour(bottomAvail,col,currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName+" has won! Refresh page to start game again!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1 ;
  console.log(currentPlayer);
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+' it is your turn');
    currentColor = player1colour;
  }else{
    currentName = player2;
    $('h3').text(currentName+' it is your turn');
    currentColor = player2colour;
  }
})
