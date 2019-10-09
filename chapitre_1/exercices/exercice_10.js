let date;
setInterval(function () {
    date = new Date();
    document.getElementById('exercice_10').innerHTML = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'<br>'+
        (date.getHours()-1)+':'+date.getMinutes()+':'+date.getSeconds();
}, 1000);