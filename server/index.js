var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index')
const app = express();

app.use(express.json());
app.use(cors());

//mongodb connection
mongoose.connect('mongodb+srv://omparkash:admin@cluster0.kxmc4.mongodb.net/stepup',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
  console.log('Connected To The Database');
})
.catch(err=>{
  console.log('Cannot Connect To The Database',err);
  process.exit();
});

app.use('/users', usersRouter);
app.use('/',indexRouter);

app.listen(3001,()=>{ console.log("server is running up at port 3001.") })

module.exports = app;