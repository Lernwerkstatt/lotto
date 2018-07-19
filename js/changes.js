function generateArray(size, min, max) {
  if ((max - min + 1) < size) {
    return "Not enough numbers for operation";
  }
  var randomArray = [];
  for (var i = 0; randomArray.length < size; i++) {
    var x = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomArray.includes(x))
    randomArray.push(x);
}
return randomArray;
}