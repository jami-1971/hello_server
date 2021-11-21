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

      app.post('/likha', async (req,res)=>{
        const likha  = req.body;
        const result = await likhaCollection.insertOne(likha);
        res.send(result)
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