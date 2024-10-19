// Import pacakges
const express = require('express');
// create framework
const app = express();


// DBMS Mysql
const mysql = require('mysql2')
// cross origin resources sharing
const cors = require('cors');
// environment variable
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_user,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Checking for connection
db.connect((err) =>{
    if (err) return console.log('ERROE Connecting Mysql');
    console.log('Connect to Mysql as Id: ', db.threadId);

})

// GET METHOD
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Retrieve data
app.get('/data', (req, res) =>{
    // retrieve patient data
    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('ERROR retrieving data')
        } else{
            res.render('data', {results:results})
        }
    })
    // retrieve providers data
    db.query('SELECT * FROM providers', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('ERROR retrieving data')
        } else{
            res.render('data', {results:results})
        }
    })
})

// Retrieve all providers

