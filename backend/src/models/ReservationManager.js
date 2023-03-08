const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  insert(reservation) {
    return this.database.query(
      `insert into ${this.table} (fk_user, fk_room, start_datetime, end_datetime) values (?, ?, ?, ?)`,
      [
        reservation.fk_user,
        reservation.fk_room,
        reservation.start_datetime,
        reservation.end_datetime,
      ]
    );
  }

  update(reservation) {
    return this.database.query(
      `update ${this.table} set updated_on = ? where id = ?`,
      [
        reservation.fk_user,
        reservation.fk_room,
        reservation.start_datetime,
        reservation.end_datetime,
        reservation.updated_on,
        reservation.created_on,
      ]
    );
  }
}

module.exports = ReservationManager;
