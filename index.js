const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://us:butuputu@cluster0.6wrsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect()
      console.log('database connected!');
      const database = client.db('us');
      const likhaCollection = database.collection('likha');

      app.get('/likha', async(req, res)=>{
        const email = req.query.email;
        const date = req.query.date;
        const query = {email:email , date: date}
        const cursor = likhaCollection.find(query);
        const likha = await cursor.toArray();
        res.json(likha);
      })

      app.post('/likha', async (req,res)=>{
        const likha  = req.body;
        const result = await likhaCollection.insertOne(likha);
        res.json(result);
      })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('server running')
})

app.listen(port, ()=>{
    console.log('listening to', port)
})