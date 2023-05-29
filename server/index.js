import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vega1562Programmer",
  database: "memespace",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/discover", (req, res) => {
  const q = "SELECT * FROM memespace.memes";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/discover", (req, res) => {
  const q = "INSERT INTO memes (`id`, `topText`, `botText`, `bg`) VALUES (?)";
  // const values = [req.body.id, req.body.topText, req.body.botText, req.body.bg];
  const values = {
    id: 1,
    topText: "This is the top text",
    botText: "This is bot text",
    bg: "bg.png",
  };

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Meme has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM  books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated");
  });
});

app.listen(8800, () => {
  console.log("Connected to server.");
});
