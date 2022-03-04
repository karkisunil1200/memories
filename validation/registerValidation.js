const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  //check name
  if (isEmpty(data.name)) {
    errors.name = "Name field cannot be empty";
  } else if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters long";
  }

  // check the email field
  if (isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }
  //check password
  if (isEmpty(data.password)) {
    errors.password = "password field cannot be empty";
  } else if (!Validator.isLength(data.password, { min: 4, max: 50 })) {
    errors.password = "Password must be between 4 and 30 characters long";
  }

  //check the confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field cannot be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
