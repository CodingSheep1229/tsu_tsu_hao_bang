const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Project = mongoose.model('Project');
const { Schema } = mongoose;

router.get('/getProject', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Project.find({'_pid':{ $in: user.projects }},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
});

router.post('/addProject', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { data } } = req;

    return Users.findOneAndUpdate({ _id: id },{$push: {'projects':data._id}},{returnNewDocument : true}).then((user)=> {
        if(!user) {
            return res.sendStatus(400);
        }
        
        const finalProjct = new Project(data);
        return finalProjct.save().then(() => res.json({ success: true }));
    });
});

router.post('/deleteProject', auth.required, (req, res, next) => {
    const { body: { data:{id} } } = req;

    return Project.findOneAndRemove({ _id: id },useFindAndModify=false).then(()=>res.json({success:true}));
});

router.post('/inviteUser', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    return Users.findOneAndUpdate({ 'email': data.email },{$push: {'projects':data._pid}},{returnNewDocument : true}).then((user)=> {
        if(!user) {
            return res.sendStatus(400);
        }
        return res.json({ success: true });
    });
    
});

module.exports = router;