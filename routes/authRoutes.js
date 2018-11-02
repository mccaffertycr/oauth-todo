const passport = require('passport');
const express = require('express');
const db = require('../models')
const app = express();


module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
      res.redirect('/profile');
    });

    app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });

    app.get('/api/todos', (req, res) => {
      if (req.user) {
        db.User
          .findOne({ _id: req.user._id })
          .populate('todos')
          .then(userDoc => {
            res.json({ todos: userDoc.todos })
          })
      } else {
        res.status(403).send('you need to be logged in to do that');
      }
    })

    app.put('/api/todos', (req, res) => {
      if (req.user) {
        if (req.body.data.completed) {
          db.Todo
            .updateOne({ _id: req.body.data.id }, { completed: true })
            .then(() => {
              res.send('todo completed');
            })
            .catch(err => console.log(err));
        } else if (req.body.data.finished) {
          db.Todo
          .updateOne({ _id: req.body.data.id }, { finished: true })
          .then(() => {
            res.send('todo deleted');
          })
          .catch(err => console.log(err));
        }
      } else {
        res.status(403).send('you need to be logged in to do that');
      }

    })

    app.post('/api/todos', (req, res) => {
      if (req.user) {
        db.Todo
          .create({ todo: req.body.data.todo })
          .then(todoDoc => {
            db.User
              .updateOne({ _id: req.user._id }, {$push: { todos: todoDoc._id } })
              .then(() => {
                res.send('added new todo')
              })
          })
      } else {
        res.status(403).send('you need to be logged in to do that');
      }
    })

    app.get('/auth/facebook', passport.authenticate('facebook', {
      profileFields: ['id', 'name'],
    })
    );

    app.get('/auth/facebook/callback', passport.authenticate('facebook'),(req,res)=>{
      res.redirect('/profile');
    });



};