function solveQuadratic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const resultDiv = document.getElementById('result');
  
    if(a === 0) {
      resultDiv.innerHTML = "This is not a quadratic equation!";
      return;
    }
  
    const discriminant = b*b - 4*a*c;
  
    if(discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
      resultDiv.innerHTML = `Two real solutions: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    } else if(discriminant === 0) {
      const x = -b / (2*a);
      resultDiv.innerHTML = `One real solution: x = ${x.toFixed(2)}`;
    } else {
      const realPart = (-b / (2*a)).toFixed(2);
      const imagPart = (Math.sqrt(-discriminant) / (2*a)).toFixed(2);
      resultDiv.innerHTML = `Two complex solutions: x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
    }
  }
  