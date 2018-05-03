
d3.csv("data/usa_drugs.csv").then(function(data) {

    console.log(data);

    const margin = ({top: 10, right: 10, bottom: 40, left: 40});
    const h = 500;
    const w = 500;

    const svg = d3.select("body")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

    let parseTime = d3.timeParse("%Y");

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.percent)])
        .range([h - margin.bottom, margin.top]);

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => parseTime(d.year)))
        .range([margin.left, w]);

    let xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10);

    let yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    let line = d3.line()
        .x(function(d) { return x(parseTime(d.year)); })
        .y(function(d) { return y(d.percent); });

    svg.append("rect")
        .attr("width", `${w - (margin.left + margin.right)}`)
        .attr("height", `${h - (margin.top + margin.bottom)}`)
        .attr("fill", d3.rgb("#edeff2"))
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
    
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(parseTime(d.year)))
        .attr("cy", d => y(d.percent))
        .attr("r", 0)
        .transition()
        .delay((d, i) => i * 100)
        .duration(1200)
        .attr("r", 4)
        .attr("fill", "red");

    svg.append("g")
        .attr("transform", `translate(0,${h - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
    
    svg.append("text")
        .attr("x", "20")
        .attr("y", `${margin.top - 2}`)
        .attr("class", "axisLabel")
        .text("Percent");

    svg.append("text")
        .attr("x", `${w - margin.left}`)
        .attr("y", `${h - 10}`)
        .attr("class", "axisLabel")
        .text("Year");

});
