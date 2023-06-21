const review = require("../model/reviewSchema");

//Add review
const addReview = async (req, res) => {
  const { u_id, c_id } = req.params;
  try {
    const writeReview = await new review(req.body);
    if (writeReview != "") {
      writeReview.userId = u_id;
      writeReview.companyId = c_id;
    await writeReview.save();
      res.status(201).json({
        success: true,
        message: "New review added successfully",
        writeReview: writeReview,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// list Of Review
const listOfReview = async (req, res) => {
  const reviews = await review.find();
  try{
    res.status(200).json({
    success: true,
    message: "Here are all the Reviews",
    listAll: reviews,
  });
  }catch{
    res.status(500).json({
      success: false,
      error: error.message, 
    })
  }
};

//delete
const deleteReview = async (req, res) => {
  const { r_Id } = req.params;
  try {
    const findToDelete = await review.findByIdAndDelete(r_Id);
    if (findToDelete) {
      res.status(200).json({
        success: true,
        message: "Company deleted successfully",
      });
    }else{
      res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addReview,
  listOfReview,
  deleteReview
};
