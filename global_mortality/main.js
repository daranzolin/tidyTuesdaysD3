d3.csv("data/usa_drugs.csv").then(function(data) {

    //console.log(data);
    data[10].year= "2000";

    const margin = {top: 10, right: 30, bottom: 40, left: 40};
    const h = 500;
    const w = 950;

    function make_y_gridlines() {		
        return d3.axisLeft(y);
    };

    const svg = d3.select("body")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

    let parseTime = d3.timeParse("%Y");

    let tip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d) {return `<span> Year: ${d.year} </span> <br> <span> Percent: ${d.percent} </span>`})
        .offset([-15, -25]); 

    let y = d3.scaleLinear()
        .domain([0, 1.5])
        .range([h - margin.bottom, margin.top]);

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => parseTime(d.year)))
        .range([margin.left, w]);

    let xAxis = d3.axisBottom()
        .scale(x)
        .ticks(20);

    let yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    let line = d3.line()
        .x(function(d) { return x(parseTime(d.year)); })
        .y(function(d) { return y(d.percent); });
    
    svg.append("clipPath")               
        .attr("id", "chart-area")        
        .append("rect")                     
        .attr("width", `${w - margin.left}`)
        .attr("height", `${h - (margin.top + margin.bottom)}`)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(make_y_gridlines()
            .tickSize(-(w - margin.left))
            .tickFormat("")
        );

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)

    svg.call(tip);

    svg.append("g")                                        
        .attr("clip-path", "url(#chart-area)")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "circle")
        .attr("cx", d => x(parseTime(d.year)))
        .attr("cy", d => y(d.percent))
        .attr("r", 0)
        .attr("stroke", "black")
        .attr("fill", "pink")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .transition()
        .delay((d, i) => i * 110)
        .duration(800)
        .attr("r", 5);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${h - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
    
    svg.append("text")
        .attr("x", "67")
        .attr("y", `${margin.top + 14}`)
        .attr("class", "axisLabel")
        .text("Percent");

    svg.append("text")
        .attr("x", `${w/2}`)
        .attr("y", `${h - 10}`)
        .attr("class", "axisLabel")
        .text("Year");
    
});