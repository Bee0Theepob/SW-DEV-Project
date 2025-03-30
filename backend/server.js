const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config({path:"./config/config.env"});

connectDB();


const rentalCarProviders = require("./routes/rentalCarProviders")
const users = require("./routes/users")
// const appointments =require('./routes/appointments');
const auth = require("./routes/auth");
const cors = require("cors");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");


const app = express();


app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());


const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 100,
});
app.use(limiter);

const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express VacQ API",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/rentalCarProviders",rentalCarProviders);
app.use("/api/v1/users",users);
// app.use('/api/v1/appointments', appointments);
app.use("/api/v1/auth",auth);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log("Server running in",process.env.NODE_ENV,"mode no port",PORT));

process.on("unhandledReject",(err,promise) => {
    console.log(`Error : ${err,promise}`);

    server.close(()=>process.exit(1));
})