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

app.use(express.json()); // automatically parse JSON objects that are sent from the frontend (for example; params)

app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.post("/register", (req, res) => {
  const q =
    "INSERT INTO users (`id`, `email`, `username`, `password`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.email,
    req.body.username,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User created");
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});

app.get("/memes", (req, res) => {
  const q = "SELECT * FROM memespace.memes";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/memes", (req, res) => {
  const q = "INSERT INTO memes (`id`, `img`, `publicId`) VALUES (?)";
  const values = [req.body.id, req.body.img, req.body.publicId];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Meme has been created");
  });
});

app.delete("/memes/:id", (req, res) => {
  const memeId = req.params.id;
  const q = "DELETE FROM memes WHERE id = ?";

  db.query(q, [memeId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Meme has been deleted");
  });
});

// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q =
//     "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values, bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Book has been updated");
//   });
// });

app.listen(8800, () => {
  console.log("Connected to server.");
});
