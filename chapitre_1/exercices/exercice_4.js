let date = new Date(document.lastModified);
console.log(document.lastModified);
alert('Date de dernière mise à jour : '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+', URL de la page : '+document.baseURI);