let data = d3.csv("data/acs2015_county_data.csv").then(function(data) { 
    // Question 1: Do I need to parse each row here?
    //console.log(data);

    const margin = {top: 10, right: 30, bottom: 40, left: 40};
    const h = 500;
    const w = 950;

    let svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.Income)]).nice()
        .range([margin.left, w - margin.right]);
    
    let bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(50))
        (+data.Income); // Question 2: Should this be (data) or (data.Income) or (+data.Income)?

    let y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)]).nice() // Question 3: Something is wrong here, but I don't know what
        .range([h - margin.bottom, margin.top]);

    let xAxis = g => g // Question 4: How is this different than svg.append("g").attr()...?
        .attr("transform", `translate(0,${h - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.append("text")
        .attr("x", w - (margin.right + 40))
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text("Income"));

    let yAxis = g => g
        .call(d3.axisLeft(y))
        .attr("transform", `translate(${margin.left},0)`)

    const bar = svg.append("g")
        .attr("fill", "pink")
        .attr("stroke", "black")
        .selectAll("rect")
        .data(bins)
        .enter().append("rect")
        .attr("x", d => x(+d) + 1) //Question 5: what value should this attribute take?
        .attr("width", 10) //Question 6: what value should this attribute take?
        .attr("y", d => y(d.length)) //Question 7: what value should this attribute take?
        .attr("height", d => y(0) - y(d.length)); //Question 8: what value should this attribute take?
  
    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);

});