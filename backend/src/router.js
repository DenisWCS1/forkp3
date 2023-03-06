const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { hashPassword, verifyToken } = require("./controllers/auth");
require("dotenv").config();

const router = express.Router();
router.use(cors());

const userControllers = require("./controllers/userControllers");
const roomControllers = require("./controllers/roomControllers");
const locationControllers = require("./controllers/locationControllers");
const materialControllers = require("./controllers/materialControllers");
const roomMaterialControllers = require("./controllers/room_materialControllers");
const reservationControllers = require("./controllers/reservationControllers");
const myReservationsControllers = require("./controllers/myReservationsControllers");

router.post("/user/login", userControllers.login);
router.post("/me", verifyToken, userControllers.me); // route pour récupérer data user connecté
router.post(
  "/user",
  userControllers.validateUser,
  hashPassword,
  userControllers.register
);

router.get("/filtered", roomControllers.filtered);

router.get("/location", locationControllers.browse);
router.get("/location/:id", locationControllers.read);
router.put("/location/:id", locationControllers.edit);

router.delete("/location/:id", locationControllers.destroy);

router.get("/material", materialControllers.browse);
router.get("/material/:id", materialControllers.read);
router.put("/material/:id", materialControllers.edit);
router.post("/material", materialControllers.add);
router.delete("/material/:id", materialControllers.destroy);

router.get("/room_material/:id", roomMaterialControllers.detail);

router.get("/reservation", reservationControllers.browse);
router.get("/reservation/:id", reservationControllers.read);
router.put("/reservation/:id", reservationControllers.edit);
router.post("/reservation", reservationControllers.add);
router.delete("/reservation/:id", reservationControllers.destroy);

// ** protected routes **

// user
router.get("/user", verifyToken, userControllers.browse);
router.delete("/user/:id", verifyToken, userControllers.destroy);
router.put("/user/:id", verifyToken, userControllers.edit);
// location
router.post("/location", verifyToken, locationControllers.add);

// My reservations
router.get(
  "/myReservations/:id",
  verifyToken,
  myReservationsControllers.readmy
);

//* * Static routes **
router.use("/rooms", express.static("public/rooms"));

router.use(
  session({
    secret: "access-token",
    resave: true,
    saveUninitialized: true,
  })
);

module.exports = router;
