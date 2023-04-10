const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')
const userRoutes = require('./api/routes/user')
const authRoutes = require('./api/routes/auth')


mongoose.connect('mongodb://localhost:27017/');

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handling CORS
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type,Accept,Authorization'
  );
  if(req.method ==='OPTIONS'){
    req.header('Access-Control-Allow-Method', 'PUT,POST,DELETE,PATCH,GET');
    return res.status(200).json({})
  }
  next();
})

// setup middlewares
// app.use((req,res,next) => {
//     res.status(200).json({
//            message: 'Hello Jaey!'
//     });
   
// }); 

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/users',userRoutes)
app.use('/auth',authRoutes)

// handling error
app.use((req, res, next) => {
    const error = new Error('Not Found :: Error');
    error.status = 404;
    next(error);
})

app.use((error,req, res, next) => {
   res.status(error.status || 500);
   res.json({
    error:{
         message:error.message
    }
   })
})

module.exports = app;