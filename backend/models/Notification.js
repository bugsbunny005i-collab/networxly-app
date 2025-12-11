const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // कोणाला नोटिफिकेशन द्यायचे
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // कोणी ॲक्शन घेतली (उदा. ज्याने लाईक केले)
  type: { type: String, enum: ['like', 'comment', 'connection', 'message'], required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // जर पोस्टवर असेल तर
  message: { type: String }, // नोटिफिकेशन टेक्स्ट (उदा. "Liked your post")
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);