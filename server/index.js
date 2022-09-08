import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'

const app = express()
dotenv.config()

app.use(morgan("combined"))
// app.use(express.json({limit: "30mb", extended: true}))
app.use(express.json())
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/users', userRouter);
app.use('/product', productRouter)
app.use("/", (req, res) => {
  res.send("Welcome to E-Commerce Site")
})

// app.get("/", function (req, res) {
//   res.send("hello world")
// })

const CONNECTION_URL = 'mongodb+srv://prsmart2150:prsmart08101999@cluster0.8jgdobe.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(port, () => console.log(`server running on PORT: ${port}`)))
  .catch((error) => console.log(error.message))