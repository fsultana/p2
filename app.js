// Fariha Sultana

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

const User = require('./models/User');
// app.locals.store_title = 'MyBroncho Online';

// session can hold only serializable data
// functions or instances(objects) cannot be saved in session
app.get('/', (req, res) => {
    if (!req.session.user) {
        req.session.user = new User().serialize();
    }
    res.locals.user = User.deserialize(req.session.user);
    res.render('index');
});

// 

app.post('/', (req, res) => {
	// retrieve the values from the form submitted
    let email = req.body.email;
    let password = req.body.password;
    // for each skills, handle separately
    let nodejs = req.body.nodejs; //req.body.___ should match the inpute type name = from ejs file
    let java = req.body.java;
    let aspnet = req.body.aspnet;
    let php = req.body.php;
    // handle each major separately
    let major = req.body.major;
    //handle each residency separately
    let residency = req.body.city; // has to match the form input name

    // 
    const user = User.deserialize(req.session.user);
    user.setCheckValidity(true);
    // update the session user
    user.email = email; 
    user.password = password;

    //update the session user for each skill
    if (nodejs === "nodejs"){
        user.skills.push("Nodejs");
    }   
    if (java === "java"){
        user.skills.push("Java");
    }
    if (aspnet === "aspnet"){
        user.skills.push("ASP.NET");
    }
    if (php === "php"){
        user.skills.push("PHP");
    }
    // check if undefined first
    user.major = typeof major === "undefined" ? "" : major;
    user.residency = typeof residency === "undefined" ? "" : residency;
   
      
    let validated = user.isValid();
   

    // stores the updated user to the session
    req.session.user = user.serialize();
    // making the user available to the response
    res.locals.user = User.deserialize(req.session.user);
   
    // let validated = res.locals.user.getErrors.length === 0;
   
    if(validated){
        res.render('successPage');
    }
    else{
        res.render('index');
    }
});


//Keep it as it is for port information
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started at port', port);
});