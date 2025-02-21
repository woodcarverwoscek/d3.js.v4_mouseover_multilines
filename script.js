// Needed for the function: ca_energy_production_charts()
var margin = {top: 50, right: 140, bottom: 50, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "graph-svg-component")
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var _parseDate = d3.timeFormat("%Y").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.2f");

function parseDate(d) {
    var localparseDate = d3.timeParse("%Y");
    return d3.timeFormat('%a %b %d %Y %H:%M:%S')(localparseDate(d));
}

var x = d3.scaleBand().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var xAxis = svg.append("g").attr("scale", x)
    .attr("orient", "bottom").attr("ticks", "15");

var yAxis = svg.append("g").attr("scale", y)
    .attr("orient", "left").attr("ticks", "10");

var voronoi = d3.voronoi()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

// var  valueline1 = d3.svg.line()
//  .x(function(d) { return x(d.date); })
//  .y(function(d) { return y(d.california_energy_production); });

var valueline2 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.total_hydroelectric); });

var valueline3 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.nuclear); });

var valueline4 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.in_state_coal); });

var valueline5 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.oil); });

var valueline6 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.natural_gas ); });

var valueline7 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.geothermal ); });

var valueline8 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.biomass ); });

var valueline9 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.wind ); });

var valueline10 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.solar ); });

var valueline11 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.other ); });

var valueline12 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.direct_coal_imports ); });

var valueline13 = d3.line()
    // .interpolate("basis") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.other_imports ); });


function ca_energy_production_charts(svg, data) {
    console.log("HELLO WORLD")
    console.log(data)

    d3.csv("data_3.csv", function(error, data) {
        console.log(data)
        var flatData = [];
        data.forEach(function(d) {
            //d.date = parseDate(d.date);
            d.date = (d.date);
            // d.california_energy_production = +d.california_energy_production;
            d.total_hydroelectric = +d.total_hydroelectric;
            d.nuclear = +d.nuclear;
            d.in_state_coal = +d.in_state_coal;
            d.oil = +d.oil;
            d.natural_gas = +d.natural_gas;
            d.geothermal = +d.geothermal;
            d.biomass = +d.biomass;
            d.wind = +d.wind;
            d.solar = +d.solar;
            d.other = +d.other;
            d.direct_coal_imports = +d.direct_coal_imports;
            d.other_imports = +d.other_imports;
            flatData.push({date: d.date, value: d.total_hydroelectric, key: "total_hydroelectric"});
            flatData.push({date: d.date, value: d.nuclear, key: "nuclear"});
            flatData.push({date: d.date, value: d.in_state_coal, key: "in_state_coal"});
            flatData.push({date: d.date, value: d.oil, key: "oil"});
            flatData.push({date: d.date, value: d.natural_gas, key: "natural_gas"});
            flatData.push({date: d.date, value: d.geothermal, key: "geothermal"});
            flatData.push({date: d.date, value: d.biomass, key: "biomass"});
            flatData.push({date: d.date, value: d.wind, key: "wind"});
            flatData.push({date: d.date, value: d.solar, key: "solar"});
            flatData.push({date: d.date, value: d.other, key: "other"});
            flatData.push({date: d.date, value: d.direct_coal_imports, key: "direct_coal_imports"});
            flatData.push({date: d.date, value: d.other_imports, key: "other_imports"});
        });
        console.log(flatData)
    
        // Scale the range of the data
        x.domain(data.map(function(d) { return d.date; }));
        //x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return Math.max( d.total_hydroelectric, d.nuclear,d.in_state_coal, d.oil, d.natural_gas); })]) //, d.geothermal, d.biomass, d.wind, d.solar, d.other, d.direct_coal_imports, d.other_imports); })]);
    
        // Add the valueline path.
        // svg.append("path")       
        //  .attr("class", "line")
        //  .attr("d", valueline1(data));
    
        svg.append("path")      
            .attr("class", "line total_hydroelectric") 
            .attr("d", valueline2(data));
    
        svg.append("path")      
            .attr("class", "line nuclear")  
            .attr("d", valueline3(data));
    
        svg.append("path")      
            .attr("class", "line in_state_coal")
            .attr("d", valueline4(data));
    
        svg.append("path")      
            .attr("class", "line oil")  
            .attr("d", valueline5(data));
    
        svg.append("path")      
            .attr("class", "line natural_gas")  
            .attr("d", valueline6(data));
    
        svg.append("path")      
            .attr("class", "line geothermal")      
            .attr("d", valueline7(data));
    
        svg.append("path")      
            .attr("class", "line biomass")      
            .attr("d", valueline8(data));
    
        svg.append("path")      
            .attr("class", "line wind")
            .attr("d", valueline9(data));
    
        svg.append("path")      
            .attr("class", "line solar")      
            .attr("d", valueline10(data));
    
        svg.append("path")      
            .attr("class", "line other")      
            .attr("d", valueline11(data));
    
        svg.append("path")      
            .attr("class", "line direct_coal_imports")  
            .attr("d", valueline12(data));
    
        svg.append("path")      
            .attr("class", "line other_imports")      
            .attr("d", valueline13(data));
    
        svg.append("g")         // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("scale", x)
            .attr("orient", "bottom")
            .attr("ticks", "15");
    
        svg.append("g")         // Add the Y Axis
            .attr("class", "y axis")
            .call(d3.axisLeft(y))
            .attr("scale", y)
            .attr("orient", "left")
            .attr("ticks", "10");
    
        var focus = svg.append("g")
          .attr("class", "focus")
          .attr("transform", "translate(-100,-100)");
    
        focus.append("circle")
          .attr("r", 4.5);
    
        focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");
    
        svg.append("text")
            // .attr("class", "sources")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].total_hydroelectric) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Total Hydroelectric");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].nuclear) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Nuclear");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].in_state_coal) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("In State Coal");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].oil) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Oil");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].natural_gas) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Natural Gas");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].geothermal) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Geotheral");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].biomass) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Biomass");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].wind) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Wind");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].solar) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Solar");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].other) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Other");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].direct_coal_imports) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Direct Coal Imports");
    
        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(data[30].other_imports) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "#898989")
            .text("Other Imports");
    
        var voronoiGroup = svg.append("g")
          .attr("class", "voronoi");
          
        voronoiGroup.selectAll("path")
          .data(voronoi(flatData).polygons())
          .enter().append("path")
          .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
          .datum(function(d) { return d.point; })
          .data(flatData)
        //   .on("mousemove", mousemove)
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
    
      function mouseover(d) {
          console.log(d);
          d3.select("."+d.key).classed("line-hover", true);
          focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
          focus.select("text").text(d.date + " value:" + d.value);
        }
      
        function mouseout(d) {
          d3.select("."+d.key).classed("line-hover", false);
          focus.attr("transform", "translate(-100,-100)");
        }
    
    });
    return true;

}
