const svg = d3.select('svg');
const width = 960;
const height = 400;
const url = '';

svg.attr('width', width)
    .attr('height', height)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 40)