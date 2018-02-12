const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

//create a model method that will compare a username and password to one in the database
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

//prepare a new user to be saved to the database
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { 
    	return next(saltError); 
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { 
      	return next(hashError); 
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


const User = mongoose.model('User', UserSchema);
module.exports = User;