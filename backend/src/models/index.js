require("dotenv").config();

const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

const models = {};

const RoomManager = require("./RoomManager");
const UserManager = require("./UserManager");
const LocationManager = require("./LocationManager");
const MaterialManager = require("./MaterialManager");
const RoomMaterialManager = require("./Room_materialManager");
const ReservationManager = require("./ReservationManager");

models.room = new RoomManager();
models.user = new UserManager();
models.location = new LocationManager();
models.material = new MaterialManager();
models.room_material = new RoomMaterialManager();
models.reservation = new ReservationManager();

models.room.setDatabase(pool);
models.user.setDatabase(pool);
models.location.setDatabase(pool);
models.material.setDatabase(pool);
models.room_material.setDatabase(pool);
models.reservation.setDatabase(pool);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
