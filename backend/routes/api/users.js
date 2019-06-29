const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
    console.log(req.body)
  const { body: { data:{ user } } } = req;

  if(!user.email) {
    return res.json({
        success: false,
        msg: 'email required'
    });
  }

  if(!user.password) {
    return res.json({
        success: false,
        msg: 'password required'
  });
  }
  Users.find({'email':user.email}).then((user)=> {
    // console.log(user);
    if (user.length != 0){
        return res.status(400).json({ success:false, msg:'Email Already Exists'})
    }
    });
    user.projects = [];
    const finalUser = new Users(user);

    finalUser.setPassword(user.password);
  

  return finalUser.save()
    .then(() => res.json({ success:true }));
});

//POST login route (optional, everyone has access)
router.post('/signin', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
    console.log(user);
    // console.log(req.body)
    if(!user.email) {
      return res.json({
            success: false,
            msg: 'email required'
      });
    }
  
    if(!user.password) {
        return res.json({
            success: false,
            msg: 'password required'
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
        console.log('hi');
        return res.json({ user: user.toAuthJSON(),success:true });
      }
  
      return res.json({ success:false, msg:'Wrong Password'});
    })(req, res, next);
  });
  

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
    return res.json(req.payload);
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;