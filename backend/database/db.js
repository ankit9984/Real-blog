import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connect Successfully'))
        .catch((err) => console.log('Database: ', err))
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;