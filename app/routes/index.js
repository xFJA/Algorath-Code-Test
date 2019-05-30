var express = require('express');
var router = express.Router();
var queryController = require('.././controllers/queryController.js');

router.get('/', function(req, res, next) {
  queryController.getAllUsers(function(data){
    return res.render('index', {rows: data});
  });
});

router.get('/user', function(req, res, next) {
  var type = req.query.button;
  if(type=='add'){
    queryController.getNoFriends(req.query.id,function(data){
      return res.render('friend', {rows: data, idSelected: req.query.id, nameSelected: req.query.name});
    });
  }else{
    queryController.getFriends(req.query.id,function(data){
      return res.render('index', {rows: data});
    });
  }
});

router.post('/friend', function(req, res, next) {
  queryController.addRelationship(req.body.id1, req.body.id2, () => {
    res.redirect('/');
  });
});

router.post('/addUser', function(req, res, next){
  queryController.addUser(req.body.userName, () => {
    res.redirect('/');
  });
});

module.exports = router;
