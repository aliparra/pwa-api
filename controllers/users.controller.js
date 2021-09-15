const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            errors: { email: "This email is already in use" },
          })
        );
      } else {
        // User creation
        return User.create(req.body).then((user) => {
          res.status(201).json(user);
        });
      }
    })
    .catch(next);
};

module.exports.get = (req, res, next) => {
  User.findById(req.currentUser).then((user) => {
    if (!user) {
      next(createError(404));
    } else {
      res.json(user);
    }
  });
};

module.exports.logout = (req, res, next) => {
  console.log(req.currentUser);
  User.findOneAndUpdate(req.currentUser, { logout: new Date() }).then(
    (user) => {
      if (!user) {
        next(createError(404));
      } else {
        res.json("logout succes");
      }
    }
  );
};

//AUTH

module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // Error if no user
        next(
          createError(404, {
            errors: { email: "Email or password is incorrect" },
          })
        );
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            //Error if no password
            next(
              createError(404, {
                errors: { email: "Email or password is incorrect" },
              })
            );
          } else {
            // JWT generation - only id is passed
            res.json({
              access_token: jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET || "changeme",
                {
                  expiresIn: "1h",
                }
              ),
              logout_date: user.logout,
            });
          }
        });
      }
    })
    .catch((error) => next(error));
};
