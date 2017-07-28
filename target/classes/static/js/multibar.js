function makeBarChart(sentcsv, tileType, chartLabel) {
    console.log(sentcsv);
    var outerWidth = 1500;
    var outerHeight = 1500;
    var margin = {left: 80, top: 5, right: 100, bottom: 60};
    var xColumn = "time";
    var yColumn = "count";
    var colorColumn = "line";
    var lineColumn = colorColumn;
    var xAxisLabelText = "Time";
    var xAxisLabelOffset = 48;
    var yAxisLabelText = "Count";
    var yAxisLabelOffset = 60;
    var innerWidth = 900 - margin.left - margin.right; //changed from outerWidth to 1000
    var innerHeight = 500 - margin.top - margin.bottom; //changed from outerheight to 500
    var createdsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    createdsvg.setAttribute("width", outerWidth);
    createdsvg.setAttribute("height", outerHeight);
    createdsvg.setAttribute("name", tileType);
    createdsvg.style.display = "none";


    //var svg = d3.select("svg"),
    var svg = d3.select(createdsvg),
        //margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right -500,
        height = +svg.attr("height") - margin.top - margin.bottom-1100,
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

    function render(data) {
        console.log(data);
        var keys = data.columns.slice(1);

        x0.domain(data.map(function (d) {
            return d.url;
        }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function (d) {
            return d3.max(keys, function (key) {
                return d[key];
            });
        })]).nice();

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + x0(d.url) + ",0)";
            })

            .selectAll("rect")
            .data(function (d) {
                return keys.map(function (key) {
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
            .text(chartLabel);

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

    function type(d) {
        d.url = d.url;
        d.count = +d.count;
        return d;
    }

    var dataParse = d3.csvParse(sentcsv, type);
    render(dataParse);
    var cells = createdsvg.getElementsByClassName("cell");
    fixLegend(cells);
    document.getElementById("chartDiv").appendChild(createdsvg);
    // get labels and rotate them
    window.addEventListener('load', function() {
        Array.from(document.getElementsByClassName("tick")).forEach(function (item) {
            console.log(item);
            var split = item.getAttribute("transform").split("(");
            var parenSplit = split[1].replace(")","");
            var xY=parenSplit.split(",");
            for(t = 0; t<xY.length; ++t){
                if(xY[1] == "0" && xY[0]!= "0"){
                    item.getElementsByTagName("text")[0].style.transform = "rotate(30deg)";
                    item.getElementsByTagName("text")[0].setAttribute("x", 5);
                    item.getElementsByTagName("text")[0].setAttribute("y", -4);
                    item.getElementsByTagName("text")[0].setAttribute("text-anchor", "start");
                }
            }
        });
    });
}

function fixLegend(cells) {
    // space out legend entries
    var x = 0;
    for (i = 1; i < cells.length; i++) {
        console.log(cells[i]);
        cells[i].setAttribute("transform", "translate(0," + x + ")");
        x = x + 30;
    }
}

function displayLegends() {
    // show/hide legend
    var ary = document.getElementsByClassName("color-legend");
    for (var i = 0, len = ary.length; i < len; i++) {
        console.log(ary[i]);
        console.log(ary[i].style.display);
        if (ary[i].style.display === "none") {
            ary[i].style.display = "block";
        } else {
            ary[i].style.display = "none";
        }
    }
};