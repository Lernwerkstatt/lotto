var database = firebase.database();
var db;
let data = {};
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');

function collectData() {

    let name = document.getElementsByName("name");
    let email = document.getElementsByName("email");
    let number = document.getElementsByName("number");
    let role = document.getElementById("dropdown");



    writeUserData(utc, name[0].value, email[0].value, number[0].value, role.options[role.options.selectedIndex].innerHTML);

}

function writeUserData(utc, name, email, number, role) {
    firebase.database().ref('feedback/' + utc).set({
        username: name,
        email: email,
        age: number,
        role: role
    });
}