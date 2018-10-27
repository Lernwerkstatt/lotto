var database = firebase.database();
var db;
let age = [];

var highscoreGlobal = function retrieveFromFirebase() {
  return database.ref().child('feedback').once('value').then(function (snapshot) {
    db = snapshot.val();
    let keys = Object.keys(db);

    for (let i = 0; i < keys.length; i++) {
      age.push(db[keys[i]].age);
    }

  });
}

highscoreGlobal();

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

d3.select("body")
      .append("h4")
      .data(dataset)
      .enter()
      .append("h4")
      .text("Learning D3")
      .style('color', 'red');

