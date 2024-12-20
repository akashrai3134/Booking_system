const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 5003;

const userRoutes = require('./routes/userRoutes')
const theatreRoutes = require('./routes/theatreRoutes')

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/users' , userRoutes )
app.use('/api/theatres' , theatreRoutes )
app.listen(PORT, () => {
  console.log("Server Started");
});