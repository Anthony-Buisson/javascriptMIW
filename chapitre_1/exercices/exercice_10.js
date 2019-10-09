let date;
setInterval(function () {
    date = new Date(Date.now());
    document.getElementById('exercice_10').innerHTML = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'<br>'+
        date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}, 1000);