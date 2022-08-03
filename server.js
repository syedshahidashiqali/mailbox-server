const express = require("express");
const dotenv = require("dotenv");
// import connection DB func
const { connectDB } = require("./config/db");
dotenv.config()

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'))

// Routes

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))