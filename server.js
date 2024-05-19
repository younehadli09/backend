const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const users =require("./routes/users")
const user =require("./routes/user")
const logadmin =require("./routes/admin")
const projet = require("./routes/projet")
const entreprise = require("./routes/entreprise")

const dotenv= require('dotenv') 

dotenv.config();



mongoose
.connect(process.env.MONGO_URI)
.then(()=>{ console.log("connected to mongodb");})
.catch((error)=>{
console.log("the error is ",error); 
})

app.use(cors());

app.use(express.json());
app.use("/api",users);
app.use("/api/admin",logadmin);
app.use("/api/project",projet)
app.use("/api/entreprise",entreprise)





app.listen(port, () => {
    console.log("listening on port " + port);
});
