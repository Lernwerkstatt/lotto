function createNewElement(number) {
  var result = document.createElement("label");
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "checkbox");
  newInput.onclick = function () {
    changeSelection(number);
    if (this.checked) {
      this.parentElement.classList.add("selected");
    } else {
      this.parentElement.classList.remove("selected");
    }
  };
  
  newInput.className = "box";
  newInput.id = number;
  var newSpan = document.createElement("span");
  newSpan.innerHTML = number;
  result.appendChild(newInput);
  result.appendChild(newSpan);
  return result;
}

var container = document.getElementById("container");
for (var i = 1; i < 50; i++) {
  var element = createNewElement(i);
  container.appendChild(element);
}

function changeSelection(number) {
  var selection = document.getElementById("selection");
  selection.innerHTML += "<span>" + number + "</span>";
}

function checkboxes() {
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  console.log(inputElems);
  var selectedNumber = [];
  for (var i = 0; i < inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
      count++;
      selectedNumber.push(parseInt(inputElems[i].id));
    }
  }
  if (count !== 6) {
    Alert.render('Please select exactly 6 numbers');
  }
  else {
    Alert.render("You have " + numberOfCorrectGuesses(selectedNumber, generateLottoArray(6, 1, 49)) + " number(s) guessed right.");
  }
}

function CustomAlert() {
  this.render = function(dialog){
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogoverlay.style.display = "block";
      dialogoverlay.style.height = winH+"px";
      dialogbox.style.left = (winW/2) - (550 * .5)+"px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
      document.getElementById('dialogboxbody').innerHTML = dialog;
      document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
  }
  
this.ok = function() {
  document.getElementById('dialogbox').style.display = "none";
  document.getElementById('dialogoverlay').style.display = "none";
  location.reload();
}
}
var Alert = new CustomAlert();
