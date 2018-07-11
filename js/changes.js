//function which when is called creates arbitrary value
var makeArValue = function() {
  var ArValue = Math.random();
  return function(){
    return ArValue
  }
};
// our main function which calls and pushes ArValues to massiv
var checkAndPush = function(size, min, max) {
    if ((max - min +1) < size) {
      return "Not enough numbers for operation";
    }
        var massiv = [];
        var i;
    for (i=0; massiv.length<size; i++) {
        var x = Math.round(makeArValue()()*max);
    if (!massiv.includes(x) && x >=min)
        massiv.push(x);
    }
  return massiv;
}
