// Creating a MySQL connection
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'S3v3nt33n!',
  database: 'group17',  
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
// Create (INSERT)
function createUser(firstName, lastName, email, password) {
  let sql = `INSERT INTO contact_list.Users (FirstName, LastName, Email, Password) 
             VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
  db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Record Inserted ID:", result.insertId);
  });
}


// Read (SELECT)
function readUser(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM contact_list.Users WHERE ID = ${id}`;
    
    db.query(sql, (err, result) => {
        if (err) 
            reject(err); 
        else 
            resolve(result); 
        });
});
}

// Update
function updateUser(id, firstName) {
    let sql = `UPDATE contact_list.Users SET FirstName = '${firstName}' WHERE ID = ${id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Record Updated");
    });
}

// Delete
function deleteUser(id) {
    let sql = `DELETE FROM contact_list.Users WHERE ID = ${id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Record Deleted");
    });
}

module.exports = db;
let ID = 5
// Create a user
createUser('John', 'Doe', 'johndoe@email.com', 'yourPassword');

// Read a user assuming we have a user with an ID of 1
readUser(ID)
    .then(result => {
        if (result.length > 0) {
            let user = result[0];
            console.log(`User ID: ${user.ID}`);
            console.log(`First Name: ${user.FirstName}`);
            console.log(`Last Name: ${user.LastName}`);
            console.log(`Email: ${user.Email}`);
        } else {
            console.log('No user found with the given id');
        }
    })
    .catch(err => console.log(err));
// Update user's first name with ID 1
updateUser(ID, 'Johnny');

// Delete a user with ID 1
deleteUser(ID);