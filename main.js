import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const prisma = new PrismaClient();

app.use("/statics", express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.post("/add", async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "body not found" });
  }

  try {
    await prisma.$connect();
    const animal = await prisma.animal.create({
      data: {
        name: req.body.name,
        emoji: req.body.emoji,
      },
    });

    res.status(200).json({ animalSaved: animal });
  } catch (e) {
    res.status(500).json({ status: 500, error: "Something went wrong"});
  }
});

app.get("/api/animals/byname/:animalName", async (req, res) => {
  const { animalName } = req.params;
  try {
    await prisma.$connect();

    const animal = await prisma.animal.findMany({
      where: {
        name: animalName,
      },
    });
    res.json(animal);
  } catch (e) {
    throw e;
  }
});

app.get("/api/animals/byemoji/:animalEmoji", async (req, res) => {
  const { animalEmoji } = req.params;
  try {
    await prisma.$connect();

    const animal = await prisma.animal.findMany({
      where: {
        emoji: animalEmoji,
      },
    });
    res.json(animal);
  } catch (e) {
    throw e;
  }
});

// GET: /
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Camel", emoji: "🐪", delimiter: "?" });
});

// GET: /search
app.get("/search", (req, res) => {
  res.render("search.ejs");
});

app.get("/search/byname", (req, res) => {
  res.render("searchByName.ejs");
});

app.get("/search/byemoji", (req, res) => {
  res.render("searchByEmoji.ejs");
});

// GET: /add
app.get("/add", (req, res) => {
  res.render("add.ejs");
});

// GET: /insert
app.get("/insert", (req, res) => {
  res.redirect("/add");
});

app.listen(3000 || process.env.PORT, () => {
  console.log(
    `Server is live! on http://localhost:${3000 || process.env.PORT}`
  );
});