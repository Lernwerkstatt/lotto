function createNewElement(number) {
  var result = document.createElement("label");
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "checkbox");
  newInput.onclick = function () {
    if (this.checked) {
      playSound("./sounds/tink.wav");
      changeSelection(number);
      this.parentElement.classList.add("selected");
    } else {
      playSound("./sounds/kick.wav");
      removeSelection(number);
      this.parentElement.classList.remove("selected");
    }
  };
  
  newInput.className = "box";
  newInput.id = "pool-" + number;
  newInput.setAttribute('data-number', number);
  var newSpan = document.createElement("span");
  newSpan.innerHTML = number;
  result.appendChild(newInput);
  result.appendChild(newSpan);
  return result;
}

function changeSelection(number) {
  var selection = document.getElementById("selection");
  var newSpan = document.createElement("span");
  newSpan.id = "selection-" + number;
  newSpan.innerHTML = number;
  newSpan.onclick = function () {
      document.getElementById("pool-" + number).click();
  };

  selection.appendChild(newSpan);
}

function removeSelection(number) {
  document.getElementById("selection-" + number).remove();
}

function playSound(path) { 
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', path);
  audioElement.play();
}

function checkboxes() {  
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  console.log(inputElems);
  var selectedNumber = [];
  for (var i = 0; i < inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
      count++;
      selectedNumber.push(parseInt(inputElems[i].getAttribute('data-number')));
    }
  }
  if (count !== 6) {
    playSound("./sounds/mistake.wav");
    Alert.render("Please select exactly 6 numbers");
  }
  else {
    let rightNumbers = generateLottoArray(6, 1, 49).sort((a, b) => a - b);
    playSound("./sounds/openhat.wav");    
    Alert.render("Following numbers were drawn. " + rightNumbers + "<br />" + " You have " + numberOfCorrectGuesses(selectedNumber, rightNumbers) + " number(s) guessed right.");
  }
}

function CustomAlert() {
  this.render = function(dialog){
      var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogoverlay.style.display = "block";
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


function renderNumbersPool() {
  var container = document.getElementById("container");
  for (var i = 1; i < 50; i++) {
    var element = createNewElement(i);
    container.appendChild(element);
  }
}

// Init
renderNumbersPool();

const lotto = ['#charOne','#charTwo','#charThree','#charFour','#charFive']

for (let i=0; i < 5; i++) {
  let time = Math.random() * 15;
  let spin = document.querySelector(lotto[i]);  
  spin.style.setProperty('--animation-time', time +'s');
}

var highscore = {
  "Olzhas": 2,
  "Tanja": 3,
  "Azat": 2,
  "Andreas": 1,
  "Kumar": 4,
  "Daniel": 1
};



function createHighscore() {
  var orderedList = document.createElement("ol");  
  for (let i = 0; i < 6; i++) {
    var listElement = document.createElement("li");
    listElement.setAttribute("key", i);
    listElement.innerHTML = i;
    orderedList.appendChild(listElement);
  }  
  return orderedList;
}