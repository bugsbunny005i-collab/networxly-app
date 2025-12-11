const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  // --- USER DETAILS (जुने) ---
  userEmail: { type: String, required: true },
  type: { type: String, required: true }, // 'Personal', 'Educational', 'Experience'
  
  // --- FORM DATA (जुने - हे सर्व फॉर्ममधून येतात) ---
  // आपण 'strict: false' वापरत आहोत, तरीही कॉमन फील्ड्स इथे लिहितोय
  fullName: { type: String },
  dob: { type: String },
  personalEmail: { type: String },
  mobile: { type: String },
  address: { type: String },
  
  university: { type: String },
  degree: { type: String },
  rollNo: { type: String },
  passingYear: { type: String },
  candidateName: { type: String },

  companyName: { type: String },
  employeeName: { type: String },
  workFrom: { type: String },
  workTo: { type: String },
  jobRole: { type: String },
  post: { type: String },
  ctc: { type: String },

  // --- FILE PATHS (जुने) ---
  addressProof: { type: String },
  idCardProof: { type: String },

  // --- 🔥 NEW: PARTNER FLOW TRACKING 🔥 ---
  status: { 
    type: String, 
    enum: ['Pending', 'Forwarded', 'Partner_Approved', 'Partner_Rejected', 'Verified', 'Rejected'],
    default: 'Pending' 
  },
  
  // ही रिक्वेस्ट सध्या कोणाच्या डेस्कवर आहे? (Partner ID)
  assignedToPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', default: null },
  
  // पार्टनरने काय रिप्लाय दिला? (Feedback)
  partnerFeedback: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
}, { strict: false }); // strict: false मुळे अजून काही एक्स्ट्रा फील्ड्स असतील तर ते पण सेव्ह होतात

module.exports = mongoose.model('Verification', VerificationSchema);