const models = require("../models");

const filtered = (req, res) => {
  const start = req.query.start || null;
  const end = req.query.end || null;
  const location =
    Number.isNaN(parseInt(req.query.location, 10)) ||
    !Number.isInteger(parseInt(req.query.location, 10)) ||
    parseInt(req.query.location, 10) === 1
      ? null
      : parseInt(req.query.location, 10);

  models.room
    .filter(start, end, location)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
module.exports = {
  filtered,
};
