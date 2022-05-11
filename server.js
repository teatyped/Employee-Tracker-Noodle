const express = require('express');
const db = require('./db/connection');

const PORT = process.env.port || 3001;
const app = express();

//middle wear
app.use(express.urlencoded({ extended : false }));
app.use(express.json());