var db = require("../../db.js");
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
const _ = require('underscore');
var sendMail = require("../../mail.js")
const from = process.env.from;

//Generating Auto password
function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

exports.signUp = async (root, { firstName, email, password,phoneNumber }) => {
    email = email.toLowerCase();
    if (email == null) {
      return ('enter valid email id')
    }
    else {
      var user = await db.User.findOne({ phoneNumber: phoneNumber })
      if (user) {
        return Promise.resolve({ message: 'phoneNumber already exist', status: 400 });
      }
      else {
        var salt = await  bcrypt.genSalt(SALT_WORK_FACTOR)
        var hash = await  bcrypt.hash(password, salt)
        var user = await db.User.findOne({ 'email': email })
        if (user) {
          return Promise.resolve({ message: 'Email already exist', status: 400 });
        }
        else {
          var newUser = new db.User({
            firstName: firstName,  email: email, password: hash, phoneNumber: phoneNumber
          })
          var user = await newUser.save()
          user.message = 'User saved'
          user.status = 200
          return Promise.resolve(user);
        }
      }
    }
  }

// Login user
exports.login = async (root, { email, password }) => {
  if (email == '' || password == '') {
    return Promise.resolve({ message: 'Invalid email or password', error: true });
  }
  else {
    var user = await db.User.findOne( { 'email': email.toLowerCase() })
    if (user == undefined) {
      return Promise.resolve({ message: 'Please enter valid Email or password', error: true });
    }
    else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var updated = await db.User.findById(user._id)
        updated.message ='Logged In'
        updated.status = 200
        return Promise.resolve(updated);
      }
      else {
        return Promise.resolve({ message: 'Wrong password', status: 400 });
      }
    }
  }
}

  exports.listUsers = async (root, { limit, start }) => {
    limit = limit
    let user = await db.User.find().skip(start).limit(parseInt(limit));
    var dataSorted = _.sortBy(user, 'firstName');
    return dataSorted;
  }


  //Edit Profile
exports.editProfile = async (root, { _id, firstName, lastName,password, email,phoneNumber,address,city,zipCode}) => {
  var user = await db.User.findById({ _id: _id })
  if (!user) {
    return Promise.resolve({ message: 'User doesnot exist', status: 400 })
  }
  else {
    var salt = await  bcrypt.genSalt(SALT_WORK_FACTOR)
    var hash = await  bcrypt.hash(password, salt)
    var userName = firstName + " " + lastName
    var edited = await db.User.findOneAndUpdate({ _id: _id },{ $set: {password:hash,userName:userName,firstName:firstName,lastName:lastName,email:email,phoneNumber:phoneNumber,address:address,city:city,zipCode:zipCode,modifiedDate: new Date() }})
    var currentUser = await db.User.findById({ _id: _id })
    currentUser.message = 'User  Details Updated'
    currentUser.status = 200
    return Promise.resolve(currentUser)
  }
}

 
exports.forgetPassword = async (root, { email }) => {
  var user = await db.User.findOne({ 'email': email })
  if (!user) {
    return Promise.resolve({ message: 'Please enter valid email address', error: true })
  }
  else {
    var salt = await  bcrypt.genSalt(SALT_WORK_FACTOR)
    var randomNumber = generatePassword()
    var hash = await  bcrypt.hash(randomNumber, salt)    
    var randomPwd = await db.User.update({ email: email }, { $set: { password: hash } })
    sendMail.sendmail(email, from, "Password Recovery", 'Hi ' + user.userName + ',\n\nIn response to your request we are sending your account details.\n\nUserName: ' + user.userName + ',\n\nEmail: ' + email + ',\n\nPassword Recovery Code: ' + randomNumber)
    var User = await db.User.findOne({ email: email })
    User.message = 'Password updated'
    User.error = false
    return Promise.resolve(User)
  }
}
