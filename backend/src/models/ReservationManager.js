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
        reservation.updated_at,
        reservation.created_at,
      ]
    );
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

module.exports = ReservationManager;
