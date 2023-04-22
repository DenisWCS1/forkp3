require("dotenv").config();
const rateLimit = require("express-rate-limit");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const helmet = require("helmet");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(
  rateLimit({
    max: 120, // 120 requêtes maximum
    windowMs: 60 * 1000, // for 60 minutes (
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers (old headers)
  })
);
const router = require("./router");

app.use(router);
app.use(express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
