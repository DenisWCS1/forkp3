const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const { hashPassword, verifyToken } = require("./controllers/auth");
require("dotenv").config();

const router = express.Router();
router.use(cors());
// Use global rate limit
router.use(
  rateLimit({
    max: 120, // 120 requêtes maximum
    windowMs: 60 * 1000, // for 60 minutes (
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers (old headers)
  })
);

const userControllers = require("./controllers/userControllers");
const roomControllers = require("./controllers/roomControllers");
const locationControllers = require("./controllers/locationControllers");
const roomMaterialControllers = require("./controllers/room_materialControllers");
const reservationControllers = require("./controllers/reservationControllers");

/** ************************************
 ************ publics routers ********
 ************************************* */
router.get("/location", locationControllers.browse);
router.get("/filtered", roomControllers.filtered);
router.get("/room_material/:id", roomMaterialControllers.detail);

/** *************************************
 ************ protected routers ********
 ************************************** */
router.post("/user/login", userControllers.login);
router.post("/me", verifyToken, userControllers.me);
router.post(
  "/user",
  userControllers.validateUser,
  hashPassword,
  userControllers.register
);
router.get("/user", verifyToken, userControllers.browse);
router.put("/user/:id", verifyToken, userControllers.edit);
router.delete("/user/:id", verifyToken, userControllers.destroy);
router.delete("/resa/:id", verifyToken, userControllers.deleteUserRes);
router.post("/location", verifyToken, locationControllers.add);
router.post("/reservation", verifyToken, reservationControllers.add);
router.get("/reservations/:id", verifyToken, reservationControllers.readmy);
router.put("/reservation/:id", verifyToken, reservationControllers.edit);
router.delete("/reservation/:id", verifyToken, reservationControllers.destroy);
router.post("/reservation", verifyToken, reservationControllers.add);

/** ************************************
 ************ Statics routers ********
 ************************************* */

router.use("/rooms", express.static("public/rooms"));

module.exports = router;
