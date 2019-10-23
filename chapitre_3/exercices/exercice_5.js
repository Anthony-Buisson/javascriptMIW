document.getElementById('exercice').innerHTML =
    '<input type="text" onchange="updateReverse(\'reverse\',this.value)"><section id="reverse"></section><br>';

function updateReverse(el, value) {
    document.getElementById(el).innerHTML = reverse(value);
}

//utlisable dans une bibliotheque
function reverse(value){
    return value.split('').reverse().join('');
}