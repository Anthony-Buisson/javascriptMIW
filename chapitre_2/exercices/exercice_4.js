let n = prompt('Saisir N : ');
entierPositif(n)?alert('Somme des '+n+" premiers nombres : "+((parseInt(n)*(parseInt(n)+1))/2)):alert('N n\'est pas un entier positif');