import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);

mongoose.connect("mongodb+srv://shabbir1065:MERNproject@financials.cx6ol15.mongodb.net/financials?retryWrites=true&w=majority");

app.listen(3001, () => console.log("Server is up and running"));