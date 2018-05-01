
d3.csv("data/usa_drugs.csv").then(function(data) {

    console.log(data);

    const margin = ({top: 10, right: 0, bottom: 20, left: 30});
    const h = 500;
    const w = 500;

    const svg = d3.select("body")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

    let y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.percent))
        .range([h - margin.bottom, margin.top]);

    let x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, w]);

    let xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10);

    let yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    let line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.percent); });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${h - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

});
