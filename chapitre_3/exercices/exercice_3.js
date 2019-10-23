document.getElementById('exercice2').innerHTML =
    '<input id="euros" type="number" step="0.001" onchange="update(\'francs\',this.value)"><label>Euros</label><br>' +
    '<input id="francs" type="number" step="0.001" onchange="update(\'euros\',this.value)"><label>Francs</label><br>';

function update(currency, value) {
    if(currency === 'francs') document.getElementById('francs').value = (value*6.5799).toFixed(2);
    if(currency === 'euros') document.getElementById('euros').value = (value/6.5799).toFixed(2);
}