let T = [45,48,89,78];
let V = [110,128,129,178];
T.push(parseInt(prompt('Nombre a ajouter')));
T.unshift(parseInt(prompt('Nombre a ajouter')));
let Z = T.concat(V);
console.log(Z.slice(2,Z.length-2).join('/'));