export const validations = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsgs = error.details.map((err) => err.message);
      next(new AppError(errMsgs, 401));
    }
  };
};
