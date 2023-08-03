require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(
  cors({
    origin: "https://ffrankings.ai",
  })
)
const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(express.json());

const flexRouter = require('./routes/flex_data');
app.use('/flex_data', flexRouter);
const overallRouter = require('./routes/overall_data');
app.use('/overall_data', overallRouter);
const rbRouter = require('./routes/rb_data');
app.use('/rb_data', rbRouter);
const qbRouter = require('./routes/qb_data');
app.use('/qb_data', qbRouter);
const wrRouter = require('./routes/wr_data');
app.use('/wr_data', wrRouter);
const teRouter = require('./routes/te_data');
app.use('/te_data', teRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server Started'));
