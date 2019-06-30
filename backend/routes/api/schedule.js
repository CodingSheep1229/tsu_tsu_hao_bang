const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Schedule = mongoose.model('Schedule');

//GET current route (required, only authenticated users have access)
router.get('/getSchedule', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Schedule.find({_pid : req.headers._pid},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
});

router.post('/addSchedule', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    
    const finalSchedule = new Schedule(data);
  
    return finalSchedule.save()
      .then(() => res.json({ success: true }));
});

router.post('/updateSchedule', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    let id = data._id;

    Schedule.findOneAndUpdate({ _id: id },{$set: data},{returnNewDocument : true}).then(()=>res.json({success:true}));
});

router.post('/deleteSchedule', auth.required, (req, res, next) => {
    const { body: { data:{id} } } = req;

    return Schedule.findOneAndRemove({ _id: id },useFindAndModify=false).then(()=>res.json({success:true}));
});

module.exports = router;