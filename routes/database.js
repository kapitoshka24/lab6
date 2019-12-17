var express = require("express");
var router = express.Router();

const db = require("../db.js");
/* GET users listing. */
router.get("/", function(req, res, next) { //получаем данные с бд (на клиент, отправляем их с сервера)
  db.all("SELECT * FROM Kids", (err, rows) => res.send(rows));
});

router.post("/", (req, res) => { //записываем данные в бд
  const { name, group } = req.body;
  db.run(`INSERT INTO Kids VALUES (NULL, '${name}','${group}')`);
  res.sendStatus(200);
});
module.exports = router;
