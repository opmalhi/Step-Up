const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    dob:{type:Date,required:true},
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    tokens:[{
        token:{type:String,required:true}
    }]

});

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},`my-32-character-ultra-secure-and-ultra-long-secret`);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model('User', UserSchema);