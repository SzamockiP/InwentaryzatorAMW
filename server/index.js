const express = require('express');
const cors = require('cors')
const app = express();

const mysql = require('mysql');

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'inwentaryzatoramw'
})

// get data from table rekordy
app.get('/dane_rekordy', (req, res)=>{
    console.log(req.query);
    const conditions = Object.entries(req.query)
        .map(([key, value]) => `${key}=${value}`)
        .join(" AND ");
    let query = "SELECT * FROM rekordy";
    if(conditions)
        query += " WHERE " + conditions;
    console.log(query);

    db.query(query , (err, result)=> {
        if(err)
            console.log(err)
        else
            res.send(result)
    });
})

// get data from table miejsca
app.get('/dane_miejsca', (req, res)=>{
    db.query("SELECT * FROM miejsca", (err, result)=> {
        if(err)
            console.log(err)
        else
            res.send(result)
    });
})

// get data from table rodzaje
app.get('/dane_rodzaje', (req, res)=>{
    db.query("SELECT * FROM rodzaje", (err, result)=> {
        if(err)
            console.log(err)
        else
            res.send(result)
    });
})

// get data from table uzytkownicy
app.get('/dane_uzytkownicy', (req, res)=>{
    db.query("SELECT * FROM uzytkownicy", (err, result)=> {
        if(err)
            console.log(err)
        else
            res.send(result)
    });
})

// get data from table laboranci
app.get('/dane_laboranci', (req, res)=>{
    db.query("SELECT * FROM laboranci", (err, result)=> {
        if(err)
            console.log(err)
        else
            res.send(result)
    });
})

app.listen(3001, ()=> {
    console.log("Your server is running!");
})