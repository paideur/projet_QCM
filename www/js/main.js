var directions = {};
var contactsWithAddress = [];
var contactAddresses = [];
var compassWatchId = -1;
var locationWatchId = -1;
var map_with_pos = {};
var previous_pos_marker = {};
var db;

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
//    onDeviceReady();
});

function onDeviceReady() {

    alert("Ready");
    console.log("Ready");
    db = window.sqlitePlugin.openDatabase({name: "idroidquizdb"});
    alert("Database created successfuly");
    insert();
    alert("Insertion success");
    
}
function insert() {
var idQ = 1;
var libQ = "Quest1";
db.transaction(function(tx) {
tx.executeSql('CREATE TABLE IF NOT EXISTS QUESTION (idQuest integer primary key, libQuest text)');
tx.executeSql('INSERT INTO QUESTION (idQuest,libQuest) VALUES (?,?)', [idQ, libQ]);
});
}

