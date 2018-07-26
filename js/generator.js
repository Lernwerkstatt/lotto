function generateArray(size, min, max) {
  var result = [];
  for (var i = 0; result.length < size; i++) {
    var newRandom = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!result.includes(newRandom)) {
      result.push(newRandom);
    }
  }
  return result;
}
