import Joi from "joi";

// Define the Joi schema for user validation
export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of string",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of 3 characters",
    "string.max": "Name should have a maximum length of 30 characters",
    "any.required": "Name is a required field",
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.base": "Phone should be a string of digits.",
    "string.empty": "Phone cannot be an empty field.",
    "string.pattern.base": "Phone should be exactly 10 digits.",
    "any.required": "Phone is a required field.",
  }),



  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is a required field",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password hash should be a type of string",
    "string.empty": "Password hash cannot be an empty field",
    "string.min": "Password hash should have a minimum length of 6 characters",
    "any.required": "Password hash is a required field",
  }),

  // createdAt: Joi.date().default(() => new Date(), "current date"),
  // updatedAt: Joi.date().default(() => new Date(), "current date"),
});
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is a required field",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password hash should be a type of string",
    "string.empty": "Password hash cannot be an empty field",
    "string.min": "Password hash should have a minimum length of 6 characters",
    "any.required": "Password hash is a required field",
  }),
});
export const incomeSchema = Joi.object({
  userId: Joi.number().required().messages({
    "number.base": "Price should be a number",
    "any.required": "Price is a required field",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price should be a number",
    "any.required": "Price is a required field",
  }),
  types: Joi.string().max(255).required().messages({
    "string.base": "type should be a string",
    "string.max": "type cannot exceed 255 characters",
  }),
  description: Joi.string().max(255).required().messages({
    "string.base": "description should be a string",
    "string.max": "description cannot exceed 255 characters",
  }),
});

// module.exports = { userLoginSchema, userSchema };
