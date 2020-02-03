

const d3 = require('d3');

const svg = d3.select('svg')

const vb = svg.attr('viewBox');
const w = vb.split(' ')[2];
const h = vb.split(' ')[3];

const counties = d3.select('#county-group').selectAll('g').attr('opacity', 1);


// d3.select('#county-group').selectAll('g').selectAll('path').filter((d, i) => i !== 0).attr('fill', '#000').attr('opactity', .6)



const label = svg.select('#label').attr('opacity', 0);
const candlabels = svg.select('#cand-label-group').attr('opacity', 0);
const statLabels = svg.select('#stat-label-group').attr('opacity', 0);
const controlPanel = svg.select('#control-panel').attr('opacity', 0);


// counties
// .on('mouseenter', function() {
//   // d3.select(this).select('path').attr('opacity', 1).transition().attr('fill', 'black').attr('opacity', 0.8)
//   d3.select(this).transition().attr('transform', `translate(${874 * Math.random()}, ${564 * Math.random()})`);
// })
// .on('click', function() {
// })


const results = require('./county-results.json')

const colorMap = {
  clinton: '#0566B2',
  sanders: '#E23950',
  tie: 'gray'
}

console.log(results);

const dRaceResults = results.races[1].countyResults;

dRaceResults.forEach((d, i) => {
  const fipsCode = +d.fipsCode.replace('19', '');
  // console.log('selector', '#county-' + fipsCode)
  const countySelect = d3.selectAll('#county-' + fipsCode)

  // console.log()



  let winner = d.candidates[0].votes > d.candidates[1].votes ? 'clinton' : 'sanders';
  winner = d.candidates[0].votes === d.candidates[1].votes ? 'tie' : winner;


  if (countySelect.size() !== 1) {
    console.log(fipsCode, winner, countySelect.size(), countySelect)
  }

  countySelect
    .select('path')
    .transition()
    .delay(500 + i * 30)
    .duration(1500)
    .attr('fill', colorMap[winner])



});

label.transition().delay(1000).duration(1500).attr('opacity', 1)
candlabels.transition().delay(1000).duration(1500).attr('opacity', 1)
controlPanel.transition().delay(1000).duration(1500).attr('opacity', 1)

let STATE = 'map';

const _transformCache = {};
svg.select('#button-sort').on('click', ()  => {

  if (STATE === 'sort') {
    return;
  }
  svg.select('#background-sort').attr('fill', '#6EDAF4')
  svg.select('#background-map').attr('fill', '#ddd')

  controlPanel.selectAll('#income').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#education').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#winner').select('#underliner').attr('opacity', 1)

  statLabels.transition().delay(1000).duration(1500).attr('opacity', 0)
  candlabels.transition().delay(1000).duration(1500).attr('opacity', 1)

dRaceResults.forEach((d, i) => {
  const fipsCode = +d.fipsCode.replace('19', '');
  // console.log('selector', '#county-' + fipsCode)
  const countySelect = d3.selectAll('#county-' + fipsCode)

  // console.log()



  let winner = d.candidates[0].votes > d.candidates[1].votes ? 'clinton' : 'sanders';
  winner = d.candidates[0].votes === d.candidates[1].votes ? 'tie' : winner;


  if (countySelect.size() !== 1) {
    console.log(fipsCode, winner, countySelect.size(), countySelect)
  }

  countySelect
    .select('path')
    .transition()
    .delay(500 + i * 30)
    .duration(1500)
    .attr('fill', colorMap[winner])



});


  STATE = 'sort';
  dRaceResults.forEach((d, i) => {
    const fipsCode = +d.fipsCode.replace('19', '');
    // console.log('selector', '#county-' + fipsCode)
    const countySelect = d3.selectAll('#county-' + fipsCode)

    // console.log()

    if (!_transformCache[fipsCode]) {
      _transformCache[fipsCode] = countySelect.attr('transform');
    }

    let winner = d.candidates[0].votes > d.candidates[1].votes ? 'clinton' : 'sanders';
    winner = d.candidates[0].votes === d.candidates[1].votes ? 'tie' : winner;

    let x, y;
    switch(winner) {
      case 'tie':
        x = w / 2 - 150 + 150 * (Math.random() - 0.5);
        y = Math.random() * h / 2;
        break;
      case 'sanders':
        x = 3 * w / 4 - 150 + 150 * (Math.random() - 0.5);;
        y = Math.random() * h / 2;
        break;
      case 'clinton':
        x = w / 4 - 150 + 150 * (Math.random() - 0.5);;
        y = Math.random() * h / 2;
        break;

    }

    countySelect
      .transition()
      .delay(500 + i * 30)
      .duration(1500)
      .attr('transform', `translate(${x}, ${y})`)
  });
})
svg.select('#button-map').on('click', ()  => {

  if (STATE === 'map') {
    return;
  }
  STATE = 'map';

  svg.select('#background-map').attr('fill', '#6EDAF4')
  svg.select('#background-sort').attr('fill', '#ddd')
  dRaceResults.forEach((d, i) => {
    const fipsCode = +d.fipsCode.replace('19', '');
    // console.log('selector', '#county-' + fipsCode)
    const countySelect = d3.selectAll('#county-' + fipsCode)

    // console.log()



    let winner = d.candidates[0].votes > d.candidates[1].votes ? 'clinton' : 'sanders';
    winner = d.candidates[0].votes === d.candidates[1].votes ? 'tie' : winner;

    countySelect
      .transition()
      .delay(500 + i * 30)
      .duration(1500)
      .attr('transform', _transformCache[fipsCode])
  });
})





const countyData = require('./county-data.json')


controlPanel.selectAll('#winner').on('click',  () => {
  console.log('selected winner')
  controlPanel.selectAll('#income').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#education').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#winner').select('#underliner').attr('opacity', 1)

  statLabels.attr('opacity', 0)
  candlabels.attr('opacity', 1)

dRaceResults.forEach((d, i) => {
  const fipsCode = +d.fipsCode.replace('19', '');
  // console.log('selector', '#county-' + fipsCode)
  const countySelect = d3.selectAll('#county-' + fipsCode)

  // console.log()



  let winner = d.candidates[0].votes > d.candidates[1].votes ? 'clinton' : 'sanders';
  winner = d.candidates[0].votes === d.candidates[1].votes ? 'tie' : winner;


  if (countySelect.size() !== 1) {
    console.log(fipsCode, winner, countySelect.size(), countySelect)
  }

  countySelect
    .select('path')
    .transition()
    .attr('fill', colorMap[winner])



});

})

controlPanel.selectAll('#income').on('click',  () => {
  console.log('selected income')
  controlPanel.selectAll('#winner').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#education').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#income').select('#underliner').attr('opacity', 1)

  statLabels.attr('opacity', 1)
  candlabels.attr('opacity', 0)

  const colorScale = d3.scaleLinear().domain([10000,80000]).range(['#000', '#fff']);


  countyData.objects.counties.geometries.forEach((d) => {
    const fipsCode = +d.properties['GEOID'].replace('19', '');
    const countySelect = d3.selectAll('#county-' + fipsCode)
    countySelect
      .select('path')
      .transition()
      .attr('fill', colorScale(+d.properties.income))

  })
})

controlPanel.selectAll('#education').on('click',  () => {

  console.log('selected education')
  controlPanel.selectAll('#income').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#winner').select('#underliner').attr('opacity', 0)
  controlPanel.selectAll('#education').select('#underliner').attr('opacity', 1)

  statLabels.attr('opacity', 1)
  candlabels.attr('opacity', 0)

  const colorScale = d3.scaleLinear().domain([0,1]).range(['#000', '#fff']);

  countyData.objects.counties.geometries.forEach((d) => {
    const fipsCode = +d.properties['GEOID'].replace('19', '');
    const countySelect = d3.selectAll('#county-' + fipsCode)
    countySelect
      .select('path')
      .transition()
      .attr('fill', colorScale(+d.properties.collegepct/100))

  })
})
