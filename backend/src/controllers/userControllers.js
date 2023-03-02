// this is the controller file
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      // with this line , i throw a response to the client
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

  // TODO validations (length, format...)

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
  // TODO validations (length, format...)

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
              const payload = {
                sub: user[0].id,
                iat: new Date().getTime() / 1000,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              res.json({ token });
            } else {
              res.sendStatus(401);
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const validateUser = [
  body("firstname")
    .isLength({ min: 3 })
    .withMessage("Un prénom doit contenir au moins 3 caractères"),
  body("lastname")
    .isLength({ min: 3 })
    .withMessage("Un nom doit contenir au moins 3 caractères"),
  body("email").notEmpty().withMessage("un email est obligatoire"),
  body("password")
    .isLength({ min: 9 })
    .withMessage(
      "Un mot de passe doit contenir au moins 9 caractères, dont au moins un chiffre"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

const register = (req, res) => {
  const user = req.body;
  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/register/${result.insertId}`).sendStatus(201);
    })
    .catch(() => {
      res.status(401).send("Email déjà enregistré");
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

module.exports = {
  browse,
  read,
  edit,
  add,
  login,
  register,
  validateUser,
  destroy,
};
