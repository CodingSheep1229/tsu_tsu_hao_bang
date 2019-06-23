const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

function isUser(email) {
    Users.find({'email':email}).then((user)=> {
        // console.log(user);
        if (user){
            return true;
        }
        return false;
    });
}

//POST new user route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
    console.log(req.body)
  const { body: { data:{ user } } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  Users.find({'email':user.email}).then((user)=> {
    // console.log(user);
    if (user.length != 0){
        return res.status(400).json({ success:false, msg:'Email Already Exists'})
    }
});

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ success:true }));
});

//POST login route (optional, everyone has access)
router.post('/signin', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
    // console.log(user);
    
    if(!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
    Users.find({'email':user.email}).then((user)=> {
        // console.log(user);
        if (user.length == 0){
            return res.status(400).json({ success:false, msg:'No User'})
        }
    });
  
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        return next(err);
      }
  
      if(passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
  
        return res.json({ user: user.toAuthJSON(),success:true });
      }
  
      return res.json({ success:false, msg:'Wrong Password'});
    })(req, res, next);
  });
  

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;