import express from 'express';
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js'
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.routes.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
