const express = require('express')
const router = express.Router()
const company = require("../controller/companyController")
const validate =require("../validation/company/company_validation")
const {upload} = require("../middleware/imageStorage")

router.post("/addcompany",upload.single("companyLogo"),validate.registerCompany,company.addCompany)
router.get("/listcompany",company.listOfCompany)
router.patch("/updatecompany/:id",upload.single("companyLogo"),company.updateCompany)
router.delete("/deletecompany/:_id",company.deleteCompany)
router.get("/searchcompany/:city",company.searchCompany)

module.exports = router;