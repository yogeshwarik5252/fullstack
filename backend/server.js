const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/notesdb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});