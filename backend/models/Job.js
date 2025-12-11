const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, default: 'On-site' }, // Remote, Hybrid, On-site
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // कोणी पोस्ट केला
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);