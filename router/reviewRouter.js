const express = require("express")
const router =express.Router();
const review = require("../controller/reviewController")

router.post("/addreview/:u_id/:c_id", review.addReview)
router.get("/listreview", review.listOfReview)
router.delete("/deletereview/:r_Id", review.deleteReview)

module.exports = router
