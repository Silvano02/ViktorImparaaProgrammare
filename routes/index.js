var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inserisci nel database' });
});

router.post('/Inserisci', function (req, res, next) {
  var con = mysql.createConnection({
        host: "185.25.207.87",
        user: "silvano",
        password: "Fefone66",
        database : "myDB"
    });

    con.connect(function(err) {
        if (err) console.log(err);
        else console.log("Connected!");
        var sql = "INSERT INTO `Persone` (`id`, `nome`, `cognome`, `dataDiNascita`) VALUES ?;";
        var value = [
            [null, req.body.nome, req.body.cognome, req.body.dob]
        ];
        con.query(sql, [value], function (err, result) {
            if (err) console.log(err);
            console.log(result.insertId);
          res.render('Inserisci', {text: 'inserito con id: ' + result.insertId})
        });
    });

})

router.get('/getAll', function (req, res, next) {

    var con = mysql.createConnection({
        host: "185.25.207.87",
        user: "silvano",
        password: "Fefone66",
        database : "myDB"
    });

    con.connect(function(err) {
        if (err) console.log(err);
        else console.log("Connected!");
        var sql = "SELECT * FROM `Persone`;";
        con.query(sql,  function (err, result) {
            if (err) console.log(err);
            var persone = Object.values(JSON.parse(JSON.stringify(result)));
            console.log(persone);
            res.render("getAll", {ris: persone})
            for (persona in persone){
                if (persona.id>max){
                    max = persona.id;
                }
            }
        });
    });

})

router.post('/remove/:id', function (req, res, next) {

    var con = mysql.createConnection({
        host: "185.25.207.87",
        user: "silvano",
        password: "Fefone66",
        database : "myDB"
    });

    con.connect(function(err) {
        if (err) console.log(err);
        else console.log("Connected!");
        var sql = "DELETE FROM `Persone` WHERE `Persone`.`id` = ? ;";
        var value = [
            [req.params.id]
        ]
        con.query(sql, [value],function (err, result) {
            if (err) console.log(err);
            res.render("remove", {id: req.params.id})
        });
    });


})

router.get('/removeAll', function (req, res, next) {

    var con = mysql.createConnection({
        host: "185.25.207.87",
        user: "silvano",
        password: "Fefone66",
        database : "myDB"
    });

    con.connect(function(err) {
        if (err) console.log(err);
        else console.log("Connected!");
        var sql = "TRUNCATE TABLE `Persone`;";
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            else res.render("removeAll")
        });
    });


})

module.exports = router;

