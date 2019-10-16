let n1 = parseFloat(prompt('Nombre 1'));
let n2 = parseFloat(prompt('Nombre 2'));
let n3 = parseFloat(prompt('Nombre 3'));
alert('Nombres : '+[n1,n2,n3].toString()+
    '\nSomme : '+(n1+n2+n3).toString()+
    '\nMoyenne : '+((n1+n2+n3)/3).toFixed(2)+
    '\nMax : '+Math.max(n1,n2,n3).toString()+' | Min : '+Math.min(n1,n2,n3)+
    '\nOrdre croissant : '+[n1,n2,n3].sort().toString());
