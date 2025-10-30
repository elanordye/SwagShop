module.exports = async (query, args) => {
  console.log(`query: ${query} | args: ${args}`);

  switch (query) {

    case `INSERT INTO users
      (email, name, hash) VALUES
      ($1, $2, $3)`: return {
        id: 1,
        email: args[0],
        name: args[1],
        admin: false
      };

    case `SELECT id, email, name, admin
     FROM users
     WHERE id = $1`: return {
        id: args[0],
        email: 'alice@example.com',
        name: 'Alice',
        admin: false
      };

    case `UPDATE users SET
     email = $1,
     name  = $2,
     hash  = $3
     WHERE id = $4`: return {
        id: args[3],
        email: args[0],
        name: args[1],
        admin: false
      };

    case `DELETE FROM users
     WHERE id = $1`: return;

    case `SELECT id, datetime, status
     FROM orders
     WHERE user_id = $1`: return [
    {
      id: 1,
      datetime: "2024-03-1T14:25:43.511Z",
      status: "fulfilled"
    },
    {
      id: 2,
      datetime: "2024-03-2T15:25:43.511Z",
      status: "canceled"
    },
    {
      id: 3,
      datetime: "2024-03-3T15:25:43.511Z",
      status: "pending"
    }
  ];

  }
};
