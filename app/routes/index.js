var express = require('express');
var router = express.Router();
var queryController = require('.././controllers/queryController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  queryController.getAllUsers(function(data){
    return res.render('index', {rows: data});
  });
});

router.get('/user', function(req, res, next) {
  var type = req.query.button;
  if(type=='add'){
    queryController.getNoFriends(req.query.id,function(data){
      console.log(data);
      return res.render('friend', {rows: data, idSelected: req.query.id, nameSelected: req.query.name});
    });
  }else{
    queryController.getFriends(req.query.id,function(data){
      return res.render('index', {rows: data});
    });
  }
});

router.post('/addUser', function(req, res, next){
  queryController.addUser(req.body.userName, () => {
    res.redirect('/');
  });
});

module.exports = router;
