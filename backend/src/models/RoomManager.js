const AbstractManager = require("./AbstractManager");

class RoomManager extends AbstractManager {
  constructor() {
    super({ table: "room" });
  }

  filter(start, end, location) {
    const sqlvalues = [];
    const sql = ` SELECT room.id, room.capacity, room.name, room.url_picture, location.city_name FROM ${
      this.table
    } 
        LEFT JOIN location ON room.fk_location = location.id 
       WHERE  ${location !== null ? "location.id = ? and" : ""}
        room.id NOT IN(
            SELECT room.id FROM ${this.table} 
            INNER JOIN reservation as r
            ON room.id = r.fk_room  WHERE 
            (r.start_datetime  <= STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') AND r.end_datetime  >= STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s'))
            GROUP BY room.id)
          order by room.id asc`;
    if (location !== null) {
      sqlvalues.push(location, end, start);
    } else {
      sqlvalues.push(end, start);
    }

    return this.database.query(sql, sqlvalues);
  }
}
module.exports = RoomManager;
