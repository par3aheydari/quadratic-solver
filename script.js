let chart;

function solveQuadratic() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  const realDiv = document.getElementById('realResult');
  const complexDiv = document.getElementById('complexResult');

  if(isNaN(a) || isNaN(b) || isNaN(c)) {
    realDiv.innerHTML = "Please fill all fields!";
    complexDiv.innerHTML = "";
    return;
  }

  if(a === 0) {
    realDiv.innerHTML = "This is not a quadratic equation!";
    complexDiv.innerHTML = "";
    return;
  }

  const discriminant = b*b - 4*a*c;

  if(discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
    realDiv.innerHTML = `Real solutions: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    complexDiv.innerHTML = "";
  } else if(discriminant === 0) {
    const x = -b / (2*a);
    realDiv.innerHTML = `Real solution: x = ${x.toFixed(2)}`;
    complexDiv.innerHTML = "";
  } else {
    const realPart = (-b / (2*a)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2*a)).toFixed(2);
    realDiv.innerHTML = "";
    complexDiv.innerHTML = `Complex solutions: x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
  }

  drawChart(a, b, c);
}

function drawChart(a, b, c) {
  const ctx = document.getElementById('quadraticChart').getContext('2d');
  const xValues = [];
  const yValues = [];

  for(let x = -10; x <= 10; x += 0.1){
    xValues.push(x.toFixed(2));
    yValues.push(a*x*x + b*x + c);
  }

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{
        label: 'y = ax² + bx + c',
        data: yValues,
        borderColor: '#00ff99',
        backgroundColor: 'rgba(0,255,153,0.2)',
        tension: 0.2,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      animation: false,
      scales: {
        x: {
          min: -10,
          max: 10,
          grid: { color: '#00ff5544' },
          ticks: { color: '#00ff99', font: { size: 12 } },
          title: { display: true, text: 'X-axis', color: '#00ff99', font: { size: 14 } }
        },
        y: {
          min: -10,
          max: 10,
          grid: { color: '#00ff5544' },
          ticks: { color: '#00ff99', font: { size: 12 } },
          title: { display: true, text: 'Y-axis', color: '#00ff99', font: { size: 14 } }
        }
      },
      plugins: { legend: { labels: { color: '#00ff99' } } }
    },
    plugins: [{
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;

        // Y-axis خط قرمز
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xScale.getPixelForValue(0), yScale.top);
        ctx.lineTo(xScale.getPixelForValue(0), yScale.bottom);
        ctx.strokeStyle = '#ff3300';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // X-axis خط قرمز
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xScale.left, yScale.getPixelForValue(0));
        ctx.lineTo(xScale.right, yScale.getPixelForValue(0));
        ctx.strokeStyle = '#ff3300';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    }]
  });
}
