let nom = window.prompt('Nom');
alert('Bonjour '+nom);
document.getElementById('exercice_12').innerHTML = '<h1>Bonjour '+nom+'</h1>';
document.getElementById('exercice_12').innerHTML += '<br><h1 style="color:red;font-weight: bold;">Bonjour '+nom+'</h1>';