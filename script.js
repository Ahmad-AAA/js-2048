// declare the game board
let currentBoard;

// function prints given board on screen
function printBoard(board) {
  // loop throughthe values on the board
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
			// get the corresponding cell
			const cell = document.querySelector(`#\\3${x + 1}-${y + 1}`);
      // get the corresponding cell's inner p element
      const cellText = document.querySelector(`#\\3${x + 1}-${y + 1} p`);
			
      // change the text of the p element
      cellText.textContent = board[x][y];
			
			// change the cell's class to contain its content
			cell.setAttribute('class', `cell V${board[x][y]}`)
    }
  }
}

// function adds a 2 or a 4 in a random empty spot on the given board
function addRandom(board) {
  // set the number of empty spots to zero
  let emptySpots = [];
	
  // loop through the board and get all empty spots
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === ' ') {
        emptySpots.push(`${x}${y}`);
      }
    }
  }
	
  // if there are empty spots on the board
  if (emptySpots.length) {
    // select a random spot from the list
    const selectedSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
		
		// add a 2 90% of the time and a 4 10% of the time
		const addedNum = (Math.random() < 0.9) ? '2' : '4';
		board[selectedSpot[0]][selectedSpot[1]] = addedNum;
    
    // return 0 for success
      return 0;
  } else
    // return 1 for falure
    return 1;
}

// function pushes items near the beginning of the array and merges items of similar values while maintaining array length by adding space character near the end if needed (can be reversed)
function pushItems(array, reverse=false) {
  // set the number of deleted items to 0
  let deletedItems = 0;
	
	// turn all array elements into strings
	for (let i = 0; i < array.length; i++) {
		array[i] = String(array[i]);
	}
  

	if (reverse === false) {	// default non-reversed mode
  	// go through every value in the array
		for (let i = 0; i < array.length; i++) {
			// if the value is a space character
			if (array[i] === ' ') {
				// remove the value and add one to deleted items, then continue to the next iteraion
				array.splice(i, 1);
				deletedItems++;
				i--
				continue;
			}

			// if current value isn't the first in the array
			if (!(i === 0)) {
				// if the current value is equal to the previous value
				if (array[i] === array[i - 1]) {
					// double the previous value and delete the current one
					array[i - 1] = array[i - 1] * 2;  // note: The items of the array begin as strings and turn into integers if they go through this modification. this has been utalized to stop an item from being merged twice since turning into an integer makes it no longer equal to any other item even if it had a similar value. The items are turned back into strings at the end.
					array.splice(i, 1);
					// add 1 to deleted items and continue to the next iteration
					deletedItems++;
					i--;
					continue;
				}
			}
		}
	} else { // reversed mode
	 	// go through every value in the array in reverse
		for (let i = array.length - 1; i > -1; i--) {
			// if the value is a space character
			if (array[i] === ' ') {
				// remove the value and add one to deleted items, then continue to the next iteraion
				array.splice(i, 1);
				deletedItems++;
				continue;
			}

			// if current value isn't the first in the array
			if (!(i === array.length - 1)) {
				// if the current value is equal to the previous value
				if (array[i] === array[i + 1]) {
					// double the previous value and delete the current one
					array[i + 1] = array[i + 1] * 2;
					array.splice(i, 1);
					// add 1 to deleted items and continue to the next iteration
					deletedItems++;
					continue;
				}
			}
		}
	}
  
  //if the length of the array has changed
  if (deletedItems) {
		if (reverse === false) { // default non-reverse mode
			//add space characters at the end to restore its original length
			for (let i = 0; i < deletedItems; i++) {
				array.push(' ');
			}
		} else { // reverse mode
			//add space characters at the beginning to restore its original length
			for (let i = 0; i < deletedItems; i++) {
				array.unshift(' ');
			}
		}
  }
	// turn all array elements back into strings
	for (let i = 0; i < array.length; i++) {
		array[i] = String(array[i]);
	}
}

// function pushes the board elements up, takes board as a paremeter and modifies it (should activate when the user presses the UP key)
function pushBoardUp(board) {
	// loop through board columns
	for (let col = 0; col < board.length; col++) {
		// push the elements of each column up
		pushItems(board[col]);
	}
}

// function pushes the board elements left, takes board as a paremeter and modifies it (should activate when the user presses the LEFT key)
function pushBoardLeft(board) {
	// loop through board rows
	for (let row = 0; row < board.length; row++) {
		// create new array to hold the row
		newRow = [];
		
		// loop through the row's columns
		for (let col = 0; col < board.length; col++) {
			// add each item the the new array
			newRow.push(board[col][row]);
		}
		
		// push the items of the new array left
		pushItems(newRow);
		
		// loop through the array's items
		for (let itemIndex = 0; itemIndex < newRow.length; itemIndex++) {
			// edit the board to add the new item in its place on the board
			board[itemIndex][row] = newRow[itemIndex];
		}
	}
}

// function pushes the board elements down, takes board as a paremeter and modifies it (should activate when the user presses the DOWN key)
function pushBoardDown(board) {
	// loop through board columns
	for (let col = 0; col < board.length; col++) {
		// push the elements of each column down
		pushItems(board[col], reverse=true);
	}
}

// function pushes the board elements right, takes board as a paremeter and modifies it (should activate when the user presses the RIGHT key)
function pushBoardRight(board) {
	// loop through board rows
	for (let row = 0; row < board.length; row++) {
		// create new array to hold the row
		newRow = [];
		
		// loop through the row's columns
		for (let col = 0; col < board.length; col++) {
			// add each item the the new array
			newRow.push(board[col][row]);
		}
		
		// push the items of the new array right
		pushItems(newRow, reverse=true);
		
		// loop through the array's items
		for (let itemIndex = 0; itemIndex < newRow.length; itemIndex++) {
			// edit the board to add the new item in its place on the board
			board[itemIndex][row] = newRow[itemIndex];
		}
	}
}

// function handles key presses, takes a keydown event as a parameter
function handleKeyPress(event) {
	// react based on the key pressed, do nothing if it's not a directional key
	switch (event.key) {
		case ('w'):
			pushBoardUp(currentBoard);
			addRandom(currentBoard);
			printBoard(currentBoard);
			break;
		case ('a'):
			pushBoardLeft(currentBoard);
			addRandom(currentBoard);
			printBoard(currentBoard);
			break;
		case ('s'):
			pushBoardDown(currentBoard);
			addRandom(currentBoard);
			printBoard(currentBoard);
			break;
		case ('d'):
			pushBoardRight(currentBoard);
			addRandom(currentBoard);
			printBoard(currentBoard);
			break;
		default :
			console.log(event.key)
	}
}

// function starts a new game by clearing the board, adding a random number and adding event capturing and handling
function newGame() {
	// clear the board
	currentBoard = [[' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ']];
	// add a random number to the board
	addRandom(currentBoard);
	// add the event listener
	document.body.addEventListener('keydown', handleKeyPress);
	// print the board
	printBoard(currentBoard);
}

// function ends the game by removing event listeners and displaying the game over message
	// remove the event listener
	// display game over message
	
// function displays a game over message
	// dim the screen begind the message
	// display the actual message box
	// display the score on the message box
	// display the restart button
	
newGame();