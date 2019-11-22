function Xhr() {
    let obj = null;
    try{obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch (Error) { try {obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch (Error) { try {obj = new XMLHttpRequest();}
    catch(Error) { alert('Impossible de créer l\'objet XMLHttpRequest');}}}
    return obj;
}

function ajax() {
    let req = Xhr();
    req.open("GET", "resources/sourceJson.json", true);
    req.send(null);
    let html = '';
    req.onreadystatechange = function () {
        if(this.readyState === this.DONE) {
            html += `<table>`;
            JSON.parse(req.responseText).forEach(function (el) {
                html += `<tr>
            <td>${el.nom}</td>
            <td>${el.prenom}</td>
            <td>${el.age}</td>
        </tr>`
            });
            _('#resultat').innerHTML += html+`</table>`;
        }
    };
    _('a').style.visibility = 'hidden';
}