const joi = require("joi");

const userValidationSchema = {
    registerUser: joi
        .object({
            name: joi.string().max(20).required().messages({
                "string.max": "name length must be at most 20 characters",
            }),
            emailId: joi
                .string()
                .email({ tlds: { allow: false } })
                .regex(/^[^@\s]+@gmail\.com$/)
                .trim()
                .required(),
            password: joi
                .string()
                .pattern(
                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
                )
                .required(),
                phoneNo: joi
                .number()
                .integer()
                .min(1000000000)
                .max(9999999999)
                .message("Invalid Mobile Number")
                .required(),
            address: joi.string().required(),
            
        })
        .unknown(true),
    loginUser: joi
        .object({
           emailId: joi.string().email().required(),
            password: joi
                .string()
                .pattern(
                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
                )
                .required(),
        })
        .unknown(true),

    resetUser: joi.object({
        newPassword: joi
            .string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required(),
            confirmPassword: joi
            .string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required(),
    }),
};

module.exports = userValidationSchema;