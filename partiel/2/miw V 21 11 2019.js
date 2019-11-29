/*****************************************************************************************************************/
/*                                                                                                               */
/*                                Bibliothèque  MIW   version miw V  18 11 2019.js                               */
/*                                Réalisée dans le cadre des cours Javascript                                    */
/*                                De la Licence Mobilité Internet & Web   (MIW)                                  */
/*                                                                                                               */
/*                                IUT d'Aix-en-Provence Département GEA GAP                                      */
/*                                Site internet de la licence :     www.gap.univ-mrs.fr/miw                      */
/*                                                                                                               */
/*****************************************************************************************************************/

(function(){  // ief  ou fie fonction immédiatement exécutée.

	/******************************************************************************************************/
	/***********************  Les expressions régulières    ***********************************************/
	/******************************************************************************************************/
	Reg = {											               // objet contenant des expressions régulières
		required  :  /.+/,
		alpha     :  /^[a-z ._-]+$/i,
		alphanum  :  /^[a-z0-9 ._-]+$/i,
		digitSign :  /^[-+]?[0-9]+$/,
		digit     :  /^[0-9]+$/,
		nodigit   :  /^[^0-9]+$/,
		number    :  /^[-+]?(\d*\.?\d+|\d+\.?\d*)$/,
		email     :  /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/i,
		phone     :  /^(0|\+33)[1-9]( *[0-9]{2}){4}$/,
		url       :  /^(http|https):\/\/[a-z0-9\-\.\/_]+\.[a-z]{2,3}$/i,       // pour rechercher toutes les occurences de script
		cp        :  /^((0[1-9])|([1-8][0-9])|(9[0-8])|(20)|(21))[0-9]{3}$/,
		Insee     :  /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/i,

	};
	/******************************************************************************************************/
	/***********************  Les Raccourcis   pour le DOM  ***********************************************/
	/******************************************************************************************************/


	_   = 	function(sCss)	{
		if (document.querySelectorAll(sCss).length==1) { return document.querySelector(sCss);}
		else return document.querySelectorAll(sCss);
	};

	_cf = 	function()      {return document.createDocumentFragment();};

	_ct =  	function(tx,nodeInsert)	{
		let t = document.createTextNode(tx);
		if (nodeInsert) nodeInsert.appendChild(t);
		return t;
	};
	_ce = 	function(el,nodeInsert) {
		let e = document.createElement(el);
		if (nodeInsert) nodeInsert.appendChild(e);
		return e;
	};
	_cn = 	function(node,attribut,style,nodeInsert){  // pour créer un noeud avec des attributs et des styles ( attributs et style sont des objets )
		let n = _ce(node);
		n.attrib(attribut);
		n.css(style);
		if (nodeInsert) nodeInsert.appendChild(n);
		return n;
	};
	_dn = 	function(node)	{                               // pour supprimer un noeud
		node.parentNode.removeChild(node);
	}

	/******************************************************************************************************/
	/***********************  Gestion fenêtre   ***********************************************************/
	/******************************************************************************************************/

	windowWidth = function(){
		if (window.innerWidth)  return window.innerWidth            // tous les navigateurs sauf IE
		else if (document.documentElement.clientWidth)
			return document.documentElement.clientWidth; // IE Strict
		else if (document.body.clientWidth)
			return document.body.clientWidth;            // IE non strict
		else 		retun -1;                              		 // anciens navigateurs
	}

	windowHeight = function(){
		if (window.innerHeight)   return window.innerHeight;        // tous les navigateurs sauf IE
		else if (document.documentElement.clientHeight)
			return document.documentElement.clientHeight; // IE Strict
		else if (document.body.clientHeight)
			return document.body.clientHeight;           // IE non strict
		else 		return -1;	          						 // anciens navigateurs
	}

	/******************************************************************************************************/
	/*************   Raccourci pour parcourir et traiter les propriétés d'un objet  ***********************/
	/******************************************************************************************************/
	_each = function(o,f){                            // f est une fonction Callback c a d une  fonction qui sera définie au moment de l'appel de la fonction _each
		for (let i in o){f(i,o[i])}
	}
	/******************************************************************************************************/
	/***********************  Extension de toutes les classes avec la fonction  extend  *******************/
	/******************************************************************************************************/
	function extend(objDest,objSourc){
		for(var i in objSourc){objDest[i]=objSourc[i]}
	}
	/******************************************************************************************************/
	/***********************  Extension de la classe String  **********************************************/
	/******************************************************************************************************/

	extend(String.prototype,{
		left      	: function(n){return this.substring(0,n)},
		right    	: function(n){return this.substring(this.length-n)},
		capitalize	: function() {return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();},
		trim      	: function() {return this.replace(/(^\s*|\s*$)/g,"")
		}
	});
	/******************************************************************************************************/
	/***********************  Extension de la clase Array   ***********************************************/
	/******************************************************************************************************/

	extend(Array.prototype,{
		merge	: 	function(t){
			for (let i = 0; i < t.length; i++){
				this.push(t[i]);
			}
			return this;
		}
	});
	/******************************************************************************************************/
	/***********************  Extension de la clase Number  ***********************************************/
	/******************************************************************************************************/
	extend(Number.prototype,{
		p 		: 	function(n){ return Math.pow(this,n)}
	});
	/******************************************************************************************************/
	/***********************  Extension de la clase Node    ***********************************************/
	/******************************************************************************************************/
	extend(Node.prototype,{
		changeId: 	function(val){      // permet de changer l'identifiant du noeud
			this.id = val;
			return this;
		},
		css 	: 	function(obj) {          // permet d'affecter au noeud les propriétés de style contenues dans l'objet obj
			for( let i in obj ){
				this.style[i] = obj[i];
			};
			return this;
		},
		attrib 	: function(obj){        // permet d'affecter au noeud les attributs contenus dans l'objet obj
			for( let i in obj ){
				this.setAttribute(i,obj[i])
			};
			return this;
		},
		on 		: function(ev,f){
			this["on"+ev]=f;
			return this;
		},
		deleteNode 	: 	function(){       // permet de supprimer un noeud
			this.parentNode.removeChild(this);
		},
		append 	: 	function(objStr){                    //  permet d'ajouter un noeud element ou un noeud texte au noeud
			if (typeof(objStr)== "string") { this.innerHTML += objStr }
			else { this.appendChild(objStr)}
			return this;
		},
		empty 	: 	function(){ this.innerHTML="";return this}		//Permet de vider le contenu d'un noeud
	});

	/******************************************************************************************************/
	/***********************  Ajax    ***********************************************/
	/******************************************************************************************************/
	function Xhr(){                // création d'un requete HTTP en fonction du navigateur
		let obj = null;
		try { obj = new ActiveXObject("Microsoft.XMLHTTP");}
		catch(Error) { try { obj = new ActiveXObject("MSXML2.XMLHTTP");}
		catch(Error) { try { obj = new XMLHttpRequest();}
		catch(Error) { alert(' Impossible de créer l\'objet XMLHttpRequest')}
		}
		}
		return obj;
	}


	/***********************  Array prototypes    ***********************************************/
	Array.prototype.max = function () {
		if(this.length < 1){
			throw ('Erreur, tableau vide');
		}
		if(parseFloat(this[0]) != this[0]){
			throw ('Erreur, valeur non numérique');
		}
		let max = parseFloat(this[0]);
		this.forEach(function (el) {
			let floatValue = parseFloat(el);
			if(floatValue != el){
				throw ('Erreur, valeur non numérique');
			}
			if(floatValue > max) max = floatValue;
		});
		return max;
	};
	Array.prototype.min = function () {
		if(this.length < 1){
			throw ('Erreur, tableau vide');
		}
		if(parseFloat(this[0]) != this[0]){
			throw ('Erreur, valeur non numérique');
		}
		let min = parseFloat(this[0]);
		this.forEach(function (el) {
			let floatValue = parseFloat(el);
			if(floatValue != el){
				throw ('Erreur, valeur non numérique');
			}
			if(floatValue < min) min = floatValue;
		});
		return min;
	};
	Array.prototype.avg = function () {
		if(this.length < 1){
			throw ('Erreur, tableau vide');
		}
		let sum = 0;
		this.forEach(function (el) {
			let floatValue = parseFloat(el);
			if(floatValue != el){
				throw ('Erreur, valeur non numérique');
			}
			sum+=floatValue;
		});
		return (sum/this.length).toFixed(2)*1;
	};
})();

 
