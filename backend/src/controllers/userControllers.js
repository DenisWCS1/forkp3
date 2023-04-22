const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;
  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const me = (req, res) => {
  models.user
    .find(req.payload.sub)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  models.user
    .findByEmail(email)
    .then(([user]) => {
      if (user[0] != null) {
        argon2
          .verify(user[0].password, password)
          .then((isVerified) => {
            if (isVerified) {
              const token = jwt.sign(
                {
                  sub: user[0].id,
                  iat: new Date().getTime() / 1000,
                },
                process.env.JWT_SECRET
              );

              res.status(200).json({ token });
            } else {
              res.sendStatus(401);
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      } else {
        res.status(401).send("Mot de passe ou email incorrect");
      }
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const register = (req, res) => {
  const user = req.body;
  console.info(req.body);

  console.info(user);
  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/register/${result.insertId}`).sendStatus(201);
    })
    .catch(() => {
      res.status(401).json({
        validationErrors: [
          {
            location: "body",
            msg: "Action interdite",
            param: "xss",
            value: "Action interdite",
          },
        ],
      });
    });
};
const deleteUserRes = (req, res) => {
  models.user
    .eraseUserRes(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
/** ************************************************************************************** */
/** ******************Check register form fields with Express Validator ******************* */
/** **************************************************************************************** */

// Trim trims characters (whitespace by default) at the beginning and at the end of a string
// escape replaces <, >, &, ', " and / with their corresponding HTML entities
// REGEX PASSWORD
// ((?=.*\d)) password contains at least one digit
// ((?=.[A-Z])) one uppercase letter
// ((?=.[!@#$%^&()_+}{"':;?/>.<,])) one special character
// .+ at the end is used to ensure there is at least one character in the password.
const validateUser = [
  body("firstname")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Un prénom doit contenir au moins 3 caractères"),
  body("lastname")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Un nom doit contenir au moins 3 caractères"),
  body("email")
    .notEmpty()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("un email est obligatoire"),
  body("password")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-z]).{9,}$/
    )
    .isLength({ min: 9 })
    .withMessage(
      "Le mot de passe doit contenir au moins un chiffre, un caractère spécial et une lettre majuscule et avoir une longueur de 9 caractères minimum"
    ),
  (req, res, next) => {
    const emailvalidate = req.body.email;

    models.user.findByEmail(emailvalidate).then(([email]) => {
      if (email[0] != null) {
        res.status(422).json({
          validationErrors: [
            {
              location: "body",
              msg: "email déjà utilisé",
              param: "email",
              value: emailvalidate,
            },
          ],
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ validationErrors: errors.array() });
        } else {
          next();
        }
      }
    });
  },
];
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  me,
  login,
  register,
  deleteUserRes,
  validateUser,
};
