import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI: string =
    process.env.MONGODB_URI ||
    "mongodb+srv://Dilaxn:123@main.cscur.mongodb.net/Corali";

const mongooseOptions: ConnectOptions = {} as ConnectOptions;

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI, mongooseOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectToDatabase;
