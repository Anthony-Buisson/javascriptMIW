document.getElementById('exercice').innerHTML =
    `<form>
        Montant de l'emprunt :<input type="text"   name="mo" value="150000">
        Taux mensuel   :      <input type="text"   name="tx" value="0.004">
        Durée en mois  :      <input type="text"   name="du" value="240">
        <input type="button" value="exécuter" onclick="amortissement(this.form)">
    </form>
    <span id="table"></span>
`;

function amortissement(f)
{
    let mt = f.mo.value;
    let tm = f.tx.value ;
    let d  = f.du.value;

    let mensualite;

    let mensAr ;
    let mtAr ;
    let interAr;
    let amAr;

    let chHtml = "";

    if (!nombrePositif(mt) || !nombrePositif(tm)  || !nombrePositif(d)) {
        alert("saisie non valide");
        return;
    }

    mensualite = mt*tm/(1-Math.pow((1+tm*1),-d));
    mensAr = mensualite.toFixed(2) ;

    chHtml += ("<b>Mensualité= </b> ");
    chHtml += ("<b> "+mensAr+" euros</b><br><br>");
    chHtml += ("<table border=1>");
    chHtml += ("<tr><th>pèriode</th><th>restant du</th><th>intéret.</th><th>amortissement</th><th>mensualite</th></tr>");

    for(let i=1;i<=d;i++)
    {
        mtAr    = (Number(mt)).toFixed(2);
        interAr = (mt*tm).toFixed(2);
        amAr = (mensualite-(mt*tm)).toFixed(2);

        chHtml += ("<tr><td>"+i+"</td><td>"+mtAr+"</td><td>"+interAr+"</td><td><font color='red'><center>"+amAr+"</center></font></td><td>"+mensAr+"</td></tr>");
        mt -=(mensualite-(mt*tm));
    }

    chHtml += ("</table>");
    document.getElementById("table").innerHTML =chHtml;
}

function nombre(x){

    var reg = /^[+-]?((\d+\.?\d*)|(\d*\.?\d+))$/
    return reg.test(x);
}

function nombrePositif(x){
    return  (nombre(x) && x>=0);
}