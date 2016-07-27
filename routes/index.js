var express = require('express');
var router = express.Router();
var search = require('../public/javascripts/barcode');
// var usersModel = require('../public/javascripts/db').usersModel;

/* GET home page. */
router.get('/aaa', function(req, res, next) {

  /*var syh = new models.usersModel({name:"syh"});
  syh.save(function (err, syh) {
    if (err) return console.error(err);
  });*/
  /*usersModel.find(function (err, users) {
    if (err) return console.error(err);
    res.render('index', { title: 'Express', users:users });
  });*/
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',wxconfig:res.wxconfig});
});

router.get('/code', function(req, res, next) {
  search(req, res, next);
});

module.exports = router;
