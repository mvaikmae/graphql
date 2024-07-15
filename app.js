const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'boilerplate');
app.use(expressLayouts);

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

// middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).redirect('/');
});


app.listen(3000, () => {
    console.log('Serving on port 3000')
})