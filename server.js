import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import cors from "cors";

// import connection DB func
import { connectDB } from "./config/db"

// import routes
import authRoutes from "./routes/auth"
import mailRoutes from "./routes/mail"
import userRoutes from "./routes/user"

dotenv.config()

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/mails", mailRoutes)
app.use("/api/v1/users", userRoutes)

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))