
var checkAndPush = function(size, min, max) {
  if ((max - min +1) < size) {
    return "Not enough numbers for operation";
  }
  var massiv = [];
  for (var i=0; massiv.length<size; i++) {
    var x = Math.floor(Math.random()*(max-min+1))+min;
    if (!massiv.includes(x))
    massiv.push(x);
}
return massiv;
}
