const AbstractManager = require("./AbstractManager");

class RoomMaterialManager extends AbstractManager {
  constructor() {
    super({ table: "room_material" });
  }

  roomdetails(id) {
    return this.database.query(
      ` SELECT JSON_ARRAYAGG(material.name) as material, room.name, room.url_picture, adress, room.lat, room.lng, capacity
      FROM ${this.table}
      INNER JOIN room 
      ON room.id = fk_room
      INNER JOIN material  
      ON material.id = fk_material
      WHERE fk_room = ?
      GROUP BY room.name
      `,
      [id]
    );
  }
}

module.exports = RoomMaterialManager;
