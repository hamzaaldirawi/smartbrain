
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const detect = require('./controllers/imageDetect');

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 93a8f803e61e41f3a652d9f81d162b70");

const port = process.env.PORT || 8000;
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

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const app = express();

app.use(express.json()); // when send data from server we have to parse it
app.use(cors()); // to use fetch in Frontend

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt, salt);
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