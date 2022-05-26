const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/moviedb")
.then(()=> console.log("Connected to the database"))
.catch((err)=> console.log("Error occured while connecting to the database", err))