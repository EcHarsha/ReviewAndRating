const express = require('express')
const router =express.Router();

const userRouter =require("../router/userRouter")
const companyRouter = require("../router/companyRouter")
const reviewRouter = require("../router/reviewRouter")

router.use("/user",userRouter);
router.use("/company",companyRouter);
router.use("/review",reviewRouter);

module.exports= router;