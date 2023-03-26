const moment = require("moment");
const models = require("../models");

const filtered = (req, res) => {
  const start = req.query.start || null;
  const end = req.query.end || null;
  // Check if the value of "req.query.location" cannot be parsed into a number by using the parseInt() function and the Number.isNaN() method
  // If the value can be parsed into a number and the result is equal to 1(Selectionner une localisation), location it's egal null
  const location =
    Number.isNaN(parseInt(req.query.location, 10)) ||
    parseInt(req.query.location, 10) === 1
      ? null
      : parseInt(req.query.location, 10);

  const startDatetime = moment(start, "DD-MM-YYYY HH:mm:ss", true);
  const endDatetime = moment(end, "DD-MM-YYYY HH:mm:ss", true);
  if (endDatetime.isBefore(startDatetime)) {
    res.json({ error: "End date should be after start date" });
  } else {
    models.room
      .filter(start, end, location)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};
module.exports = {
  filtered,
};
