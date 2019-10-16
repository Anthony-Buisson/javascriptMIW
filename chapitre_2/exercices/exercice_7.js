let f = window.open("","","width=200, height=300");

for(let i=1;i<51;i++){
    f.document.write(i);
    f.document.write(" ---> "+i * i+" </br>");
}
