const database = require("./database");

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += "where language = ?";
    sqlValues.push(req.query.language);
  }

  if (req.query.city != null) {
    sql += "where city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([user]) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const idz = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [idz])
    .then(([user]) => {
      if (user[0] != null) {
        res.json(user[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  getUsersById,
};
