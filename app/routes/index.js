var express = require('express');
var router = express.Router();
var queryController = require('.././controllers/queryController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  queryController.getAllUsers(function(data){
    return res.render('index', {rows: data});
  });
});

router.post('/addUser', function(req, res, next){
  queryController.addUser(req.body.userName, () => {
    res.redirect('/');
  });
});

module.exports = router;
