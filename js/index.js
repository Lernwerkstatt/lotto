var database = firebase.database();
var db;
renderNumbersPool("playerOne");
generateLottoAnimation();

function createNewElement(number) {
  var result = document.createElement("label");
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "checkbox");
  newInput.onclick = function () {
    if (this.checked) {
      playSound("./sounds/tink.wav");
      changeSelection(number, this.parentElement.parentElement.id);
      this.parentElement.classList.add("selected");
    } else {
      playSound("./sounds/kick.wav");
      removeSelection(number, this.parentElement.parentElement.id);
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

function renderNumbersPool(id) {
  var container = document.getElementById(id);
  for (var i = 1; i < 50; i++) {
    var element = createNewElement(i);
    container.appendChild(element);
  }
}

function changeSelection(number, id) {
  if (id == 'playerOne') {
    var selection = document.getElementById('selectionOne');
  } else {
    var selection = document.getElementById('selectionTwo');
  }

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

function checkboxes(numberOfRuns) {
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  var selectedNumber = [];
  let checked = document.getElementById("checker");
  let boughtTicket = document.getElementById("boughtTicket");
  let three = 0;
  let four = 0;
  let five = 0;
  let six = 0;

  for (var i = 0; i < inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true && inputElems[i].hasAttribute("data-number")) {
      count++;
      selectedNumber.push(parseInt(inputElems[i].getAttribute('data-number')));
    }
  }

  if (count !== 6) {
    playSound("./sounds/mistake.wav");
    Alert.render("Please select exactly 6 numbers");
  }
  else {
    let max = -1;
    let drawnNumberArray = [];
    for (let i = 0; i < numberOfRuns; i++) {
      let rightNumbers = generateLottoArray(6, 1, 49).sort((a, b) => a - b);
      let rightGuesses = numberOfCorrectGuesses(selectedNumber, rightNumbers);

      switch (rightGuesses) {
        case 3:
          three++;
          break;
        case 4:
          four++;
          break;
        case 5:
          five++;
          break;
        case 6:
          six++;
          break;
      }

      if (rightGuesses > max) {
        max = rightGuesses;
        drawnNumberArray[0] = rightNumbers;
      }
    }    

    if (checked.getAttribute("checked") !== "") {      
      if (Number(db[name]) < max || !db[name]) {
        updateFirebase(name, max);
      }     
    }
    playSound("./sounds/openhat.wav");

    if (boughtTicket) {
      Alert.render("Following numbers were drawn. " + drawnNumberArray + "<br />" + name + " You have " + max + " number(s) guessed right.");
      Alert.ok = function () {
        location.reload()
      }
    } else {
      Alert.render("After " + numberOfRuns + " rounds. you got " + "<br />" + "3 right numbers: " + three + "<br />" + "4 right numbers: " + four + "<br />" + "5 right numbers: " + five + "<br />" + "6 right numbers: " + six);
      Alert.ok = function () {
        location.reload()
      }
    }
  }
}

function CustomAlert() {
  this.render = function (dialog) {
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
  }

  this.ok = function () {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}
var Alert = new CustomAlert();

function generateLottoAnimation() {
  const lotto = ['#charOne', '#charTwo', '#charThree', '#charFour', '#charFive']

  for (let i = 0; i < 5; i++) {
    let time = (Math.random() + 2) * 4
    let spin = document.querySelector(lotto[i]);
    spin.style.setProperty('--animation-time', time + 's')
  }
}


function createHighscore(input) {
  let high = document.getElementById('highscore')
  let sortable = Object.entries(input)

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  })

  sortable.forEach((element) => {
    let newList = document.createElement("li");
    newList.innerHTML = element[0] + " " + element[1];
    high.appendChild(newList)
  })
}

function buyTicket() {
  Prompt.render('Please enter your name:', 'promptHandler');
}

function promptHandler(input) {
  name = input.charAt(0).toUpperCase() + input.substr(1);

  if (name !== "" && name !== "Null") {
    let buy = document.getElementById('buyTicket');
    let switchdiv = document.getElementById('switchdiv');

    switchdiv.style.display = "none";
    buy.setAttribute('id', 'boughtTicket');
    buy.innerHTML = 'Ticket bought';
    buy.setAttribute('onclick', '');
    let activateCheckButton = document.getElementById('checkButton');
    activateCheckButton.addEventListener("click", checkboxes.bind(null, 1));
  }
}

function CustomPrompt() {
  this.render = function (dialog, func) {
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1" autofocus>';
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Prompt.ok(\'' + func + '\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
  }


  this.cancel = function () {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  this.ok = function (func) {
    var prompt_value1 = document.getElementById('prompt_value1').value;
    window[func](prompt_value1);
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}

var Prompt = new CustomPrompt();


function numberOfTickets() {
  let selectBox = document.getElementById("numberOfTickets");
  let selectedValue = selectBox.options[selectBox.selectedIndex].value;
  let activateCheckButton = document.getElementById('checkButton');

  activateCheckButton.addEventListener("click", checkboxes.bind(null, selectedValue));
}

function changeMode() {
  let checked = document.getElementById("checker");
  let probability = document.getElementById("probability");
  let buyTicket = document.getElementById("buyTicket");
  let switchMode = document.getElementById("switchMode");
  let highscore = document.getElementById("highscore");
  let reset = document.getElementById("reset");
  let highscoreBox = document.getElementById("highscore-box");

  if (checked.getAttribute("checked") == "") {
    checked.removeAttribute("checked");
    probability.style.display = "none";
    buyTicket.style.display = "inline-block";
    switchMode.innerHTML = "Multiplayer Mode active";
    highscoreBox.style.display = "block";
    reset.style.display = "inline-block";

  } else {
    checked.setAttribute("checked", "");
    switchMode.innerHTML = "Probability Mode active"
    probability.style.display = "flex";
    buyTicket.style.display = "none";
    highscoreBox.style.display = "none";
    reset.style.display = "none";
  }
}

function resetHighscore() {
  localStorage.clear();
  location.reload();
}

var highscoreGlobal = function retrieveFromFirebase() {
  return database.ref('/').once('value').then(function(snapshot) {
    db = snapshot.val();
    createHighscore(db);
    });
}

function updateFirebase(name, value) {
  database.ref('/').update({
    [name] : value,
    
  });
}

highscoreGlobal();
