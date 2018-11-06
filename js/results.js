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
            //d3BarChart(age);
            d3Gallery(imageLinks);

            let result = {};

            for (let i = 0; i < age.length; i++) {
                if (!result.hasOwnProperty(age[i])) {
                    result[age[i]] = 1;
                } else {
                    result[age[i]]++;
                }
            }

            d3plus.viz()
                .container("#viz")
                .data(result)
                .type("pie")
                .id("name")
                .size("value")
                .draw()

        }

        )
        .catch(error => {
            console.log(error);
        });
}

var dataset = [
    { "value": 100, "name": "alpha" },
    { "value": 70, "name": "beta" },
    { "value": 40, "name": "gamma" },
    { "value": 15, "name": "delta" },
    { "value": 5, "name": "epsilon" },
    { "value": 1, "name": "zeta" }
]

const d3Gallery = function (dataset) {
    d3.select("body").selectAll("img")
        .data(dataset)
        .enter()
        .append("img")
        .attr("src", (d) => d)
        .attr("width", 150)
        .attr("height", 150);

}





getUser();









