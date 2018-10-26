var database = firebase.database();
var db;

var highscoreGlobal = function retrieveFromFirebase() {
    return database.ref().child('feedback').once('value').then(function (snapshot) {
      db = snapshot.val();      
    });
  }

highscoreGlobal();

let age = [];
let keys = Object.keys(db);

for (let i = 0; i < keys.length; i++) {
    age.push(db[keys[i]].age);
}

d3.select('h1').style('color', 'red');