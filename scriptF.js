// declare the game board
let currentBoard;

// set the status constants
const SUCCESS = 0;
const FAILURE = 1;

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
	// set status code to failure (it this case, failure is when the array does not change)
	let status = FAILURE;
	// set the original length to the array's length
	const originalLength = array.length;
	// make an empty list of blank items (blank items only need to be deleted after encountering a non-blank item)
	let prevBlankItems = [];
	
	if (reverse === false) { // default mode
		// set the array's index
		let index = 0;
		// loop through the array
		while (index < array.length) {
			// if the current item is blank
			if (array[index] === ' ') {
				// add it to a list of blank items
				prevBlankItems.push(index);
			
			} else { // if the current item is not a blank
			
				// if there are preceeding blanks
				if (prevBlankItems.length) {
					// delete any preceeding blanks
					array.splice(prevBlankItems[0], prevBlankItems.length);
					// move the index to the right position after deletion
					index = index - prevBlankItems.length;
					// empty the list of blanks
					prevBlankItems = [];
				}
				
				// if the current item is not the first of the array
				if (index !== 0) {
					// if the current item's value is the same as the previous items's
					if (array[index] === array[index - 1]) {
						// double the value of the previous item (note: the new doubled item will be turned into an integer to avoid it being merged twice)
						array[index - 1] = Number(array[index - 1]) * 2;
						// delete the current item
						array.splice(index, 1);
						// move the index back to the right position
						index--;
					}
				}
			}
			// continue to the next iteration
			index++;
		}
		
		// if the array's length has changed
		if (array.length < originalLength) {
			// add blanks to the end of the array
			const blanksNeeded = originalLength - array.length;
			for (let i = 0; i < blanksNeeded; i++) {
				array.push(' ');
			}
			
			// set the status code to success
			status = SUCCESS;
		}
		
	} else { // reverse mode
		
		// set the array's index
		let index = array.length - 1;
		
		// loop through the array (backwards)
		while (index > - 1) {
			
			// if the current item is blank
			if (array[index] === ' ') {
				// add it to a list of blank items
				prevBlankItems.unshift(index);
			
			} else { // if the current item is not a blank
			
				// if there are preceeding blanks
				if (prevBlankItems.length) {
					// delete any preceeding blanks
					array.splice(prevBlankItems[0], prevBlankItems.length);
					// note: no need to move the index when we're moving backwards
					// empty the list of blanks
					prevBlankItems = [];
				}
			
				// if the current item is not the last of the array
				if (index !== array.length - 1) {
					// if the curren item's value is the same as the previous item's
					if (array[index] === array[index + 1]) {
						// double the value of the previous item (note: the new doubled item will be turned into an integer to avoid it being merged twice)
						array[index + 1] = Number(array[index + 1]) * 2;
						// delete the current item
						array.splice(index, 1);
						// note: no need to move the index when we're moving backwards
					}
				}
			}
			
			// continue to the next iteration
			index--;
		}
		
		// if the array's length has changed
		if (array.length < originalLength) {
			// add blanks to the beginning of the array
			const blanksNeeded = originalLength - array.length;
			for (let i = 0; i < blanksNeeded; i++) {
				array.unshift(' ');
			}
			
			// set the status code to success
			status = SUCCESS;
		}
	}

	// turn all array items into strings
	for (let i = 0; i < array.length; i++) {
		array[i] = String(array[i])
	}
	
	// return status code
	return status;
}

// function pushes the board elements up, takes board as a paremeter and modifies it (should activate when the user presses the UP key)
function pushBoardUp(board) {
	// set status to failure
	let status = FAILURE;
	
	// loop through board columns
	for (let col = 0; col < board.length; col++) {
		// push the elements of each column up
		const rowStatus = pushItems(board[col]);
		// if the row has changed
		if (rowStatus === SUCCESS) {
			// set the status to success 
			status = SUCCESS;
		}
	}
	// return the status code
	return status;
}

// function pushes the board elements left, takes board as a paremeter and modifies it (should activate when the user presses the LEFT key)
function pushBoardLeft(board) {
	// set status to failure
	let status = FAILURE;
	
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
		const rowStatus = pushItems(newRow);
		// if the row has changed
		if (rowStatus === SUCCESS) {
			// set the status to success 
			status = SUCCESS;
		} 
		
		// loop through the array's items
		for (let itemIndex = 0; itemIndex < newRow.length; itemIndex++) {
			// edit the board to add the new item in its place on the board
			board[itemIndex][row] = newRow[itemIndex];
		}
	}
	// return the status code
	return status;
}

// function pushes the board elements down, takes board as a paremeter and modifies it (should activate when the user presses the DOWN key)
function pushBoardDown(board) {
	// set status to failure
	let status = FAILURE;
	
	// loop through board columns
	for (let col = 0; col < board.length; col++) {
		// push the elements of each column down
		const rowStatus = pushItems(board[col], reverse=true);
		// if the row has changed
		if (rowStatus === SUCCESS) {
			// set the status to success 
			status = SUCCESS;
		}
	}
	// return the status code
	return status;
}

// function pushes the board elements right, takes board as a paremeter and modifies it (should activate when the user presses the RIGHT key)
function pushBoardRight(board) {
	// set status to failure
	let status = FAILURE;
	
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
		const rowStatus = pushItems(newRow, reverse=true);
		// if the row has changed
		if (rowStatus === SUCCESS) {
			// set the status to success 
			status = SUCCESS;
		}
		
		// loop through the array's items
		for (let itemIndex = 0; itemIndex < newRow.length; itemIndex++) {
			// edit the board to add the new item in its place on the board
			board[itemIndex][row] = newRow[itemIndex];
		}
	}
	// return the status code
	return status;
}

// function handles key presses, takes a keydown event as a parameter
function handleKeyPress(event) {
	// react based on the key pressed, do nothing if it's not a directional key
	switch (event.key) {
		case ('w'):
			if (pushBoardUp(currentBoard) === SUCCESS) {
				addRandom(currentBoard);
			}
			printBoard(currentBoard);
			break;
		case ('a'):
			if (pushBoardLeft(currentBoard) === SUCCESS) {
				addRandom(currentBoard);
			}
			printBoard(currentBoard);
			break;
		case ('s'):
			if (pushBoardDown(currentBoard) === SUCCESS) {
				addRandom(currentBoard);
			}
			printBoard(currentBoard);
			break;
		case ('d'):
			if (pushBoardRight(currentBoard) === SUCCESS) {
				addRandom(currentBoard);
			}
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

// function checks whether there is a possible next move or not, retuns a boolean value
	// set the default status to false
	// if there are empty spaces on the board
		// set the status to true
	// else: if there are no empty spaces on the board
		// loop through each cell on the board
			// if the current cell can be merged with another neerby cell
				// set the status to true
				// break from the loop
	// return status

// function ends the game by removing event listeners and displaying the game over message
	// remove the event listener
	// display game over message
	
// function displays a game over message
	// dim the screen behind the message
	// display the actual message box
	// display the score on the message box
	// display the restart button
	
newGame();