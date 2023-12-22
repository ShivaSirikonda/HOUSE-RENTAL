
const User = require('../models/user');
const House = require('../models/house');

module.exports.home = function(req,res){
  House.find()
    .limit(6) 
    .then(function(houses) {
        res.render('index',{
            house_list : houses
        });
    })
    .catch(function(err) {
        console.log(err);
    }
  );
}

module.exports.addYourHouse = function(req,res){
  return res.render('addYourHouse');
}

// renders the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return res.redirect('/');
    }
    return res.render('signUp');
}

module.exports.addNewHouse = async function(req, res) {
  try {
    House.uploaded_file(req, res, async function(err) {
      if (err) {
        console.log('***** Multer Error:', err);
      }
      try {
        const newHouse = await House.create({
          owner: req.body.name,
          email: req.body.email,
          phone: req.body.email, // Should this be req.body.phone?
          house_name: req.body.house_name,
          door_no: req.body.door_no,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          pincode: req.body.pincode,
          cost: req.body.cost,
          uploaded_file: House.housePath + '/' + req.file.filename
        });
      
        console.log('House created:', newHouse);
        return res.redirect('/');
      } catch (err) {
        console.error('Error in creating a house:', err);
        // Handle the error here
        // You might want to send an error response to the client or do something else
      }
      
    });
  } catch (err) {
    console.log('***** Error:', err);
  }
}



// renders the sign in page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  return res.render('signIn');
}

//get in sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return User.create(req.body);
    } else {
      return Promise.resolve(user);
    }
  })
  .then(() => {
    return res.redirect('/sign-in');
  })
  .catch((err) => {
    console.log('Error in signing up:', err);
  });
}

module.exports.createSession = function(req,res){
  return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Log the user out (if using Passport.js)
    req.logout(function (err) {
      if (err) {
        console.error('Error during logout:', err);
        // Handle the error if needed
        return res.status(500).send('Error during logout');
      }

      // Redirect the user to the sign-in or home page
      res.redirect('/sign-in'); // or '/home' or any other destination
    });
  } else {
    // If the user is not authenticated, simply redirect them to the sign-in or home page
    res.redirect('/sign-in'); // or '/home' or any other destination
  }
}


module.exports.findHouses = function( req, res){
  const city = req.body.location.toLowerCase();
  House.find({city: city})
    .limit(6) 
    .then(function(houses) {
        res.render('index',{
            house_list : houses,
            partial: {
              section_name: 'services'
            }
        });
    })
    .catch(function(err) {
        console.log(err);
    }
  );
}