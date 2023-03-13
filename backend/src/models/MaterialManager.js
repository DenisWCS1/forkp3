const AbstractManager = require("./AbstractManager");

class MaterialManager extends AbstractManager {
  constructor() {
    super({ table: "material" });
  }

  insert(material) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      material.name,
    ]);
  }

  update(material) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [material.name, material.id]
    );
  }
}

module.exports = MaterialManager;
