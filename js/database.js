const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group17',
    database: 'COP4331',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});


app.post('/user', (req, res) => {
    const { Username, Password } = req.body;

    let sql = "SELECT ID, Username, Password FROM COP4331.users WHERE Username = ? AND Password = ?";
    let query = mysql.format(sql, [Username, Password]);
    db.query(query, (err, rows) => {
        console.log(query);
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
            return;
        }
        if (rows.length > 0) {
            const { ID, Username, Passworde } = rows[0];
            res.json({ id: ID, Username, Password, error: '' });
            return;
        }
        res.json({ id: 0, error: 'No Records Found' });
    });
});

app.post('/list', (req, res) => {
    const { ID } = req.body;

    let sql = "SELECT ContactList FROM COP4331.users WHERE ID = ?";
    let query = mysql.format(sql, [ID]);

    db.query(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
            return;
        }

        if (rows.length > 0) {
              const { ContactList } = rows[0]; 
              res.json({ ContactList }); 
        } 
        else {
          res.json({ ContactList: '', error: 'No Records Found' });
        }
    });
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    

    const sql = 'INSERT INTO COP4331.users (Username, Password) VALUES (?, ?)';
    const inserts = [username, password];
    const query = mysql.format(sql, inserts);

    db.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while signing up.' });
            return;
        }
        
        res.json({ success: true, message: 'User signed up successfully.' });
    });
});

app.post('/readContact', (req, res) => {
  const { ID } = req.body;

  const sql = 'SELECT Name, Email, Phone FROM COP4331.contact WHERE ID = ?';
  const inserts = [ID];
  const query = mysql.format(sql, inserts);

  db.query(query, (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while reading contact' });
      return;
    }
    if (rows.length > 0) {
      const { Name, Email, Phone } = rows[0]; 
      res.json({ Name, Email, Phone }); 
    } else {
      res.json({ Name: '', Email: '', Phone: '', error: 'No Records Found' });
    }
  });
});

app.post('/addContact', (req, res) => {
    console.log(req.body);
    const { Name, Email, Phone } = req.body;
    
    const sql = 'INSERT INTO COP4331.contact (Name,Email,Phone) VALUES (?, ?, ?)';
    console.log(Name, Email, Phone);
    const inserts = [Name, Email, Phone];
    const query = mysql.format(sql, inserts);
    

    db.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while adding the contact.' });
            return;
        }
        
        res.json({ success: true, message: 'Contact added successfully.' });
    });
});

app.post('/deleteContact', (req, res) => {
    const { ID } = req.body;
    const inserts = [ID]

    const sql = 'DELETE FROM COP4331.contact WHERE ID = ?';
    const query = mysql.format(sql, inserts);
    

    db.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the contact.' });
            return;
        }
        
        res.json({ success: true, message: 'Contact deleted successfully.' });
    });
});

app.post('/editContact', (req, res) => {   
    const  { Name, Email, Phone, ID } = req.body;
    
    const sql = 'UPDATE COP4331.contact SET Name = ?, Phone = ?, Email = ? WHERE ID = ?';
    const inserts = [Name, Email, Phone, ID];
    const query = mysql.format(sql, inserts);
    

    db.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while editing the contact.' });
            return;
        }
        
        res.json({ success: true, message: 'Contact edited successfully.' });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});