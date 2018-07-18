function createNewElement(number) {
  var newElement = document.createElement("input");
  newElement.setAttribute("type", "checkbox");
  var newElementNumber = document.createElement("span");
  newElement.appendChild(newElementNumber);
  newElementNumber.innerHTML = number;
  newElement.onclick = function () {
    changeSelection(number);
  };
  newElement.innerHTML = number;
  newElement.className = "box";
  return newElement;
}


var container = document.getElementById("container");

for (var i = 0; i < 50; i++) {
  var element = createNewElement(i);
  container.appendChild(element);
  element.id = i;
}

function changeSelection(number) {
  var selection = document.getElementById("selection");
  selection.innerHTML = number;
}


function checkboxes() {
  var inputElems = document.getElementsByTagName("input"),
    count = 0;
  for (var i = 0; i < inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
      count++;
    }
  }
  if (count !== 6) {
    alert('Please select exactly 6 numbers');
  }


}