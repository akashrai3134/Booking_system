const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 5003;
const userRoutes = require('./routes/userRoutes')
mongoose
  .connect("mongodb+srv://akashrai3134:9tzMw4rD0Z6iAReb@cluster0.zfgna.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/users' , userRoutes )
app.listen(PORT, () => {
  console.log("Server Started");
});