const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

function validateSignupForm(payload) {
  const err = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    err.email = 'Please provide a valid email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    err.password = 'Password must have at least 6 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    err.name = 'Please provide a username.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    err
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    console.log(payload.username);
    isFormValid = false;
    errors.username = 'Please enter your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    console.log(payload.password);
    isFormValid = false;
    errors.password = 'Please enter your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateRecipeForm(payload) {
  const err = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.recipe_name !== 'string' || payload.recipe_name.trim().length === 0) {
    isFormValid = false;
    err.email = 'Please give your recipe a name.';
  }

  if (!payload || typeof payload.category !== 'string' || payload.category.trim().length === 0) {
    isFormValid = false;
    err.password = 'Please select a category.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    err
  };
}

//ok, so we want to post the SignUpForm to here. Need to connect to the database here
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      err: validationResult.err
    });
  }

  //uses the local-signup (in the passport folder) to validate
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        //this code represents a duplicate email error
        //the 409 HTTP status code is a conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          err: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Signup successful! Please visit the login page to login.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  console.log(validationResult);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      sucess: true,
      message: 'Login successful!',
      token,
      username: userData
    });  
  })(req, res, next);
});

router.post('/submit', (req, res) => {
  const validationResult = validateRecipeForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      err: validationResult.err
    });
  }

  return res.status(200).end();
});


module.exports = router;