import express from "express"
import bodyParser from "body-parser"
import routes from "./routes";
import Knex from "knex";
import knexConfig from "../knexfile.js"
import { Model } from "objection";

require('dotenv'). config();

const app = express()

const knex = Knex(knexConfig.development);
Model.knex(knex);

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(routes);

// request to handle undefined or all other routes
app.get("*", function(res) {
    res.send("App online and working!");
 })

app.listen(process.env.PORT || '8080', () => { console.log("running server on from port:::::::" + process.env.PORT?? '8080') })

export default app;