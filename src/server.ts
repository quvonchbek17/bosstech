import express, { Application, Request, Response } from "express";
// import mongo from "./config/mongo";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import api from "./routes"
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongo from "./config/mongo";
import swRouter from "./utils/swagger";

dotenv.config()
import path from "path";

const app: Application = express()

//// cors
app.use(cors({ origin: "*" }))


//// limit
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 10000,
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

// docs
app.use(swRouter);

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

mongo()
    .then(() => console.log("Connected"))
    .catch((err: unknown) => console.log(err));

app.use(api)
app.use("/*", (req: Request, res: Response ): void => {
     res.status(404).json({
        success: false,
        message: "Url topilmadi !"
     })
})
app.use(errorHandler)


export default app;