let age = [];
let country = {};
let imageLinks = [];

function getUser() {
    fetch("https://randomuser.me/api/?results=100")
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Request failed.");
        })
        .then(data => {
            for (let i = 0; i < 100; i++) {
                imageLinks.push(data.results[i].picture.large);
                age.push(data.results[i].dob.age)
            }
            d3Gallery(imageLinks);
            //d3BarChart(age);
        }

        )
        .catch(error => {
            console.log(error);
        });
}

const d3Gallery = function(dataset) {
    
    d3.select("body").selectAll("img")
        .data(dataset)
        .enter()
        .append("img")
        .attr("src", (d) => d)
        .attr("width", 150)
        .attr("height", 150);
          
}
/*
const d3BarChart = function(dataset) {
    d3.select("body").select("div")
        .data(dataset)  
        .enter()
        .
}
*/

getUser();



