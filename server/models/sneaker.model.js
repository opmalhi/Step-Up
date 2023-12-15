const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SneakerSchema = new Schema({
    imagePath:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    color:{type:String,required:true},
    description:{type:String,required:true},
    size:[{type:Array}],
    image1:{type:String,required:true},
    image2:{type:String,required:true},
    image3:{type:String,required:true}
});

module.exports = mongoose.model('sneakers', SneakerSchema);