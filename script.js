//parameters
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
//start game
startGame()
//when ever restart is clicked a function called startgame is called 
restartButton.addEventListener('click', startGame)
function startGame() {
  //when ever we starrt the game every previous data is removed
  circleTurn = false//we will start with x turn everytime oturn is set to be false
  //clear all
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    //evry time we a function is called, and by using this once we will be able to click a cell only once
    cell.addEventListener('click', handleClick, { once: true })
  })
//remove show class 
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}
//what happens when we click 
function handleClick(e) {
  //placemark
  const cell = e.target//the cell clicked 
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //returns the current class if it is circle turn circle class otherwise x class
  
  //calling a function to place mark
  placeMark(cell, currentClass)
  //afteer placing the mark we need to check things 
  //check if won
  if (checkWin(currentClass)) {
    endGame(false)
  }
  //check if draw 
  else if (isDraw()) {
    endGame(true)
  } else {
    // if not draw also swapturns is a function which changes turns
    swapTurns()
    //to see x and o at positions when hover
    setBoardHoverClass()
  }
}

//we can end game in two ways
function endGame(draw) {
  if (draw) {
    //display draw endgame is true 
    winningMessageTextElement.innerText = 'Draw!'
  } 
  else {
     //display ___ wins that is end game is false
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}
//defining placemark function
function placeMark(cell, currentClass) {
  //if it is X_CLASS currentclass will be x now our cell will have a class x 
  //cell.x draws x shape as defined in css
  //similar for CIRCLE_CLASS also
  cell.classList.add(currentClass)
}
//if circleturn is true it will change it to false means it will change it to x turn viceversa
function swapTurns() {
  circleTurn = !circleTurn
}
// hover x and o at positions
function setBoardHoverClass() {
   //remove exiasting classes
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  //in case of circleturn is true
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  }
   //in case of false 
   else {
    board.classList.add(X_CLASS)
  }
}
//check for winner
function checkWin(currentClass) {
  //this will loop over all combinations and return the combination with same class
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}