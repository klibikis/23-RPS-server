import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { db } from "./db";

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cors({ origin: "*" }));


app.listen(3006, () => {
    console.log("Application started on port 3006!");
});


app.get("/", (req: Request, res: Response) => {
    res.send("Application works!");
});

app.get("/scores", (req: Request, res: Response) => {
    db.query("SELECT * FROM scores ORDER BY `date` desc LIMIT 100;", function (err, data) {
        if (err) throw err;
        res.send(data);
    });
}); 

app.post("/scores", (req: Request, res: Response) => {
  const values = [
    req.body.gameEndState,
    req.body.playerPoints,
    req.body.opponentPoints,
    req.body.date
  ];
  db.query("INSERT INTO scores(gameEndState, playerPoints, opponentPoints, date) VALUES (?);", [values], (err, data) => {
    if (err) throw err;
      res.send(data);
    });
});


// SORTING
app.get("/scores/dateDesc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `date` desc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/dateAsc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `date` asc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/statusDesc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `gameEndState` desc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/statusAsc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `gameEndState` asc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/playerPointsDesc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `playerPoints` desc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/playerPointsAsc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `playerPoints` asc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/opponentPointsDesc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `opponentPoints` desc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
app.get("/scores/opponentPointsAsc", (req: Request, res: Response) => {
  db.query("SELECT * FROM scores ORDER BY `opponentPoints` asc LIMIT 100;", function (err, data) {
      if (err) throw err;
      res.send(data);
  });
});
