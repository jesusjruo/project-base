const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('projects/index.ejs', {
          projects: currentUser.projects,
        });
    } catch (error) {
    console.log(error)
    res.redirect('/')
    }
});

router.get('/new' , (req, res) => {
    try {
        res.render('projects/new.ejs');
    } catch(err){
        console.log(err);
        res.redirect('/');
    }
});

router.get('/:projectId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const project = currentUser.projects.id(req.params.projectId);
      res.render('projects/edit.ejs', {
        project: project,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.projects.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/projects`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:projectId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const project = currentUser.projects.id(req.params.projectId);
      res.render('projects/show.ejs', {
        project: project,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


router.put('/:projectId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const project = currentUser.projects.id(req.params.projectId);
      project.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/projects/${req.params.projectId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

router.delete('/:projectId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.projects.id(req.params.projectId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/projects`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

module.exports = router;