const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.URL, {  useNewUrlParser: true,
  useUnifiedTopology: true,})
  .then((data)=>{
    console.log(`MongoDB Database connection established ${data.connection.name}`)

  })
  .catch((error)=>{
    console.log(`Error occur ${error.message}`)
  })