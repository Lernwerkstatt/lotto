  // Daniel

  // write a function, which accepts two arrays
  // and returns true if both have the same elements
  // which do not have to be in order

function arraysAreEquivalent(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();  
  b.sort();
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function numberOfCorrectGuesses(guesses, lotto) {
  return lotto.length;
}

// Tanya
// write test function with various inputs to test arraysAreEquivalent

function test(expected, actual) {
    if (expected === actual) {
      console.log("Test passed");
  } else {
      console.log("Test expected " + expected + " but actual " + actual);
  }
}

test(false, arraysAreEquivalent([1, 1, 3], [1, 5, 3]));
test(false, arraysAreEquivalent([1, 81, 3], [1, 32, 6]));
test(true, arraysAreEquivalent([1, 2], [1, 2]));
test(false, arraysAreEquivalent([1, 26, 3], [1, 2]));
test(true, arraysAreEquivalent([1, 2, 3, 4, 5, 6], [1, 4, 6, 2, 3, 5]));
test(false, arraysAreEquivalent(["1", 2, 3], [1, 3, 2]));
test(2, numberOfCorrectGuesses([1, 2], [1, 2]));
test(0, numberOfCorrectGuesses([1, 2, 3], [4, 5, 6]));
test(1, numberOfCorrectGuesses([1, 2, 3], [7, 2, 4]));
test(3, numberOfCorrectGuesses([1, 2, 3], [3, 2, 1]));