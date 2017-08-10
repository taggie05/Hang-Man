
var alpha = ['a','b','c','d','e','f','g','h','i',
	'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x',
	'y','z'];
//Holds the all the words
var wordBank =['lana','sterling','figis', 'krieger','malory','pam','cheryl'];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var blanksFill =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;
//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksFill =[];
	alpha = ['a','b','c','d','e','f','g','h','i',
	'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x',
	'y','z'];

	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksFill =[];
	alpha = ['a','b','c','d','e','f','g','h','i',
	'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x',
	'y','z'];
	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksFill.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksFill;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksFill.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	// Testing / Debugging
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksFill);
}

function compareLetters(userKey)
{
	console.log('WORKING!');
	 
	if(choosenWord.indexOf(userKey) > -1)
	{
	//Loops depending on the amount of blanks 
	for(var i = 0; i < numBlanks; i++)
	{
		//Fills in right index with user key
		if(lettersInWord[i] === userKey)
		{
			rightGuessCounter++;
			blanksFill[i] = userKey;
			document.getElementById('wordToGuess').innerHTML = blanksFill.join(' ');
		}	
	}
	
	console.log(blanksFill);
	}

	//Wrong Keys
	else
	{
	wrongLetters.push(userKey);
	guessesLeft--;
	//Changes HTML
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	
	console.log('Wrong Letters = ' + wrongLetters);
	console.log('Guesses left are ' + guessesLeft);
	}				
}
function winLose()
{
// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		var audio = new Audio('assets/js/hey-phrasing.wav');
		audio.play();
		reset();
	}
// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert('You Lose');
		reset();
	}
}	
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < alpha.length; i++)
	{	
		if(letterGuessed === alpha[i] && test === true)
		{
			var spliceDword = alpha.splice(i,1);
			
			console.log('Double word is = ' + alpha[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}