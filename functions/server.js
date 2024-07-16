const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

//Debug:

console.log('EJS module loaded:', typeof ejs === 'function');
console.log('Current working directory:', process.cwd());



const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('layout', 'boilerplate');
app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render('simplt');
});

// const indexRouter = require('../routes/index');
// const userRouter = require('../routes/user');

// app.use('/', indexRouter);
// app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).redirect('/');
});



module.exports.handler = serverless(app);
