const sqlite3 = require("sqlite3").verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'database.sqlite')


const getAllUsers = (callback) => {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`SELECT * FROM User ORDER BY id DESC`, (err, rows) => {
        if(err){
            console.error(err.message);
        }else{
          db.close((err) => {
            if (err){
                console.error(err.message);
            }
            console.log('Closed the database connection');
        });
        }
          callback(rows);
    })
  });
};

const addUser = (name, callback) => {
  let users;
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`INSERT INTO User(name) VALUES(?)`, name ,(err, rows) => {
        if(err){
            console.error(err.message);
        }else{
          db.close((err) => {
            if (err){
                console.error(err.message);
            }
            console.log('Closed the database connection');
        });
        }
          callback(rows);
    })
  });
};



module.exports = {
  getAllUsers,
  addUser
};
