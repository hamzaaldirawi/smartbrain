
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const knex = require('knex');
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const detect = require('./controllers/imageDetect');

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.API_CLARIFAI}`);

const port = process.env.PORT || 8000;

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});

const app = express();

app.use(express.json({extended: false})); // when send data from server we have to parse it
app.use(cors()); // to use fetch in Frontend


app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageDetect', (req, res) => {
    detect.handleDetect(req, res, stub, metadata);
})

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('app is running', port);
});

/*
    Plan your api before you start
    /signin --> POST = success/fail
    /register --> POST = new user
    /profile/:userId --> GET = user
    /image --> PUT = user
*/

/* FOR LOCAL 
const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'smart-brain'
    }
});
*/ 