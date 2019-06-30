const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Vote = mongoose.model('Vote');
const { Schema } = mongoose;

//GET current route (required, only authenticated users have access)
router.get('/getVotes', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Vote.find({_pid : req.headers._pid},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
});

router.post('/addVote', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    
    const finalVote = new Vote(data);
  
    return finalVote.save()
      .then(() => res.json({ success: true }));
});

router.post('/updateVote', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    let id = data._id;

    Vote.findOneAndUpdate({ _id: id },{$set: data},{returnNewDocument : true}).then(()=>res.json({success:true}));
});

router.post('/deleteVote', auth.required, (req, res, next) => {
    const { body: { data:{id} } } = req;

    return Vote.findOneAndRemove({ _id: id },useFindAndModify=false).then(()=>res.json({success:true}));
});

module.exports = router;