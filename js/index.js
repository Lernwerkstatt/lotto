function createNewElement(number) {
  var result = document.createElement("LABEL");
  var newInput = document.createElement("INPUT");
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
  var newSpan = document.createElement("SPAN");
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
    alert('Please select exactly 6 numbers');
    location.reload();
  }
  else {
    alert("You have " + numberOfCorrectGuesses(selectedNumber, generateArray(6, 1, 49)) + " number(s) guessed right.");
    location.reload();
  }
}
