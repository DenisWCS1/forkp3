const AbstractManager = require("./AbstractManager");

class MyReservationsManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  findmy(id) {
    return this.database.query(
      `select location.city_name,room.name, start_datetime, end_datetime 
      FROM ${this.table} 
      INNER JOIN room 
      ON reservation.fk_room = room.id
      INNER JOIN location
      ON fk_room = room.id
      WHERE fk_user = ?`,
      [id]
    );
  }

  delete(id) {
    return this.database.query(`delete ${this.table} set where id = ?`, [id]);
  }
}

module.exports = MyReservationsManager;
