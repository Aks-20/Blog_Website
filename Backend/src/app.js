import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
// Import your router (adjust the path as needed)
import router from "./routes/blog.routes.js";

//routes declaration

app.use("/api/v1/blogs", router);  // Use lowercase 'blogs'



// http://localhost:8000/api/v1/users/register

export { app }