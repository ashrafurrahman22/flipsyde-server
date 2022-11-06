const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// <!-- // middleware -->
app.use(cors())
app.use(express.json());

// <!-- mongodb -->
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m52uzc8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try {
        await client.connect();
        const flipsydeCollection = client.db('blogApp').collection('posts');

        // notes api
        app.get('/posts', async(req, res)=>{
            const query = {};
            const cursor  = flipsydeCollection.find(query);
            const notes = await cursor.toArray();
            res.send(notes);
        })


         // catch single item
         app.get('/posts/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const note = await flipsydeCollection.findOne(query);
            res.send(note);
        })

          // post 
          app.post('/posts', async(req, res)=>{
            const newNotes = req.body;
            const result = await flipsydeCollection.insertOne(newNotes);
            res.send(result);
        });


         // update stock
        //  app.put('/notes/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const updatedNotes = req.body;
        //     const filter = {_id : ObjectId(id)};
        //     const options = { upsert : true };
        //     const updatedDoc = {
        //         $set : {
        //             notes : updatedNotes.notes
        //         }
        //     };
        //     const result = await todoCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);
        //     })




         // Delete
        //  app.delete('/notes/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await todoCollection.deleteOne(query);
        //     res.send(result);
        // });




}

    finally {
                }
            }
            run().catch(console.dir);

// <!-- // root -->
app.get('/', (req, res)=>{
    res.send('flipsyde server is running')
});

// <!-- // root listen -->
app.listen(port, ()=>{
    console.log('flipsyde Server is running on port', port);
})