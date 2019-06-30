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
    //   console.log(user);
      Project.find({'_id':{ $in: user.projects }},(err, data) => {
        //   console.log(data);
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
        return finalProjct.save().then(() => {
            return Users.findById(id)
            .then((user) => {
                if(!user) {
                    return res.sendStatus(400);
                }
                // console.log(user);
                Project.find({'_id':{ $in: user.projects }},(err, data) => {
                    //   console.log(data);
                    if (err) return res.json({ success: false, error: err });
                    return res.json({ success: true, data: data });
                });
            });
        });
    });
});

router.post('/updateProject', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    const { payload: { id } } = req;
    let _id = data._id;

    Project.findOneAndUpdate({ _id: _id },{$set: data},{returnNewDocument : true}).then(()=>{
        return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }
            // console.log(user);
            Project.find({'_id':{ $in: user.projects }},(err, data) => {
                //   console.log(data);
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
        });
    });
});

router.post('/deleteProject', auth.required, (req, res, next) => {
    const { body: { data:{_id} } } = req;
    const { payload: { id } } = req;

    return Project.findOneAndRemove({ _id: _id },useFindAndModify=false).then(()=>{
        return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }
            // console.log(user);
            Project.find({'_id':{ $in: user.projects }},(err, data) => {
                //   console.log(data);
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
        });
    });
});

router.post('/inviteUser', auth.required, (req, res, next) => {
    const { body: { data } } = req;
    return Users.findOneAndUpdate({ 'email': data.email },{$push: {'projects':data._pid}},{returnNewDocument : true}).then((user)=> {
        if(!user) {
            return res.sendStatus(400);
        }
        return res.json({ success: true });
    });
    return res.json({'test':'hi'});
    
});

module.exports = router;