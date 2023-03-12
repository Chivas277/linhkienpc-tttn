import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoute from './routes/product.js';
import userRouter from './routes/user.js';

dotenv.config();

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoute);
app.use("/api/users", userRouter);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});