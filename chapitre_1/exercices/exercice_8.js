let nom = window.prompt('Nom : ');
let prenom = window.prompt('Prénom : ');
alert('Nombre de caractères dans ' +nom+' : '+nom.length+'\n'+
    'Nombre de caractères dans ' +prenom+' : '+prenom.length+'\n'+
    'Trois premiers caractères de ' +nom+' : '+nom.slice(0,3)+'\n'+
    'Trois derniers caractères de ' +prenom+' : '+prenom.slice(prenom.length-3)
    );