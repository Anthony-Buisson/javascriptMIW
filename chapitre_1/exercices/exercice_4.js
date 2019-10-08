let date = new Date(Date.now());
console.log(date);
alert('Date de dernière mise à jour : '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+', URL de la page : '+document.baseURI);