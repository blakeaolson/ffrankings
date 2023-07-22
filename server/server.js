require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(express.json());

const rbRouter = require('./routes/rb_data');
app.use('/rb_data', rbRouter);
const qbRouter = require('./routes/qb_data');
app.use('/qb_data', qbRouter);
const wrRouter = require('./routes/wr_data');
app.use('/wr_data', wrRouter);
const teRouter = require('./routes/te_data');
app.use('/te_data', teRouter);

app.listen(3001, () => console.log('Server Started'));
