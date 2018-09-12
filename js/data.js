window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const data = [
    { name: 'Andreas', ticketsBought: 10, highscore: 1 },
    { name: 'Tanja', ticketsBought: 12, highscore: 5 },
    { name: 'Olzhas', ticketsBought: 5, highscore: 3 },
    { name: 'Daniel', ticketsBought: 7, highscore: 2 },
    { name: 'Manas', ticketsBought: 13, highscore: 4 },
    { name: 'Azat', ticketsBought: 21, highscore: 3 },
    { name: 'Kumar', ticketsBought: 9, highscore: 4 },
    { name: 'Emilie', ticketsBought: 11, highscore: 5 },
];

var db;
var request = window.indexedDB.open("highscoreDB", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("highscore", { keyPath: "highscore" });

    for (var i in data) {
        objectStore.add(data[i]);
    }
}

function read() {
    var transaction = db.transaction(["highscore"]);
    var objectStore = transaction.objectStore("highscore");
    var request = objectStore.get(1);

    request.onerror = function (event) {
        alert("Unable to retrieve daa from database!");
    };

    request.onsuccess = function (event) {
        // Do something with the request.result!
        if (request.result) {
            alert("Name: " + request.result.name + ", Tickets: " + request.result.ticketsBought + ", Highscore: " + request.result.highscore);
       } else {
            alert("Couldn't be found in your database!");
        }
    };
}

function readAll() {
    var objectStore = db.transaction("highscore").objectStore("highscore");
    
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       
       if (cursor) {
          alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Tickets: " + cursor.value.ticketsBought + ", Highscore: " + cursor.value.highscore);
          cursor.continue();
       } else {
          alert("No more entries!");
       }
    };
 }
 
 function add(name, score) {
    var request = db.transaction(["highscore"], "readwrite")
    .objectStore("highscore")
    .add({ name: name, ticketsBought: 0, highscore: score });
    
    request.onsuccess = function(event) {
       console.log("Entry has been added to your database.");
    };
    
    request.onerror = function(event) {
       console.log("Unable to add data in your database! ");
    }
 }
 
 function remove() {
    var request = db.transaction(["highscore"], "readwrite")
    .objectStore("highscore")
    .delete(9);
    
    request.onsuccess = function(event) {
       alert("Kenny's entry has been removed from your database.");
    };
 }