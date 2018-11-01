navigator.vibrate([1000, 1000, 2000]);

var database = firebase.database();
var db;
let data = {};
var utc = new Date().toJSON().slice(0, 19).replace(/T/g, '-');

function collectData() {

    let name = document.getElementsByName("name");
    let email = document.getElementsByName("email");
    let number = document.getElementsByName("number");
    let role = document.getElementById("dropdown");
    let country = document.getElementById("country");

    let radio = document.getElementsByName("likelyhood");

    let radio_checked;

    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked === true) {
            radio_checked = radio[i].value;
        }
    }

    let improve = document.getElementsByName("improve");

    let improve_checked = [];

    for (let i = 0; i < improve.length; i++) {
        if (improve[i].checked === true) {
            improve_checked.push(improve[i].value);
        }
    }

    let comments = document.getElementById("comments");   

    writeUserData(utc, name[0].value, email[0].value, number[0].value, role.options[role.options.selectedIndex].innerHTML, radio_checked, improve_checked, comments.value, country.options[country.options.selectedIndex].innerHTML);

}

function writeUserData(utc, name, email, number, role, radio, imp, comments, country) {
    firebase.database().ref('feedback/' + utc).set({
        username: name,
        email: email,
        age: number,
        country: country,
        role: role,
        "Play again": radio,
        "Things to improve": imp,
        comments: comments
    });
}
