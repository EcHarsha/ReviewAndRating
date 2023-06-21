const company =require('./company_schema')
module.exports = {
    registerCompany: async (req, res, next) => {
    const value = await company.registerCompany.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
