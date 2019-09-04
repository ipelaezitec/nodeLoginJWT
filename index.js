const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// https://cloud.mongodb.com/

// import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

// techs used
//npm init
//npm install express
//npm install --save-dev nodemon ( reload node)
//npm install mongoose
//npm install dotenv   ( inject env )
//npm install @hapi/joi  ( validation )
//npm install bcryptjs
//npm install jsonwebtoken

dotenv.config({path: './routes/.env'});

// connect to db
mongoose.connect(process.env.DB_CONNECT,
     { useNewUrlParser: true },
    () => console.log('connected to db')
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);

app.listen(3000, () => console.log('Server Up and running'));

