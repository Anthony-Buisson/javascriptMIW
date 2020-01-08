MiwUnit = {
    test: function(titre,p2){
        let a = document.createElement('div');
        let d = document.createElement('div');
        b = document.createElement('div');

        document.body.appendChild(a);
        d.style.backgroundColor ='grey';
        d.innerHTML = titre;
        a.appendChild(d);
        a.appendChild(b);
        b.style.display = 'block';
        a.addEventListener('click',function () {
            b.style.display === 'block' ? b.style.display = 'none' : b.style.display = 'block';
        });

        essais = [0,0];
        let start = performance.now();
        p2();
        let end = performance.now();
        let p = document.createElement('div');
        p.innerText = 'Nb tests : '+essais[0]+' Passed : '+essais[1]+' Failed : '+(essais[0]-essais[1])+' Durée d\'exécution '+((end-start) > 1 ? Math.round(end-start) : '< 1')+'ms';
        p.style.backgroundColor ='grey';
        p.style.marginBottom = '1rem';
        a.appendChild(p);
        delete essais;
    },
    assert: (result, message)=>{
        essais[0]++;
        if(result) essais[1]++;
        let c = document.createElement('div');
        message=(result?'TEST REUSSI >> ':'TEST EN ECHEC >> ') + message;
        c.style.backgroundColor = result ? 'green' : 'red';
        c.style.color= "white";
        c.innerHTML = message;
        b.appendChild(c);
    }
};
