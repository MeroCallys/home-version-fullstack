import express from "express";
import cors from "cors";
import pg from "pg";
// import { postgres } from "./database/db";

const postgres = {
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1023",
  port: 5432,
};

const client = new pg.Client(postgres);
client.connect();
client.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/profiles", async (req, res) => {
  const result = await client.query("SELECT * FROM profiles");
  res.json(result.rows);
  console.log(result.rows);
});
app.get("/profiles/:id", async (req, res) => {
  // console.log(req.params);
  const input = req.params.id;
  console.log(req.params.id);
  const result = await client.query(
    `SELECT * FROM profiles WHERE id = ${input}`
  );
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
