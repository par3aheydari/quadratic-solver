function solveQuadratic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
  
    const realDiv = document.getElementById('realResult');
    const complexDiv = document.getElementById('complexResult');
    const canvas = document.getElementById('quadraticCanvas');
  
    if(isNaN(a) || isNaN(b) || isNaN(c)) {
      realDiv.innerHTML = "Please fill all fields!";
      complexDiv.innerHTML = "";
      canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
      return;
    }
  
    if(a === 0) {
      realDiv.innerHTML = "Not a quadratic equation!";
      complexDiv.innerHTML = "";
      canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
      return;
    }
  
    // محاسبه ریشه‌ها
    const discriminant = b*b - 4*a*c;
    let roots = [];
    if(discriminant > 0){
      const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
      roots = [x1,x2];
      realDiv.innerHTML = `Real: x₁=${x1.toFixed(2)}, x₂=${x2.toFixed(2)}`;
      complexDiv.innerHTML = "";
    } else if(discriminant === 0){
      const x = -b/(2*a);
      roots = [x];
      realDiv.innerHTML = `Real: x=${x.toFixed(2)}`;
      complexDiv.innerHTML = "";
    } else {
      const realPart = (-b/(2*a)).toFixed(2);
      const imagPart = (Math.sqrt(-discriminant)/(2*a)).toFixed(2);
      realDiv.innerHTML = "";
      complexDiv.innerHTML = `Complex: x₁=${realPart}+${imagPart}i, x₂=${realPart}-${imagPart}i`;
    }
  
    drawCanvas(a,b,c,canvas);
  }
  
  function drawCanvas(a,b,c,canvas){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    const width = canvas.width;
    const height = canvas.height;
    const scaleX = width/20; // x=-10..10
    const scaleY = height/20; // y=-10..10
  
    // بک‌گراند
    const bg = ctx.createLinearGradient(0,0,0,height);
    bg.addColorStop(0,'#0f0f0f');
    bg.addColorStop(1,'#1a1a1a');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,width,height);
  
    ctx.save();
    ctx.translate(width/2,height/2);
    ctx.scale(1,-1);
  
    // Grid
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#004400';
    for(let i=-10;i<=10;i++){
      // عمودی
      ctx.beginPath();
      ctx.moveTo(i*scaleX,-height/2);
      ctx.lineTo(i*scaleX,height/2);
      ctx.stroke();
      // افقی
      ctx.beginPath();
      ctx.moveTo(-width/2,i*scaleY);
      ctx.lineTo(width/2,i*scaleY);
      ctx.stroke();
    }
  
    // محور X و Y
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff3300';
    ctx.beginPath();
    ctx.moveTo(-width/2,0);
    ctx.lineTo(width/2,0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,-height/2);
    ctx.lineTo(0,height/2);
    ctx.stroke();
  
    // نمودار پارابولا
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00ff99';
    ctx.beginPath();
    for(let x=-10; x<=10; x+=0.01){
      let y = a*x*x + b*x + c;
      let px = x*scaleX;
      let py = y*scaleY;
      if(x===-10) ctx.moveTo(px,py);
      else ctx.lineTo(px,py);
    }
    ctx.stroke();
  
    ctx.restore();
  }
  