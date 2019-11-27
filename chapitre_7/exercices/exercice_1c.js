function ajax() {
    let req = Xhr();
    req.open("GET", "resources/sourceJson.json", true);
    req.send(null);
    let html = '';
    req.onreadystatechange = function () {
        if(this.readyState === this.DONE && this.status === 200) {
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

_cn('div',{id: 'resultat'},{}, document.body);
let link = _cn('a',{href: 'javascript:ajax();'},{}, document.body);
_ct('Clique !', link);