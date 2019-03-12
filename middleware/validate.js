exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('email');
  req.sanitizeBody('password');

  // Email is non-null, valid and normalized
  req.checkBody('email', 'You must supply an email').notEmpty();
  req.checkBody('email', 'Enter a valid email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });

  // Password is non-null and is 4 to 22 characters
  req.checkBody('password', 'You must supply a password').notEmpty();
  req
    .checkBody('password', 'Password must be between 4 and 22 characters')
    .isLength({ min: 4, max: 22 });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return next({ status: 400, message: firstError });
  }

  // Everything is OK
  next();
};
