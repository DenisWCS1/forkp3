// this is the controller file
const models = require("../models");

const readmy = (req, res) => {
  models.myReservations
    .findmy(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  readmy,
};
