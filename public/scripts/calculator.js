function amt(z,m,n)
{
  var amortization
  if (z == 1.0) amortization = n + 1
  else amortization = (Math.pow(z,n + 1) - 1)/(z - 1)
  if (m >= 1) amortization -= atm(z,0,m-1)
  //console.log(amortization)
  return amortization;
}

function futureValue(p,r,y)
{
   var total = p*Math.pow(1+r,y)
   //console.log(total)
   return total
}

function mortgagePayment(p,r,y)
{
  return futureValue(p,r,y)/amt(1+r,0,y-1)
}

function doCalc(p,r,y)
{
   var p = document.mainform.p.value; // Present Value
   var r = document.mainform.r.value/100; // Interest Rate
   var y = document.mainform.y.value; // Number of Years

   document.mainform.payment.value = mortgagePayment(p,r/12,y*12).toFixed(2)
}