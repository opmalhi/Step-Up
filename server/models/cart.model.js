const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    imagePath:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
});

module.exports = mongoose.model('carts', CartSchema);