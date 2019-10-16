let n = prompt('Saisir N : ');
entierPositif(n)?alert('Somme des '+n+" premiers nombres : "+((parseInt(n)*(parseInt(n)+1))/2)):alert('N n\'est pas un entier positif');
/*Explication ligne 2 :
if(entierPositif(n)){
    alert('Somme des '+n+' premiers nombres : ' + ((parseInt(n)*(parseInt(n)+1))/2));
}
else{
    alert('N n\'est pas un entier positif');
}
*/