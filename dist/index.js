"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and dependencies
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_config_1 = __importDefault(require("./infrastructure/database/mongoose/mongoose.config"));
const router_1 = __importDefault(require("./presentation/api/routers/router"));
var path = require("path");
//for .env file
dotenv_1.default.config();
// Set up Express application
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "5000", 10);
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/static", express_1.default.static("public"));
app.use(express_1.default.static("./client/build"));
// MongoDB connection
(0, mongoose_config_1.default)();
// API routes
app.use("/api/v1", router_1.default);
app.get("/test", (req, res) => {
    res.send("Hello World!!");
});
app.get("*", (req, res) => {
    console.log("dir name", __dirname);
    res.sendFile(path.resolve("/Users/dilaxn/Projects/Todo-Corali/server", "client", "build", "index.html"));
});
app.set("port", 6301);
app.listen(app.get("port"), () => {
    console.log(`Server is running on port :${PORT}`);
});
