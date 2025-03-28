const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config({path:"./config/config.env"});

connectDB();


const hospitals = require("./routes/hospitals")
const appointments =require('./routes/appointments');
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/hospitals",hospitals);
app.use('/api/v1/appointments', appointments);
app.use("/api/v1/auth",auth);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log("Server running in",process.env.NODE_ENV,"mode no port",PORT));

process.on("unhandledReject",(err,promise) => {
    console.log(`Error : ${err,promise}`);

    server.close(()=>process.exit(1));
})