require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const routerUsers = require("./api/users/routerUsers");
const routerTechnology = require("./api/technology/routerTechnology");
const routerCategory = require("./api/category/routerCategory");
const routerUploadProject = require("./api/project/upload/routerUploadProject");
const routerProject = require("./api/project/routerProject");
const routerEducation = require("./api/education/routerEducation");
const routerExperience = require("./api/experience/routerExperience");
const routerSkill = require("./api/skill/routerSkill");
const routerProfile = require("./api/profile/routerProfile");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.use("/uploads", express.static(path.join(__dirname, "upload")));

app.use("/api", routerUsers);
app.use("/api", routerTechnology);
app.use("/api", routerCategory);
app.use("/api", routerUploadProject);
app.use("/api", routerProject);
app.use("/api", routerEducation);
app.use("/api", routerExperience);
app.use("/api", routerSkill);
app.use("/api", routerProfile);


app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});