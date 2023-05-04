import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://shabbir1065:MERNproject@financials.cx6ol15.mongodb.net/financials?retryWrites=true&w=majority");

app.listen(3001, () => console.log("Server is up and running"));