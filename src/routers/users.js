const bcrypt = require('bcrypt');
const saltRounds = 10;

const query = require('../db.js');

const router = require('express').Router();


router.post('/', function ({body}, res, next) {
  bcrypt.hash(body.password, saltRounds, (err, hash) => {
    if (err) throw err;
    query(
      `INSERT INTO users
      (email, name, hash) VALUES
      ($1, $2, $3)`,
      [body.email, body.name, hash]
    ).then(
      result => {
        res.status(201).send(result);
      },
      error => {
        res.status(error.status).send(error.message);
      }
    );
  });
});

router.get('/:id/', function ({params}, res, next) {
  query(
    `SELECT id, email, name, admin
     FROM users
     WHERE id = $1`,
     [params.id]
  ).then(
    result => {
      res.status(200).send(result);
    },
    error => {
      res.status(error.status).send(error.message);
    }
  );
});

router.patch('/:id/', function ({params, body}, res, next) {
  bcrypt.hash(body.password, saltRounds, (err, hash) => {
    if (err) throw err;
    query(
      `UPDATE users SET
       email = $1,
       name  = $2,
       hash  = $3
       WHERE id = $4`,
      [
        body.email,
        body.name,
        hash,
        params.id
      ]
    ).then(
      result => {
        res.status(204).send();
      },
      error => {
        res.status(error.status).send(error.message);
      }
    );
  });
});

router.delete('/:id/', function ({params}, res, next) {
  query(
    `DELETE FROM users
     WHERE id = $1`,
     [params.id]
  ).then(
    result => {
      res.status(204).send();
    },
    error => {
      res.status(error.status).send(error.message);
    }
  );
});

router.get('/:id/orders/', function ({params}, res, next) {
  query(
    `SELECT id, datetime, status
     FROM orders
     WHERE user_id = $1`,
     [params.id]
  ).then(
    result => {
      res.status(200).send(result);
    },
    error => {
      res.status(error.status).send(error.message);
    }
  );
});



module.exports = router;
