const User = require('../models/user.model');
const casual = require('../models/casual.model');
const sneaker = require('../models/sneaker.model');
const sport = require('../models/sport.model');
const product = require('../models/product.model');
const Cart = require("../models/cart.model") 
const bcrypt = require('bcryptjs');

//Here We Create a user
exports.usercreate = async(req, res) => {
    const {name,username,email,password,phone,dob,address} = req.body;
    if(!name || !username || !email || !password || !phone || !dob || !address){
        return res.status(422).json({error:"Plz fill the fields properly"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email Already Exists"});
        }else{
            const user = new User({name,username,email,password,phone,dob,address});
            await user.save();
            res.status(201).json({message:"User Registered Successfully"});
        }
    }catch(err){
        console.log(err);
    }
};

//Here it will check the user is vaild or not
exports.loginchk = async (req,res)=>{
    const {username,password}=req.body;
    try{
        if(!username || !password){
            return res.status(400).json({error:"Plz fill the all fields"})
        }
        const userlogin = await User.findOne({username:username});
        if(userlogin){
            const isPass = await bcrypt.compare(password,userlogin.password);
            const token = await userlogin.generateAuthToken();
            // console.log(token);
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+300000),
                httpOnly:true
            });
            if(!isPass){
                res.status(400).json({message:"Invaild Email or Password"});
            }else{
                res.json({message:"User SignIn Successfully"});
            }
        }else{
            res.status(400).json({message:"User not found"});
        }
    }catch(err){
        res.send(err)
    }
}

//Here it will clear the cookie when user want to logout
exports.logout = (req,res)=>{
    res.clearCookie("jwtoken");
    res.status(200).send("User Logged Out");
}

//Here it will retreive product after user login on home page
exports.dashboard=(req,res)=>{
        product.find((err,data)=>{
            if(err) return next(err);
            res.send(data);
        });
}

//Here it will retrieve the only casual product from database
exports.getCasualProduct =(req, res) => {
    casual.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
    
};

//Here it will retrieve the only sneaker product from database
exports.getSneakerProduct =(req, res, next) => {
    sneaker.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
};

//Here it will retrieve the only Sport product from database
exports.getSportProduct =(req, res, next) => {
    sport.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
};

//Here it will retrieve the casual product detail from database
exports.getCasualProductDetail = (req, res, next) => {
    const id = req.params.id;
    casual.findById(id,(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });  
}

//Here it will retrieve the sneaker product detail from database
exports.getSneakerProductDetail = (req, res, next) => {
    const id = req.params.id;
    sneaker.findById(id,(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });  
}

//Here it will retrieve the sport product detail from database
exports.getSportProductDetail = (req, res, next) => {
    const id = req.params.id;
    sport.findById(id,(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });  
}

//Here it will retrieve the user dashboard product detail from database
exports.getProductDetail = (req, res, next) => {
    const id = req.params.id;
    product.findById(id,(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });   
}

//Here it will retrieve the user detail from database
exports.getUserDetails =(req, res, next) => {
    const id = req.params.id;
    User.findById(id,(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });  
};

//Here we are add item to the cart
exports.addtocart = (req, res) => {
    const id = req.params.id;
    try{
        // const userExist = await User.findOne({email:email});
        
        // if(userExist){
            //     return res.status(422).json({error:"Email Already Exists"});
            // }
            product.findById(id,(err,result)=>{
                if(err) res.send(err);
                const cart = new Cart({
                    name:result.name,
                    price:result.price,
                    category:result.category,
                    imagePath:result.imagePath,
                });
                cart.save();
                res.status(201).json({message:"Add TO Cart Successfully"});
            }); 
    }catch(err){
        console.log(err);
    }
};

//Here we retrieve all item we add to cart 
exports.getCart =(req, res, next) => {
    Cart.find({},(err,result)=>{
        if(err) res.send(err);
        res.send(result);
    });
};

//Here we delete the item from cart
exports.deleteItem =async(req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await Cart.findByIdAndRemove(id).exec();
    return res.send('Deleted.');
};

exports.checkout = async(req, res, next) => {
    await Cart.remove({}).exec();
    console.log(Cart);
    res.send('Checkout');
};

