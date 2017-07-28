function displayStandardBarChart(json, url) {
    console.log(json);
    // set up the chart
    var chart = d3.select('.chart');

    var color = d3.scale.category10();

    //margins for svg container sizes
    var margin = {top: 20, right: 100, bottom: 10, left: 10},
        width = 400;

    height = 150 - margin.top - margin.bottom;

    // declare the data
    d3.json('/data/data.json', function (data) {
        //data = json;
        data = JSON.parse(json);
        console.log(data);
        global_data = data;

        var types = [];

        // coerce values to number
        data.forEach(function (d) {
            d.type = d.type;
            d.title = d.title;
            d.count = d.count;
            d.onClickKey = d.onClickKey;
            d.onClickValue = d.onClickValue;
            d.description = d.description;

            if (types.indexOf(d.type) == -1) {
                types.push(d.type);
            }
        });

        console.log(types);

        color.domain(types);

        default_type = types[0];

        // legendolder is going to be an svg of this hight
        var legendHolder = d3.select(".legendHolder").append("svg").attr("height", height * 0.13);

        // scale barchart to percentage widths
        var maxVal = d3.max(data, function (d) {
            return d.count;
        });


        // We're going to append some legend entries into legendHolder
        var legend = legendHolder.selectAll(".legend")
            .data(color.domain().slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform",
                function (d, i) {
                    return "translate(" + i * (width * 0.2) + ",0)";
                });
        // translate along x: set each legend element at (i * two-tenths of the width)
        // and dont translate along y at all


        // ****** make all of the legends's rects and texts clickable.
        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)
            .on("click", function (d) {
                default_type = d; // what ever you've clicked on becomes the default_type
                return change();
            }); //then default_type will be ready when redraw() calls it

        legend.append("text")
            .attr("dy", "1em")
            .attr("dx", width * 0.05)
            .style("text-anchor", "start")
            .text(function (d) {
                return d;
            })
            .on("click", function (d) {
                default_type = d; // what ever you've clicked on becomes the default_type
                return change();
            }); //then default_type will be ready when redraw() calls it
        // **************


        // sort the data
        data.sort(function (a, b) {
            return Number(b.count) - Number(a.count);
        });

        // create bars (using pseudo-selection)
        var bar = chart.selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'bar')
            .style('width', function (d) {
                return Number((d.count / maxVal) * 100) + '%';
            });

        // create sub-elements an attach them to bar
        bar.append('span')
            .attr('class', 'label')
            .text(function (d) {
                return d.count;
            });

        // append names and configure mouse actions
        bar.append('span')
            .attr('class', 'name')
            .text(function (d) {
                return d.title;
            });
        bar.on("mouseover", function (d) {
            if (d.onClickKey != "stop") {
                this.style.cursor = 'pointer';
                this.style.border = "2px solid black";
            }
        });
        bar.on("mouseout", function (d) {
            if (d.onClickKey != "stop") {
                this.style.cursor = 'pointer';
                this.style.border = "2px solid white";
            }
        });
        bar.on("click", function (d) {
            d3.event.stopPropagation();
            // if there is an event available on click, do it, otherwise stop
            if (d.onClickKey != "stop") {
                window.location.href = '/graphredirect?key=' + d.onClickKey + '&value=' + d.onClickValue;
            }
        });

    });

}