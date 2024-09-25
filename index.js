const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const CONNECTION_STRING = 'mongodb+srv://17ostberg:admin123@cluster0.qotl0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const DATABASENAME = 'eventsDB'
let database;

app.listen(5038,()=>{
    mongoClient.connect(CONNECTION_STRING, (err, client) => {
        database = client.db(DATABASENAME);
        console.log('Database Connected Successfully!');
        console.log('collections', database.listCollections());

    })
})

app.get('/api/events', (req, res) => {
    database.collection('eventsCollection').find({}).toArray((err, events) => {
        res.send(events)
    })
})
