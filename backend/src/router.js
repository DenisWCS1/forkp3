const express = require("express");
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

// Routers non utilisés ?
router.get("/location/:id", locationControllers.read);
router.put("/location/:id", locationControllers.edit);
router.delete("/location/:id", locationControllers.destroy);
router.get("/material", materialControllers.browse);
router.get("/material/:id", materialControllers.read);
router.put("/material/:id", materialControllers.edit);
router.post("/material", materialControllers.add);
router.delete("/material/:id", materialControllers.destroy);
router.get("/room_material/:id", roomMaterialControllers.detail);
router.post("/reservation", verifyToken, reservationControllers.add);
router.get("/reservation", reservationControllers.browse);
router.get("/reservation/:id", reservationControllers.read);
router.post("/reservation", reservationControllers.add);

/** ************************************
 ************ publics routers ********
 ************************************* */
router.get("/location", locationControllers.browse);
router.get("/filtered", roomControllers.filtered);

/** *************************************
 ************ protected routers ********
 ************************************** */
router.post("/user/login", userControllers.login);
router.post("/me", verifyToken, userControllers.me); // route pour récupérer data user connecté
router.post(
  "/user",
  userControllers.validateUser,
  hashPassword,
  userControllers.register
);
router.get("/user", verifyToken, userControllers.browse);
router.put("/user/:id", verifyToken, userControllers.edit);
router.delete("/user/:id", verifyToken, userControllers.destroy);
router.delete("/resa/:id", verifyToken, userControllers.deleteresa);
router.post("/location", verifyToken, locationControllers.add);
router.get(
  "/myReservations/:id",
  verifyToken,
  myReservationsControllers.readmy
);
/* @David tu peux ajouter ta route ici */
router.put("/reservation/:id", verifyToken, reservationControllers.edit);
router.delete("/reservation/:id", verifyToken, reservationControllers.destroy);

/** ************************************
 ************ Statics routers ********
 ************************************* */
router.use("/rooms", express.static("public/rooms"));

module.exports = router;
