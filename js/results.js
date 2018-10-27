var database = firebase.database();
var db;
let age = [];
let country = [];


var highscoreGlobal = function retrieveFromFirebase() {
    return database.ref().child('feedback').once('value').then(function (snapshot) {
        db = snapshot.val();
        let keys = Object.keys(db);

        for (let i = 0; i < keys.length; i++) {
            age.push(db[keys[i]].age);
            country.push(db[keys[i]].country);
        }

        //test(age);
        //test(country);
    });
}

//highscoreGlobal();

function getUser() {
    fetch("https://randomuser.me/api/?results=100")
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Request failed.");
        })
        .then(data => {
            for (let i = 0; i < 100; i++) {
                age.push(data.results[i].dob.age);
            }
            d3Test(age);
        }

        )
        .catch(error => {
            console.log(error);
        });
}

const d3Test = function (data) {
    
    d3.select("body")
        .append("h4")
        .data(data)
        .enter()
        .append("h4")
        .text((d) => d)
        .style('color', 'red');

}
getUser();



