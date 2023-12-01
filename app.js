const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.port || 3000
let collection;

const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://eswarssethu2002:RhqXApNjmdX0KGQ8@cluster0.3osj0cg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Cat = mongoose.model('Todo', {
    title: String,
    subtitle: String,
    path: String,
    description:String
  });


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', function (req, res) {
    res.render('indexMongo.html');
});

app.get('/api/cats', async(req, res) => {
    try {
        const cats = await Cat.find();
        res.send(cats);
      } catch (error) {
        res.status(500).send(error);
      }
});

app.post('/api/cat', async(req, res) => {
    try {
        const cat = new Cat(req.body);
        await cat.save();
        res.status(201).send(cat);
      } catch (error) {
        res.status(400).send(error);
      }
});
app.listen(port, () => {
    runDBConnection()
    console.log(`Listening to port ${port}`)
})