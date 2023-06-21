const joi = require("joi");

const companyValidationSchema = {
    registerCompany: joi
    .object({
        companyName: joi
        .string()
        .max(100)
        .message("name length must be at most 100 characters")
        .required(),
        companyDetails: joi
        .string()
        .max(100)
        .message("must be at most 100 characters")
        .required(),

        companyLocation: joi
        .string()
        //.message("name length must be at most 10 characters")
        .required(),

        city: joi.string().max(20).required(),
      //.message("name length must be at most 20 characters"),

      country: joi.string().required(),

      companyWebsite: joi.string().required(),
      companyEmail: joi
                .string()
                .email({ tlds: { allow: false } })
                .regex(/^[^@\s]+@gmail\.com$/)
                .trim()
                .required(),
    })
    .unknown(true),
};
module.exports = companyValidationSchema;
