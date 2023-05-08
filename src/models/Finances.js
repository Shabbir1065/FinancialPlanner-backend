import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    },
    financeType:{
        type: String,
        required: true
    },
    userOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

export const FinanceModel = mongoose.model("finances", FinanceSchema);