const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.database.query(
      `select id, firstname, lastname, email, role from ${this.table}`
    );
  }

  find(id) {
    return this.database.query(
      `select id, firstname, lastname, email, role, created_at, updated_at from ${this.table} where id = ?`,
      [id]
    );
  }

  findByEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ? `, [
      email,
    ]);
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?  where id = ?`,
      [user.firstname, user.lastname, user.email, user.id]
    );
  }

  insert(user) {
    return this.findByEmail(user.email)
      .then((result) => {
        if (result.length === 0) {
          return Promise.reject();
        }
        return this.database.query(
          `insert into ${this.table} (firstname, lastname, email, password, role) values (?,?,?,?,?) `,
          [user.firstname, user.lastname, user.email, user.password, "user"]
        );
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  eraseUserRes(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = UserManager;
