const Company = require("../model/companySchema");

//add company
const addCompany = async (req, res) => {
  const { companyName } = req.body;

 try {
    const isCompanyExist = await Company.findOne({companyName});
    if (isCompanyExist) {
      res.success(401).json({
        success: false,
        message: "Company with this name is already exist",
      });
    } 
    else {
      const addCompanyHere = new Company(req.body);
      addCompanyHere.companyLogo = `/uploads/${req.file.filename}` 
      await addCompanyHere.save();

      res.success(201).json({
        success: true,
        message: "Company added successfully",
      });
    }
  } catch (error) {
    res.success(500).json({
      success: false,
      error: error.message,
    });
  }
};

//list company
const listOfCompany = async (req, res) => {
  try {
    const listAll = await Company.find();
    res.success(200).json({
      success: true,
      message: "Here is the list of company",
      listAll :listAll,
    });
  } catch (err) {
    return res.success(500).json({
      success: false,
      error: err.message,
    });
  }
};

//Update company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const findAndUpdate = await Company.findByIdAndUpdate(id, req.body);
    if (findAndUpdate) {
      findAndUpdate.companyLogo = `/uploads/${req.file.filename}` 
      await findAndUpdate.save();
      res.success(200).json({
        success: true,
        message: "Update sucessfully",
        findAndUpdate:findAndUpdate,
      });
    } else {
      res.success(401).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    res.success(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete company
const deleteCompany = async (req, res) => {
  const { _id } = req.params;
  try {
    const findCompanyToDelete = await Company.findByIdAndDelete(_id);
    if (findCompanyToDelete) {
       res.success(200).json({
        success: true,
        message: "Company deleted successfully",
      });
    } else {
      res.success(401).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    res.success(500).json({
      success: false,
      error: error.message,
    });
  }
};

//search
const searchCompany = async (req, res) => {
  const { city } = req.params;
  const findCompany = await Company.find({ city });
  try {
    if (findCompany) {
      res.success(200).json({
        success: true,
        message: `This is what we found with name ${city}`,
        findCompany:findCompany
      });
    }
  } catch (error) {
    res.success(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { addCompany,listOfCompany , updateCompany, deleteCompany,searchCompany }
