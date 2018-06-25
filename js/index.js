  // Daniel

  // write a function, which accepts two arrays
  // and returns true if both have the same elements
  // which do not have to be in order

var arr1 = [1, 2, 3, 4, 5];
var arr2 = [5, 4, 3, 2, 1];
// Function to check if arr1 equals arr2
var arraysAreEquivalent = function (arr1, arr2) {
  // Sort arrays min to max
  arr1.sort();  
  arr2.sort();
   // Compare length of arrays
	 if (arr1.length !== arr2.length) return false;
    // Compare arrays as strings if length is equal
				if (arr1.toString() !== arr2.toString()) return false;
  // Return answer true if no return false until here
  return true;
};
console.log("arr1 equals arr2", arraysAreEquivalent(arr1, arr2)); 


// Tanya
// write test function with various inputs to test arraysAreEquivalent
