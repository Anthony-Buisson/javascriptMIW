<?php
try{
    $bdd = new PDO('mysql:host=localhost;dbname=bdproduits;charset=utf8', 'root', '');
}
catch (Exception $e){
    die('Erreur : ' . $e->getMessage());
}
$reponse = $bdd->prepare('SELECT * FROM produits WHERE codeCat=:codeCat');
$reponse->bindValue('codeCat', $_POST['codeCat']);
$reponse->execute();
$tabJson = array();
while ($donnees = $reponse->fetch()){
    array_push($tabJson, array("numPro" => $donnees["numPro"],
        "libPro" => $donnees["libPro"],
        "codeCat" => $donnees["codeCat"]));
}
echo(json_encode($tabJson));
$reponse->closeCursor();
