const models = require(".");

const filtered = (req, res) => {
  const start = req.query.start || null;
  const end = req.query.end || null;
  const location = parseInt(req.query.location, 10) || null;
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
