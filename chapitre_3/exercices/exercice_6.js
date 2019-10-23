document.getElementById('exercice').innerHTML =
    '<input type="text" onchange="estPalindrome(this.value)"><br>';

function estPalindrome(value) {
    let valueNoSpace = value.replace(/\s/g,'');
    let f = window.open("","", 'width=200px,height=200px');
    f.document.write(valueNoSpace === reverse(valueNoSpace) ? '<i>'+value+'</i>' + ' est un palindrome' : '<i>'+value+'</i>' + ' n\'est pas un palindrome');
    reverse(value);
}

//utlisable dans une bibliotheque
function reverse(value){
    return value.split('').reverse().join('');
}