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
                .container("#pie")
                .data(convertArrayToObject(age))
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
    { "year": 1991, "name": "alpha", "value": 15 },
    { "year": 1991, "name": "beta", "value": 10 },
    { "year": 1991, "name": "gamma", "value": 5 },
    { "year": 1991, "name": "delta", "value": 50 },
    { "year": 1992, "name": "alpha", "value": 20 },
    { "year": 1992, "name": "beta", "value": 10 },
    { "year": 1992, "name": "gamma", "value": 10 },
    { "year": 1992, "name": "delta", "value": 43 },
    { "year": 1993, "name": "alpha", "value": 30 },
    { "year": 1993, "name": "beta", "value": 40 },
    { "year": 1993, "name": "gamma", "value": 20 },
    { "year": 1993, "name": "delta", "value": 17 },
    { "year": 1994, "name": "alpha", "value": 60 },
    { "year": 1994, "name": "beta", "value": 60 },
    { "year": 1994, "name": "gamma", "value": 25 },
    { "year": 1994, "name": "delta", "value": 32 }
]




d3plus.viz()
    .container("#bar")
    .data(dataset)
    .type("bar")
    .id("name")
    .x("year")
    .y("value")
    .draw()

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

function convertArrayToObject(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let temp = {
            name: arr[i],
            value: 1
        }
        result.push(temp);
    }

    return result;
}









