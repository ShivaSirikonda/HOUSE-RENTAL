const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/house_list_db');

const dp = mongoose.connection;

dp.on('error',console.error.bind(console,'error connecting to db'));

dp.once('open',function(){
    console.log('successfully connected to database');
});