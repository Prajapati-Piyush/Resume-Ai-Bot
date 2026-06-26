import express from 'express'
import authRouter from './routes/auth.route.js'
import { login, register } from './controllers/auth.controller.js'
import cookieParser from 'cookie-parser'
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cookieParser)
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);


app.use("/api/auth", authRouter)



export default app