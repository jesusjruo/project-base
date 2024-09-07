const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  hostingLink: {
    type: String,
  },
  repoLink: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['hosted', 'finished' , 'in progress' , 'outdated']
  },
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [projectSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
