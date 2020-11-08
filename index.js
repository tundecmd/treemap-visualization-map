const svg = d3.select('svg');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';
const margin = {
    top: 50,
    right: 50,
    left: 50,
    bottom: 50
}
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const zoomG = svg.attr('width', width)
                .attr('height', height)
                .append('g');

        const g = zoomG
                 .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
    

const treeLayout = d3.tree().size([innerHeight, innerWidth]);

            
svg.call(d3.zoom().on('zoom', () => {
    zoomG.attr('transform', d3.event.transform)
}))




d3.json(url, function(error, data) {
    if (error) {
        throw error
    }

    const root = d3.hierarchy(data)
    const links = treeLayout(root).links()
    const linkPathGenerator = d3.linkHorizontal()
                                .x(d => d.y)
                                .y(d => d.x)

    svg.selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('d', linkPathGenerator)

    svg.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.y)
        .attr('y', d => d.x)
        .attr('dy', '0.32em')
        .attr('text-anchor', d => d.children ? 'middle' : 'start')
        .attr('font-size', d => 2 - d.depth + 'em')
        .text(d => d.data.name)

})