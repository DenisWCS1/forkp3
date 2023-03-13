const models = require("../models");

const detail = (req, res) => {
  models.room_material
    .roomdetails(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

module.exports = {
  detail,
};
