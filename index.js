
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

const PORT = process.env.PORT || 8000;

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : 'ec2-34-206-245-175.compute-1.amazonaws.com',
//       port : 5432,
//       user : 'iouftabgbjmnbn',
//       password : 'ab9a0f976da07b8c88498f253eb044df63b00feedf64846e0b5bb020ba459b36',
//       database : 'd41k1prmmopj0h'
//     }
// });

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : 'localhost',
//       port : 5432,
//       user : 'postgres',
//       password : '',
//       database : 'smart-brain'
//     }
// });



const app = express();

app.use(express.json()); // when send data from server we have to parse it
app.use(cors()); // to use fetch in Frontend

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

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

app.listen(PORT, () => {
    console.log('app is running', PORT);
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