function createNewElement(number) {
    var newElement = document.createElement("div");
    newElement.onclick = function() {
      changeSelection(number);
    };
    newElement.innerHTML = number;
    newElement.className = "box";
    return newElement;
  }

  var container = document.getElementById("container");
  
  for (var i = 0; i < 10; i++) {
    var element = createNewElement(i);
    container.appendChild(element);
  }

  function changeSelection(number) {
    var selection = document.getElementById("selection");
    selection.innerHTML = number;       
  }