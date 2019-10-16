let N1 = parseInt(prompt("Choisissez un nombre compris entre 2 et 9 : "));

while(N1<2 || N1>9 || isNaN(N1)){
    N1 = parseInt(prompt("Le nombre n'est pas compris entre 2 et 9 : "));
}
let f = window.open("","","width=200, height=300");

    f.document.write("<table style='display: flex;justify-content: center; align-items: center'>");
    for(let i=0;i<11;i++){
        f.document.write("<tr><td>"+i +"*"+N1+" =</td><td>"+i*N1+"</td></tr>");
    }
    f.document.write("</table>");