const bodyParser = require('body-parser');
const express = require('express')
require('dotenv').config();
const app = express()
const { MongoClient } = require('mongodb');
const port = 3000
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'vite-project';
const cors=require('cors');
app.use(bodyParser.json())
app.use(cors())
    client.connect(); 
// get the passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save the passwords
app.post('/', async(req, res) => {
  const pasword=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(pasword);
  res.send("sucessful")
})


// delete a password
app.delete('/', async(req, res) => {
  const pasword=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(pasword);
  res.send("sucessful")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 