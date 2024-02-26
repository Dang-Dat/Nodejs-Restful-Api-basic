require("dotenv").config();

import express, { Router } from "express";
import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./Routes/web";
import connection from "./config/connectDB";
import initWApiRoutes from "./Routes/api";
import configCors from "./config/cors"
import cookieParser from "cookie-parser";

const webRouter = require("./Routes/web")
// config body-parser
const app = express();
const PORT = process.env.PORT || 8888;

//CORS
configCors(app);

configViewEngine(app);

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config cookieParser
app.use(cookieParser());


//test connection db
//connection();


//init web routes
initWebRoutes(app);
initWApiRoutes(app);
// app.use(Router);

app.use((req, res) => {
    return res.send("404 not found")
})

//init web routers
app.listen(PORT, () => {
    console.log(">>> nice " + PORT)
})

