const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyDetails: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  companyEmail: {
    type: String,
    require: true,
  },
  companyPhoneno: {
    type: Number,
    require: true,
  },
  companyWebsite: {
    type: String,
    require: false,
  },
  foundedDate: {
    type: String,
    require: true,
  },
  companyLogo: {
    type: String,
  },
  isactive: {
    type: Boolean,
    require: true,
  },
});
companySchema.set("timestamps", true);
module.exports = mongoose.model("company", companySchema);
