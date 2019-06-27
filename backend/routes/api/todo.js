const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Todo = mongoose.model('Todo');
const { Schema } = mongoose;

router.get('/getTodo', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Todo.find({_pid : req.headers._pid},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
});

router.post('/addTodo', auth.required, (req, res, next) => {
    // console.log(req.body);
    const { body: { data } } = req;
    
    const finalTodo = new Todo(data);
  
    return finalTodo.save()
      .then(() => res.json({ success: true }));
});

router.post('/updateTodo', auth.required, (req, res, next) => {
    console.log(req.body);
    const { body: { data } } = req;
    let id = data._id;

    Todo.findOneAndUpdate({ _id: id },{$set: data},{returnNewDocument : true}).then(()=>res.json({success:true}));
});

router.post('/deleteTodo', auth.required, (req, res, next) => {
    const { body: { data:{id} } } = req;

    return Todo.findOneAndRemove({ _id: id },useFindAndModify=false).then(()=>res.json({success:true}));
});



module.exports = router;