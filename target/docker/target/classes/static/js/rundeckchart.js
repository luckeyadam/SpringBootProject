function displayRundeckChart(csvfile, tileLink) {

    console.log(csvfile, tileLink);
    var createdsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // width="960" height="500"
    createdsvg.setAttribute("width", 860);
    createdsvg.setAttribute("height", 400);
    createdsvg.setAttribute("name", tileLink);
    createdsvg.style.display= "none";
    console.log(createdsvg);

    var svg = d3.select(createdsvg);
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var data = d3.csvParse(csvfile, function (d, i, columns) {
        console.log("in csvParse");
        console.log(d3);
        console.log(d);
        console.log(i);
        console.log(columns.length);
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
    });

    var w = window.innerWidth,
        h = window.innerHeight;

    // We're passing in a function in d3.max to tell it what we're maxing (x value)
    var xScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) { return d.x + 10; })])
        .range([margin.left, w - margin.right]);  // Set margins for x specific

    // We're passing in a function in d3.max to tell it what we're maxing (y value)
    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) { return d.y + 10; })])
        .range([margin.top, h - margin.bottom]);  // Set margins for y specific

    create(data);

    document.getElementById("chartDiv").appendChild(createdsvg);


    function create(data) {
        console.log("parsing data");
        console.log(data);
        var keys = data.columns.slice(1);

        x0.domain(data.map(function (d) {
            return d.Statistic;
        }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function (d) {
            return d3.max(keys, function (key) {
                console.log(d[key]);
                return d[key];
            });
        })]).nice();

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + x0(d.Statistic) + ",0)";
            })
            .selectAll("rect")
            .data(function (d) {
                return keys.map(function (key) {
                    console.log(key + " " + d[key]);
                    return {key: key, value: d[key]};
                });
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x1(d.key);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .attr("id", function (d) {
                return z(d.key);
            })
            .attr("fill", function (d) {
                return z(d.key);
            });

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Count");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) {
                return d;
            });
    }

    // Create Event Handlers for mouse
    function handleMouseOver(d, i) {  // Add interactivity
        console.log("d");
        console.log(d);
        console.log("svg")
        console.log(d3.transform(d3.select(this).x));

        // Specify where to put label of text
        svg.append("text")
            .attr("x", 60)
            .attr("y", 60)
            .attr("id", "t" + d.x + "-" + d.y + "-" + i)
            .text(function () {
                return [d.value];  // Value of the text
            });

        console.log(svg)

    }

    function handleMouseOut(d, i) {

        // Select text by id and then remove
        d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
    }
}
