function solveQuadratic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const resultDiv = document.getElementById('result');
  
    if(a === 0) {
      resultDiv.innerHTML = "این یک معادله درجه دو نیست!";
      return;
    }
  
    const discriminant = b*b - 4*a*c;
  
    if(discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
      resultDiv.innerHTML = `دو جواب واقعی: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    } else if(discriminant === 0) {
      const x = -b / (2*a);
      resultDiv.innerHTML = `یک جواب واقعی: x = ${x.toFixed(2)}`;
    } else {
      const realPart = (-b / (2*a)).toFixed(2);
      const imagPart = (Math.sqrt(-discriminant) / (2*a)).toFixed(2);
      resultDiv.innerHTML = `دو جواب مختلط: x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
    }
  }
  