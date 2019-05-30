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

const getFriends = (id, callback) => {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`SELECT u.id, u.name FROM User u, Friendship f WHERE u.id = f.user2 AND f.user1 = ?`,id, (err, rows) => {
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

const getNoFriends = (id, callback) => {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`SELECT u.id, u.name FROM User u, Friendship f WHERE u.id NOT IN (SELECT u.id FROM User u, Friendship f WHERE u.id = f.user2 AND f.user1 = ?)`,id, (err, rows) => {
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
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`INSERT INTO User(name) VALUES(?)`, name ,(err) => {
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
        callback();
    })
  });
};

const addRelationship = (id1,id2, callback) => {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database");
  });

  db.serialize(() => {
    db.all(`INSERT INTO Friendship(user1, user2) VALUES(?,?)`, id1, id2 ,(err) => {
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
    })
  });
  db.serialize(() => {
    db.all(`INSERT INTO Friendship(user1, user2) VALUES(?,?)`, id2, id1 ,(err) => {
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
    })
  });
  callback();
};

module.exports = {
  getAllUsers,
  addUser,
  getFriends,
  getNoFriends,
  addRelationship
};
