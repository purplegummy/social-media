require('dotenv').config();
const express = require('express');
const bodyParser = require( 'body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

console.log("started");

const connect = async ()=> {
    mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser:true,useUnifiedTopology: true}); 
}

connect();


const db = mongoose.connection;
db.on('error', console.log);


const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true})); 
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
const port = 4000;

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/usersInfo',require('./routes/usersInfoRoutes.js'))

app.listen(port);