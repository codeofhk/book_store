import express from "express";
import { PORT,DBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/Bookmodel.js"
import router from "./Routes/BookRoutes.js";
import cors from "cors";

const app = express();

//middlewware to share data
app.use(express.json());

//middleware for handling cors policy
//allow all no restriction
app.use(cors())

//apply some constrains
/*app.use(cors({
    origin : "http://localhost:5566",
    methods : ['PUT','GET','POST','DELETE'],
    allowedheaders : ['Content-Type']
}))*/


//connecting with database and starting the server
mongoose
    .connect(DBURL)
    .then(() => {console.log('connected to database');
    app.listen(PORT,() => {console.log(`App is listening to port ${PORT}`)});
})
    .catch((error)=>{console.log(error);});


//normal plain index.html request
app.get('/',(Request,Response) => {Response.status(200).send("<h1>hello world</h1>")});


//books usage
app.use('/books',router);