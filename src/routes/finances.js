import express from "express";
import mongoose from "mongoose";
import { FinanceModel } from "../models/Finances.js";

const router = express.Router();

//--------------------GET REQUESTS--------------------
//get all types of finances for all users
router.get("/", async(req, res) => {
    try{
        const response = await FinanceModel.find({});
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//get all finances for one user
router.get("/userFinances", async(req, res) => {
    try{
        const response = await FinanceModel.find({userOwner: req.body.userOwner});
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//get all finances of single type for one user
router.get("/userFinanceByType", async (req, res) => {
    try {
      const response = await FinanceModel.find(
        {
          financeType: req.body.financeType,
          userOwner: req.body.userOwner,
        },
        {}
      );
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

//--------------------POST REQUESTS--------------------
//Post financial info
router.post("/", async(req, res) => {
    const finance = new FinanceModel(req.body);
    try{
        const response = await finance.save();
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//--------------------PUT REQUESTS--------------------

router.put("/", async(req, res) => {
    const finance = new FinanceModel(req.body);
    try{
        const response = await finance.save();
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
})

//--------------------DELETE REQUESTS--------------------


export { router as financesRouter }