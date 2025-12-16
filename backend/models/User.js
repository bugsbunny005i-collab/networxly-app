const mongoose = require('mongoose');

// Experience Schema
const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  description: { type: String },
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  proofDocument: { type: String }
});

// Education Schema
const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String },
  grade: { type: String },
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  proofDocument: { type: String }
});

// Main User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // FIX: Hashed password should not be returned by default
  profilePhoto: { type: String, default: "" },
  
  // Basic Info & Bio
  headline: { type: String, default: "" }, 
  location: { type: String, default: "" },
  about: { type: String, default: "" }, // Bio साठी
  
  // Stats (Followers/Following)
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 

  // Details
  experience: [experienceSchema], 
  education: [educationSchema],   
  skills: [{ type: String }],     

  // Status
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);