class ISBN{

    static isbnFormat = /^97[89]-\d-\d{5}-\d{3}-\d$/;

    conformeISBN(){
        return ISBN.isbnFormat.test(this.isbn);
    };

    valideISBn() {
        let n = this.isbn.replace(/-/g,'')+'0';
        let somme = 0;
        for (let i = 0; i < n.length; i+=2) {
            somme+= n[i]*1 + n[i+1]*3;
        }
        return somme%10 === 0;
    };

    test(){
        if(this.isbn == null)
            return 'Saisir un numéro ISBN';
        else if(!this.conformeISBN())
            return 'ISBN non conforme';
        else if(!this.valideISBn()){
            return 'ISBN non valide';
        } else
            return 'ISBN valide';
    };

    display(x, y){
        let form = document.createElement('form');
        let label = document.createElement('label');
        let input = document.createElement('input');
        let br = document.createElement('br');
        let button = document.createElement('button');
        let output = document.createElement('input');

        label.appendChild(document.createTextNode('ISBN-13 : '));

        input.type = 'text';
        input.pattern = `${ISBN.isbnFormat}`;
        input.required = true;
        input.onchange = ()=>{ this.isbn = input.value; };

        button.type = 'button';
        button.appendChild(document.createTextNode('OK'));
        button.onclick = ()=>{ output.value = this.test(); };

        output.type = 'text';
        output.readOnly = true;

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(br);
        form.appendChild(button);
        form.appendChild(output);
        form.style['position'] = 'absolute';
        form.style['top'] = y+'px';
        form.style['left'] = x+'px';

        return form;
    }
}
/*
let isbn = new ISBN();
let isbn2 = new ISBN();
let isbn3 = new ISBN();

document.body.appendChild(isbn.display(100,200));
document.body.appendChild(isbn2.display(500,300));
document.body.appendChild(isbn3.display(300,400));
*/
