require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./src/helpers/database')
const app = express()
const port = process.env.PORT || 3000;
const router = require('./src/routes');
const cors = require('cors');

app.use(cors());

app.use(express.json());

connectDB(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})
mongoose.connection.on('error', (err) => {
  console.log('MongoDB error:', err)
})

router(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})