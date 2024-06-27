import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRoute from './routes/AuthRoute.mjs'

const app = express()

config()
const {PORT, MONGODB_URL} = process.env

mongoose.connect(MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(cors(
    {
        origin: `http://localhost:5173`,
        methods:['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
        credentials: true
    }
))

app.use(cookieParser())
app.use(express.json())

app.use('/', authRoute)


