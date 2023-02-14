// async function createChart(event) {
//     event.preventDefault();
//     const userSavings = document.querySelector('#Savings').value;
//     const userHouseLoan = document.querySelector('#house_loan').value;
//     const userFood = document.querySelector('#food').value;
//     const userTransportation = document.querySelector('#transportation').value;
//     const userPersonal = document.querySelector('#personal').value;


//     var data = [{name:"Savings", share: userSavings},
//                 {name:"House Loan", share: userHouseLoan},
//                 {name:"Food", share: userFood},
//                 {name:"Transportation", share: userTransportation},
//                 {name:"Personal", share: userPersonal},
//             ];
    
    
//     var svg = d3.select("svg"),
//     width = svg.attr("width"),
//     height = svg.attr("height"),
//     radius = 200;
    
//     var g = svg.append("g")
//                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//                        var ordScale = d3.scaleOrdinal()
//                        .domain(data)
//                        .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);
    
    
//     var pie = d3.pie().value(function(d) { 
//            return d.share; 
//        });
    
//     var arc = g.selectAll("arc")
//               .data(pie(data))
//               .enter();
    
    
//     var path = d3.arc()
//                 .outerRadius(radius)
//                 .innerRadius(0);
    
//     arc.append("path")
//       .attr("d", path)
//       .attr("fill", function(d) { return ordScale(d.data.name); });
    
    
//     var label = d3.arc()
//                  .outerRadius(radius)
//                  .innerRadius(0);
//     if (data)
//     arc.append("text")
//       .attr("transform", function(d) { 
//                return "translate(" + label.centroid(d) + ")"; 
//        })
//       .text(function(d) { return d.data.name; })
//       .style("font-family", "arial")
//       .style("font-size", 15);


//       const response = await fetch(`/api/expense`, {
//         method: 'GET',
//         body: JSON.stringify({
          
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to add expense');
//       }
//     };
    
//     document.querySelector('.new-chart').addEventListener('submit', createChart);


//     //Step 3
// var svg = d3.select("svg");
// let svg = document.getElementById("pie-chart");
// let width = svg.getAttribute("width");
// let height = svg.getAttribute("height");
// let radius = 200;

// Step 3
// var svg = d3.select("svg");
// let svg = document.getElementById("pie-chart");
// let width = svg.getAttribute("width");
// let height = svg.getAttribute("height");
// let radius = 200;
​
var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 200;
​
console.log("***SVG", width, height);
​
// Step 1        
// var data = [{name: "Transportation", share:50.00}, 
//             {name: "Rent", share: 100.00},
//             {name: "Example", share: 15.42},
//             {name: "Example", share: 13.65},
//             {name: "Remaining", share: 150.00},
//         ];
​
​
var chartData = [];
​
var data1;
​
fetch('/api/budgets', {
    method: 'GET',
}).then((response) => response.json())
    .then((data) => {
        console.log("************PIE_CHART", data);
        data1 = data;
        chartData.push(data);
       // data.foreach((element) => chartData.push(element));
    });
 console.log("************PIE_CHAR 3", data1);
console.log("************PIE_CHART 2", chartData);
var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
​
// Step 4
var ordScale = d3.scaleOrdinal()
    .domain(chartData)
    .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);
​
// Step 5
var pie = d3.pie().value(function (d) {
    return d.share;
});
​
var arc = g.selectAll("arc")
    .data(pie(chartData))
    .enter();
​
// Step 6
var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
​
arc.append("path")
    .getAttribute("d", path)
    .getAttribute("fill", function (d) { return ordScale(d.chartData.category_name); });
​
// Step 7
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
​
arc.append("text")
    .getAttribute("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.chartData.category_name; })
    .style("font-family", "arial")
    .style("font-size", 15);
Collapse










