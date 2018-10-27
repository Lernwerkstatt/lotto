let age = [];
let country = [];
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
            }
            d3Test(imageLinks);
        }

        )
        .catch(error => {
            console.log(error);
        });
}

const d3Test = function (dataset) {
    
    d3.select("body").selectAll("img")
        .data(dataset)
        .enter()
        .append("img")
        .attr("src", (d) => d)
        .attr("width", 150)
        .attr("height", 150);
          
}

getUser();



