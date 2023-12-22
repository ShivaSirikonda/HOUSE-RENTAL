const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 2000;
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assets'));

// make the uploads path avaliable to the browzer
app.use('/uploads',express.static(__dirname + '/uploads'));




// mongo-store uses to store the session store
app.use(session({
    name: 'Nokeshkola',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/house_list_db',
        mongooseConnection: db,
        autoRemove: 'disabled',
    }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }

     console.log(`app is running at port: ${port}`);
});

