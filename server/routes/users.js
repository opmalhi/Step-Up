var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//when username and password is submitted for auth
router.post('/login',user_controller.loginchk); 

//here this route will destory all sessions.
router.get('/logout',user_controller.logout); 
router.get('/dashboard',user_controller.dashboard);

//when user wants to create an account
router.post('/signup',user_controller.usercreate);

//Retrieve Product Detail
router.get('/productdetails/:id',user_controller.getProductDetail);

//Casual Shoes Product route
router.get('/casual-shoes',user_controller.getCasualProduct);
router.post('/casual-shoes/:prodId',user_controller.getCasualProductDetail);

//Sneaker Shoes Product route
router.get('/sneaker-shoes',user_controller.getSneakerProduct);
router.post('/sneaker-shoes/:prodId',user_controller.getSneakerProductDetail);

//Sport Shoes Product route
router.get('/sport-shoes',user_controller.getSportProduct);
router.post('/sport-shoes/:prodId',user_controller.getSportProductDetail);

//Retrieve User Details
router.get('/userdetails', user_controller.getUserDetails);

//Cart Route
router.get('/cart',user_controller.getCart);
router.post('/addtocart/:id',user_controller.addtocart);
router.delete('/deleteitem/:id',user_controller.deleteItem);
router.delete('/checkout', user_controller.checkout);

module.exports = router;
