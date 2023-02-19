// this is the controller file
const models = require("../models");

const browse = (req, res) => {
  models.myReservations
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

const readmy = (req, res) => {
  models.myReservations
    .findmy(req.params.id)
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
  const myReservations = req.body;

  // TODO validations (length, format...)

  myReservations.id = parseInt(req.params.id, 10);

  models.myReservations
    .update(myReservations)
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
  const myReservations = req.body;

  // TODO validations (length, format...)

  models.myReservations
    .insert(myReservations)
    .then(([result]) => {
      res.location(`/myReservations/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.myReservations
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
  readmy,
  edit,
  add,
  destroy,
};
