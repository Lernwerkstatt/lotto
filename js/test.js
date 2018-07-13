function createNewElement(number) {
  var newLabel = document.createElement("LABEL");
  var newElement = document.createElement("INPUT");
  newElement.setAttribute("type", "checkbox");  
  newElement.onclick = function () {
    changeSelection(number);
  };  
  newElement.className = "box";
  var newSpan = document.createElement("SPAN");
  newSpan.innerHTML = number;
  newLabel.appendChild(newElement);
  newLabel.appendChild(newSpan);

  return newLabel;
}


var container = document.getElementById("container");

for (var i = 1; i < 50; i++) {
  var element = createNewElement(i);
  container.appendChild(element);
  element.id = i;
}

function changeSelection(number) {
  var selection = document.getElementById("selection");
  selection.innerHTML = number;
}


function checkboxes() {
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  for (var i = 0; i < inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
      count++;     
    }
  }
  if (count !== 6) {
    alert('Please select exactly 6 numbers');
  }
  else {
    alert('Your numbers will be checked.');
    return count;
  }
}