import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    finances: [{
        description: {
          type: String,
          required: true
        },
        value: {
          type: Number,
          required: true
        },
        financeType: {
          type: String,
          required: true
        }
    }]
})

export const UserModel = mongoose.model("users", UserSchema);