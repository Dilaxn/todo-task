// Import necessary modules and dependencies
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "abort-controller/polyfill";
import connectToDatabase from "./infrastructure/database/mongoose/mongoose.config";
import router from "./presentation/api/routers/router";
var path = require("path");

//for .env file
dotenv.config();

// Set up Express application
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "6301", 10);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/static", express.static("public"));
app.use(express.static("./client/build"));

// MongoDB connection
connectToDatabase();
// API routes
app.use("/api/v1", router);

app.get("/test", (req, res) => {
    res.send("Hello World!!");
});

app.get("*", (req, res) => {
    console.log("dir name", __dirname);

    res.sendFile(
        path.resolve(
            "/Users/dilaxn/Projects/Todo-Corali/server",
            "client",
            "build",
            "index.html"
        )
    );
});
app.set("port", PORT);
app.listen(app.get("port"), () => {
    console.log(`Server is running on port :${app.get("port")}`);
});
