import express from 'express'
import mongoose from 'mongoose'
import cards from './dbCards.js'

// APP CONFIG
const app = express();
const port = process.env.PORT || 8001
const ConnectionURL = "mongodb+srv://admin:<Your password here>@cluster0.o4i11.mongodb.net/tinderdb?retryWrites=true&w=majority"

// Connection String: mongodb+srv://admin:<password>@cluster0.o4i11.mongodb.net/<dbname>?retryWrites=true&w=majority

// MIDDLEWARES
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// DB CONFIG
mongoose.connect(ConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// API ENDPOINTS
app.get('/', (request, response) => response.status(200).send('HELLO WORLD !'))

// POSTING DATA
app.post('/tinder/cards', (request, response) => {

    const dbCard = request.body;

    cards.create(dbCard, (err, data) => {
        if (err) {
            response.send(500).send(err)
        } else {
            response.status(201).send(data)
        }
    })

})

// GETTING DATA
app.get('/tinder/cards', (request, response) => {

    cards.find((err, data) => {
        if (err) {
            response.send(500).send(err)
        } else {
            response.status(200).send(data)
        }
    })

})

// LISTENER
app.listen(port, () => console.log(`Listening on LocalHost PORT: ${port}`))
