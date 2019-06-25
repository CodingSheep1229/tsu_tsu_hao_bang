const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Project = mongoose.model('Project');
const { Schema } = mongoose;

//GET current route (required, only authenticated users have access)
router.get('/getProject', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Project.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
});

router.post('/addProject', auth.required, (req, res, next) => {
    // console.log(req.body);
    const { body: { data } } = req;
    
    const finalProjct = new Project(data);
  
    return finalProjct.save()
      .then(() => res.json({ success: true }));
});

router.post('/deleteProject', auth.required, (req, res, next) => {
    const { body: { data:{id} } } = req;

    return Project.findOneAndRemove({ _id: id },useFindAndModify=false).then(()=>res.json({success:true}));
});

module.exports = router;