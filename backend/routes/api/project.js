const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Project = mongoose.model('Project');
const { Schema } = mongoose;

const rand = require('random');

const pics = [
    'https://i.imgur.com/0flxIfT.jpg',
    'https://i.imgur.com/Mhyy8s2.jpg',
    'https://i.imgur.com/l8xIxCN.jpg',
    'https://i.imgur.com/rN4WDRL.jpg',
    'https://i.imgur.com/7Qd8Qvh.jpg',
    'https://i.imgur.com/xzK5You.jpg',
    'https://i.imgur.com/6zzLr89.jpg',
    'https://i.imgur.com/rL7w3Ni.jpg',
    'https://i.imgur.com/Z2P8Npj.jpg',
    'https://i.imgur.com/MA42Kud.jpg',
    'https://i.imgur.com/H2vxcah.jpg'
]

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
        data.pic = pics[Math.floor(Math.random()*11)];
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
            Project.find({'_id':{ $in: user.projects }},(err, data) => {
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
});

module.exports = router;