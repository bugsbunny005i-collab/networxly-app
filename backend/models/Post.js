const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // पोस्ट कोणी केली
    authorName: { type: String, required: true },
    authorHeadline: { type: String, default: "" },
    authorPhoto: { type: String, default: "" },
    
    content: { type: String, required: true },
    image: { type: String, default: "" }, // फोटो/मीडियासाठी
    
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // कोणी कोणी लाईक केले
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],
    repostCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);