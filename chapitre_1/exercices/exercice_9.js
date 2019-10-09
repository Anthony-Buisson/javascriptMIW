let n1 = window.prompt('Réel 1 : ');
let n2 = window.prompt('Réel 2 : ');
n1 = parseFloat(n1);
n2 = parseFloat(n2);
alert('N1+N2 = ' +(n1+n2).toFixed(2)+'\n'+
    'Valeur maximale= ' +Math.max(n1,n2)+'\n'+
    'Entier >= ' +n1+' : '+Math.ceil(n1)+'\n'+
    'Entier <= ' +n2+' : '+Math.floor(n2)
);