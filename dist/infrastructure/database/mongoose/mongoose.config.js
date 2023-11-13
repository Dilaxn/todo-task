"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://Dilaxn:123@main.cscur.mongodb.net/Corali";
const mongooseOptions = {};
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI, mongooseOptions);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.default = connectToDatabase;
