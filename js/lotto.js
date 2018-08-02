function numberOfCorrectGuesses(userArray, lottoArray) {
  var result = 0;
  var guessedNumbers = [];

  for (var i = 0; i < userArray.length; i++) {
    if (lottoArray.includes(userArray[i])) {
      var guessedNumber = userArray[i];
      guessedNumbers.push(guessedNumber);
      result++
    }
  }
  var userGuessedComb = document.getElementById("selection");
  if (result > 0) {
    userGuessedComb.innerHTML = "The numbers you guessed are  " + guessedNumbers;
  } else {
    userGuessedComb.innerHTML = "You didn't geuess any number, but you can try again. Good luck!";
  }
  console.log(guessedNumbers);
  return result;
}

function generateLottoArray(size, min, max) {
  var result = [];
  for (var i = 0; result.length < size; i++) {
    var newRandom = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!result.includes(newRandom)) {
      result.push(newRandom);
    }
  }
  return result;
}

function test(expected, actual) {
  if (expected === actual) {
    console.log("Test passed");
  } else {
    console.log("Test expected " + expected + " but actual " + actual);
  }
}

test(2, numberOfCorrectGuesses([1, 2], [1, 2]));
test(0, numberOfCorrectGuesses([1, 2, 3], [4, 5, 6]));
test(1, numberOfCorrectGuesses([1, 2, 3], [7, 2, 4]));
test(3, numberOfCorrectGuesses([1, 2, 3], [3, 2, 1]));
