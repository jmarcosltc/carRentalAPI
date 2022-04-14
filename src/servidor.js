const porta = 3003
var mysql = require('mysql');
const express = require('express')
const app = express()
const bd = require('./bd')
const bodyParser = require('body-parser')


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sup3rqu3U3@$44",
    database: "produtos"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/produtos', (req, res, next) => {

    con.query("SELECT * FROM carros", function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        res.send(bd.getProdutos(result))
    });
})

app.get('/produtos/:id', (req, res, next) => {
    con.query(`SELECT * FROM carros WHERE id = '${req.params.id}'`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        res.send(bd.getProduto(result))
      });
})

app.post('/produtos', (req, res, next) => {
    const produto = bd.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco,
        marca: req.body.marca,
        combustivel: req.body.combustivel,
        marcha: req.body.marcha
    })

    var sql = `INSERT INTO carros (modelo, marca, combustivel, marcha, preco, id) VALUES ('${produto.nome}', '${produto.marca}', '${produto.combustivel}', '${produto.marcha}', '${produto.preco}', '${produto.id}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    res.send(produto) // JSON
})

app.put('/produtos/:id', (req, res, next) => {
    const produto = bd.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco,
        marca: req.body.marca,
        combustivel: req.body.combustivel,
        marcha: req.body.marcha
    })

    var sql = `UPDATE carros SET modelo = '${produto.nome}', marca = '${produto.marca}', combustivel = '${produto.combustivel}', marcha = '${produto.marcha}', preco = '${produto.preco}' WHERE id = '${req.params.id}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });

    res.send(produto) // JSON
})

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bd.excluirProduto(req.params.id)

    var sql = `DELETE FROM carros WHERE id = '${req.params.id}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);

    });

    res.send(produto) // JSON
})

app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
})


