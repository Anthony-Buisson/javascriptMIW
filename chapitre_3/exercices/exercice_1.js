document.getElementById('exercice1')
    .innerHTML = '<form>' +
                    '<textarea id="textarea"></textarea>' +
                    '<p id="output">Nombre de caractères : </p>' +
                    '<button type="reset">Reset</button>' +
                    '<button type="button" onclick="count(\'textarea\', \'output\')">Longueur</button>' +
                '</form>';

//Prend la valeur de input et la met dans output
function count(input, output) {
    document.getElementById(output).innerHTML = 'Nombre de caractères : ' + document.getElementById(input).value.replace('\n','').length;
}