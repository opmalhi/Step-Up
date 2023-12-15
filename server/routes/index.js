var express = require('express');
var router = express.Router();
var Casual = require('../models/casual.model');
var Sport = require('../models/sport.model');
var Sneaker = require('../models/sneaker.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/casualshoes', async function(req, res) {
   await Casual.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });

});

router.get('/sportshoes',async function(req, res, next) {
    await Sport.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
});


router.get('/sneakershoes', async function(req, res, next) {
    await Sneaker.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
});

module.exports = router;
