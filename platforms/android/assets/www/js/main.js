//--Global variables--
var db;
var nom;
var prenom;

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
//    onDeviceReady();
});

function onDeviceReady() {
   // console.log("Ready");
    db = window.openDatabase("idroidquizdb", "1.0", "QCM database", 5000000);
    db.transaction(populateDB,errorCB,successCB);
    //afficherProfil();
    console.log("Database open successfuly");
}
function showUser(){
    $('#headerTeach').append(nom+ " "+prenom);
}
//Database Tables creation
function populateDB(tx) {
    //tx.executeSql('DROP TABLE UTILISATEUR');
   // alert("Table supprimé");
    tx.executeSql('CREATE TABLE IF NOT EXISTS UTILISATEUR(idUser integer primary key AUTOINCREMENT, nom,prenom,typeUser,pseudo,passwd)');
    //alert("Table utilisateur cree");
    //tx.executeSql('INSERT INTO UTILISATEUR (idUser,nom,prenom,pseudo,passwd) VALUES (1,"PAHIMA","Toussaint","paideur","verite")');
   // alert("Donnees inserees");
}
//Transaction Success CallBack
function successCB(){
    console.log("successCB() called");
}
//Transaction Error CallBack
function errorCB(err){
    console.log("Error SQL: " + err.code);
}
//Fonction de connexion au système
function connexion(){
    db.transaction(verifyConnexion,errorCB,successCB);
}
function verifyConnexion(tx,res){
    //alert("Debut connecion");
    var login = document.getElementById("login").value;
    var motpasse = document.getElementById("password").value;
    //alert("Milieu connecion");
    tx.executeSql('SELECT * FROM UTILISATEUR WHERE pseudo=? AND passwd=?' ,[login,motpasse],querySuccessConnexion,errorCB);
    //alert("Fin connecion");
    
}
function querySuccessConnexion(tx,res) {
    var len = res.rows.length;
    //alert("Taille:"+len);
    if(len>0){
        //alert("utilisateur connecté");
        //Verification du profil de l'utilisateur
        switch(res.rows.item(0).typeUser){
            case "Etudiant":
                //Recuperation du nom et prenom de l'utilisateur
                nom=res.rows.item(0).nom;
                prenom=res.rows.item(0).prenom;
                $('#headerTeach').append(nom+ " "+prenom);
                
                //Afficher la page de l'étudiant
                $.mobile.changePage("#teachMenu");
                break;
            case "Enseignant":
                $.mobile.changePage("#teachMenu");
                break;
            case "Admin":
                $.mobile.changePage("#adminMenu");
                break;
        }
    }
}

//Fonction de création d'un compte utilisateur
function creerCompte() {
    var nom = document.getElementById("nomCpt").value;
    var prenom = document.getElementById("prenomCpt").value;
    var login = document.getElementById("loginCpt").value;
    var password = document.getElementById("mtpassCpt").value;
    var passwordCnf = document.getElementById("cnfmtpassCpt").value;
    
    alert("Debut creer compte");
    db.transaction(function(tx) {
        alert("Debut requete compte");
    tx.executeSql('CREATE TABLE IF NOT EXISTS UTILISATEUR(idUser integer primary key AUTOINCREMENT, nom text,prenom text,typeUser text,pseudo text,passwd text)');
    tx.executeSql('INSERT INTO UTILISATEUR (nom,prenom,typeUser,pseudo,passwd) VALUES (?,?,?,?,?)', [nom,prenom,'Etudiant',login,password]);
    
    tx.executeSql('SELECT * FROM UTILISATEUR', [],querySuccess,errorCB);
        alert("Compte cree");
    });
}

//Fonction pour afficher le profil de l'utilisateur
function afficherProfil(tx){
    alert("afficher profil");
    tx.executeSql('SELECT * FROM UTILISATEUR',[],querySuccess,errorCB);
}

function querySuccess(tx,res) {
    alert("query succes");
        console.log("Returned rows = " + res.rows.length);
       //alert("requete");
       var len = res.rows.length;
       for (var i = 0; i < len; i++) {
        alert(res.rows.item(i).nom);
        alert(res.rows.item(i).prenom);
       }
}


function afficherProfils() {
    alert("Debut affiche");
    //alert("Debut affiche 2");
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM UTILISATEUR', [], function(res) {
        alert("requete");
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
        alert(res.rows.item(i).nom);
        alert(res.rows.item(i).prenom);
        }
        }, function(e) {
        alert("some error getting");
        });
    });

}

//----Code de la page creation de compte---
$('#btCompte').click(function() {
    alert('Button has been clicked');
});

