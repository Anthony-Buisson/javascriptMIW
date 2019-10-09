let regSecu = new RegExp('[12] +\\d{2} +\\d{2} +\\d{2} +\\d{3} +\\d{3} +/ +\\d{2}','g');
let numSecu = '1 22 33 44 555 666 / 77 rnivnevio 1 23 33 44 555 666 / 77 2o2 3 22 33 44 555 666 / 77 vebiiybe 1 24 33 44 555 666 / 77 1 25 33 44 555 666 / 77';
let results = numSecu.match(regSecu).toString();
console.log('Numéros trouvés : '+results);
console.log('Numéros cachés : '+results.replace(new RegExp('\\d','g'), '*'));