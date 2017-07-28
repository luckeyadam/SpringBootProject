function makeLineChart(sentcsv, tileType) {
    //console.log(sentcsv);
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
    var svg = d3.select(createdsvg);
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")")
    var xAxisLabel = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
        .attr("class", "label")
        .text(xAxisLabelText);
    var yAxisG = g.append("g")
        .attr("class", "y axis");
    var yAxisLabel = yAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
        .attr("class", "label")
        .text(yAxisLabelText);

    var colorLegendG = g.append("g")
        .attr("class", "color-legend")
        .attr("transform", "translate(800, 20)") //changed from 325 to 800
        .style("display", "block");

    var xScale = d3.scaleTime().range([0, innerWidth]);
    var yScale = d3.scaleLinear().range([innerHeight, 0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    var xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickSizeOuter(0);
    var yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickSizeOuter(0);
    var line = d3.line()
        .x(function (d) {
            return xScale(d[xColumn]);
        })
        .y(function (d) {
            return yScale(d[yColumn]);
        });
    var colorLegend = d3.legendColor()
        .scale(colorScale)
        .shapePadding(3)
        .shapeWidth(15)
        .shapeHeight(15)
        .labelOffset(4);

    function render(data) {
        console.log("DATA IS:")
        console.log(data);
        xScale.domain(d3.extent(data, function (d) {
            return d[xColumn];
        }));
        yScale.domain([0, d3.max(data, function (d) {
            return d[yColumn];
        })]);
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var nested = d3.nest()
            .key(function (d) {
                return d[lineColumn];
            })
            .entries(data);

        colorScale.domain(nested.map(function (d) {
            return d.key;
        }));
        console.log("nested");
        console.log(nested);

        var pathy = g.selectAll(".chart-line").data(nested).enter().append("g").attr("class", "chart-line");

        pathy.append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return line(d.values);
            })
            .style("stroke", function (d) {
                return colorScale(d.key);
            });

        console.log("PATHS");
        console.log(pathy);
        colorLegendG.call(colorLegend);
    }


    function type(d) {
        d.time = new Date(d.time * 1000);
        d.count = +d.count;
        return d;
    }

    var dataParse = d3.csvParse(sentcsv, type);
    render(dataParse);
    var cells = createdsvg.getElementsByClassName("cell");
    fixLegend(cells);
    document.getElementById("chartDiv").appendChild(createdsvg);

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
    ;
}
