import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js"

const app = express();

app.use(express.json());
const whitelist = ["https://financialplanner-api.onrender.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use("/api", userRouter);

mongoose.connect("mongodb+srv://shabbir1065:MERNproject@financials.cx6ol15.mongodb.net/financials?retryWrites=true&w=majority");

app.listen(3001, () => console.log("Server is up and running"));