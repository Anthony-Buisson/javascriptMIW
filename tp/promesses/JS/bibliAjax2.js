cl=(data)=>{return console.log(data)};

$get=(url,data)=> {
  return new Promise( (resolve, reject) =>{
	let getUrl=(objet)=>{ 
	  	var result = new Array(); 
	  	for(var i in objet){ 
	  	         result.push(i+"="+encodeURIComponent(objet[i])); 
	    } 
	    return result.join('&');
	};

	let Xhr=()=>{
      let xhr = null;   
      if (window.XDomainRequest) {
          xhr = new XDomainRequest(); 
      } else if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest(); 
      } else {
          alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
      }
      return xhr; 
  }

  xhttp = Xhr();  // xhttp objet de type XMLHttpRequest

  // ancienne méthode
  
  xhttp.onreadystatechange = function(){
	     if (this.readyState == 4 ){
		     if (this.status == 200) resolve(this);
			                      else reject(this);
	     }
  }

  url += "?"+getUrl(data)+"& cache="+new Date().getTime() ;
  xhttp.open("get", url, true);
  xhttp.send();
  }
  )
}

$post=(url,data)=>{
  return new Promise( (resolve, reject) =>{
  let getUrl=(objet)=>{ 
        var result = new Array(); 
        for(var i in objet){ 
                 result.push(i+"="+encodeURIComponent(objet[i])); 
        } 
        return result.join('&') ;
    };

  let Xhr=()=>{
        let xhr = null;   
        if (window.XDomainRequest) {
            xhr = new XDomainRequest(); 
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest(); 
        } else {
            alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
        }
        return xhr; 
    }

    xhttp =  Xhr();  // xhttp objet de type XMLHttpRequest

    // Nouvelle méthode : plus simple

    xhttp.onload=function(){
      if (this.status==200) resolve(this);
                       else reject(this);
    }   

  data = getUrl(data)+"& cache="+new Date().getTime();
  xhttp.open("post", url, true);
  xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhttp.send(data);

  }
  )
}



