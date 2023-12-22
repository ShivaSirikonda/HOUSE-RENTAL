const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const HOUSE_PATH = path.join('/uploads/houses');

const houseSchema = new mongoose.Schema({
    
    owner:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    house_name:{
        type: String,
        required: true
    },
    door_no:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        set: (value) => value.toLowerCase(),
        required: true
    },
    state:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    uploaded_file:{
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname + '/..' + HOUSE_PATH));
    },
    filename: function(req,file,cb){
        console.log(file);
        cb(null,file.fieldname + '-' + Date.now());
    }
});

// static methods
const upload = multer({ storage: storage });
houseSchema.statics.uploaded_file = upload.single('uploaded_file');
houseSchema.statics.housePath = HOUSE_PATH;

const House = mongoose.model('House',houseSchema);

module.exports = House; 