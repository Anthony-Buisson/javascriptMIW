<?php
header('Content-Type: text/xml');
try{
    $bdd = new PDO('mysql:host=localhost;dbname=bdproduits;charset=utf8', 'root', '');
}
catch (Exception $e){
    die('Erreur : ' . $e->getMessage());
}
$reponse = $bdd->prepare('SELECT * FROM categorie');
$reponse->execute();
$fichXml = "<?xml version=\"1.0\"?>";
$fichXml .= "<exemple>";
while ($donnees = $reponse->fetch()){
    $fichXml .= "<categorie><codeCat>".$donnees['codeCat']."</codeCat><libCat>".$donnees['libCat']."</libCat></categorie>";
}
$fichXml .= "</exemple>";
echo $fichXml;
$reponse->closeCursor(); // Termine le traitement de la requête
