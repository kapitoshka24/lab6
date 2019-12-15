var express = require('express');
var router = express.Router();

const db = require('../db.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
db.all("SELECT * FROM Kids", (err, rows)=>(res.send(rows)))
});

router.post('/', (req, res) => {
    const {name, group} = req.body;
    db.run(`INSERT INTO Kids VALUES (NULL, '${name}','${group}')`);
})
module.exports = router;
