const AbstractManager = require("./AbstractManager");

class MyReservationsManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  findmy(id) {
    return this.database.query(
      `select tb.id, location.city_name AS localisation, room.name AS nom, tb.start_datetime AS start, tb.end_datetime AS end, tb.created_at
      FROM ${this.table} AS tb
      INNER JOIN room 
      ON room.id = tb.fk_room
      INNER JOIN location
      ON room.fk_location = location.id
      WHERE fk_user = ?
      order by  tb.created_at DESC`,
      [id]
    );
  }
}

module.exports = MyReservationsManager;
