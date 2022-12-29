const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://socialMedia:hOA8QN1OHZXnlR7y@cluster0.mcdvihz.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    const allPost = client.db('socialMedia').collection('allPost')

    app.post('/post', async(req,res) =>{
        const post = req.body 
        const result = await allPost.insertOne(post)
        res.send(result)
    })
}

run().catch(console.dir())


app.get('/', (req, res) =>{
    res.send('Server running...')
})

app.listen(port, ()=> console.log(`server running in port ${port}`))