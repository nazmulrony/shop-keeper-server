const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

//middle wares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ShopKeeper server running!');
})

//mongo db connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cwjhhvi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        //document collections
        const productCollection = client.db('ShopKeeper').collection('products');

        //post product
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })

        //get product
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            console.log(products);
            res.send(products);
        })


    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`ShopKeeper server running on port: ${port}`);
})