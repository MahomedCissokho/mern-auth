import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

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
        origin: 'http://localhost:'+PORT,
        methods:['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
        credentials: true
    }
))
app.use(express.json())

