import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

//--------------------GET REQUESTS--------------------
//get all finances for one user
router.get("/userFinances", async(req, res) => {
    try{
        const user = await UserModel.findOne({ _id: req.body.userID });
        const response = user.finances;
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//get all finances of single type for one user
router.get("/userFinanceByType", async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.body.userID });
      const response = user.finances.filter(finance => finance.financeType === req.body.financeType);
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

//--------------------POST REQUESTS--------------------
//Registering the user
router.post("/register", async (req, res) =>{
    const { username, password } = req.body;
    
    const user = await UserModel.findOne({ username });

    //check if the user exists already
    if (user){
        return res.json({message: "this user already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save()

    res.json({message: "User registered successfully"});
});

//Logging in the user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user){
        return res.json({message: "User does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.json({message: "Username or password is invalid."});
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });

});

//Post financial info
router.post("/", async(req, res) => {
    try{
        const user = await UserModel.findOne({ _id: req.body.userID });
        user.finances.push(...req.body.finances);
        const response = await user.save();
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//--------------------DELETE REQUESTS--------------------
//Delete an income/expense/investment from the users finance array
router.delete("/deleteFinance", async(req, res) => {
    try{
        const user = await UserModel.findOne({ _id: req.body.userID });
        
        //search for the index
        const financeIndex = user.finances.findIndex(finance => finance.id === req.body.financeID);

        //remove the finance
        user.finances.splice(financeIndex, 1);

        //save the new user info
        const response = await user.save();
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//--------------------PUT REQUESTS--------------------
//Let the user update the description and/or value of an income/expense/investement (an element in the finances array)
router.put("/updateFinance", async(req, res) => {
    try{
        const user = await UserModel.findOne({ _id: req.body.userID });
        
        //search for the index
        const financeIndex = user.finances.findIndex(finance => finance.id === req.body.financeID);

        //change values
        user.finances[financeIndex].description = req.body.description;
        user.finances[financeIndex].value = req.body.value;

        //save the new user info
        const response = await user.save();
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

export { router as userRouter };