// minimalistic online store: no real database, no authentication

const express = require('express');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './ejs_views');

//app.use('/images', express.static(__dirname+'/data/images'));
app.use(express.urlencoded({extended: false}));
app.use(session({
	secret: 'mysecretkey',
	resave: false,
    saveUninitialized: false, // changed to false_FS
    cookie: {
        maxAge: 60*60, // if inactive, session expires in 1 hour
        path: '/'
    }
}));

// start changing from here............................................................

// const books_db = require('./data/books_db');
// const ShoppingCart = require('./models/ShoppingCart');
const User = require('./models/User');
// app.locals.store_title = 'MyBroncho Online';

// session can hold only serializable data
// functions or instances(objects) cannot be saved in session
app.get('/', (req, res) => {
    if (!req.session.user) {
        req.session.user = new User().serialize();
    }
    res.render('index');
});

// "add" button is pressed to add to ShoppingCart
app.post('/', (req, res) => {
	// const book_id = req.body.id;
	// if (!book_id) {
	// 	// for some reason, not came via "add" button of index.ejs
	// 	res.redirect('/');
    // }
    let email = req.body.email;
    let password = req.body.password;
    let skills = req.body.skills;
    let major = req.body.major;
    let residency = req.body.residency;
    
    let validated = true;
    
    res.locals.email = email;
    if(email.indexOf('@') < 0){
        validated = false;
        res.render('index');
    }

    res.locals.password = password;
    if(password.length < 4){
        validated = false;
        res.render('index');
    }

    // res.locals.skills = skills;
    // let skillChecked = true;
    // for (var i = 0; i<skills.length++)
    // if(password.length < 4){
    //     res.render('index');
    // }

   
    // if(validated){
    //     res.render('successPage');
    // }
});


//Keep it as it is for port information
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started at port', port);
});