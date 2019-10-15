let number = prompt('Nombre');
let f = window.open("","","width=200, height=200");
f.document.write('Ce nombre est '+(pair(parseFloat(number))?'pair':'impair'));