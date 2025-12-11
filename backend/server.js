// ==================================================
// 🚀 VERITAS BACKEND SERVER - FULL VERSION
// ==================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // .env फाईल लोड करण्यासाठी

// --- SECURITY PACKAGES (BODYGUARDS) ---
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bcrypt = require('bcryptjs');

// --- DATABASE MODELS IMPORT ---
const User = require('./models/User');
const Verification = require('./models/Verification');
const Post = require('./models/Post');
const Job = require('./models/Job');
const Message = require('./models/Message');
const Notification = require('./models/Notification');
const Partner = require('./models/Partner');

// --- APP CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// ==================================================
// 🛡️ SECURITY MIDDLEWARES (DO NOT REMOVE)
// ==================================================

// 1. Helmet: Secure HTTP Headers
// crossOriginResourcePolicy: false ठेवले आहे जेणेकरून इमेजेस Frontend वर दिसतील
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// 2. Rate Limiting: Prevent Brute Force / DDoS Attacks
// 15 मिनिटात एका IP वरून फक्त 150 रिक्वेस्ट्स येऊ शकतात
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 150, 
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api', limiter); 

// 3. Mongo Sanitize: Prevent NoSQL Injection
app.use(mongoSanitize());

// 4. XSS Clean: Prevent Cross-Site Scripting Attacks
app.use(xss());

// 5. HPP: Prevent HTTP Parameter Pollution
app.use(hpp());

// ==================================================
// ⚙️ STANDARD MIDDLEWARES
// ==================================================

// CORS Configuration (Allow Frontend)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser (Limit payload size to prevent crash)
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' })); 

// Uploads Folder Public Access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debugging Middleware (Request Logger)
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ==================================================
// 📂 FILE UPLOAD CONFIGURATION (MULTER)
// ==================================================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("📂 Uploads folder created.");
}

// Filter: Only allow Images and PDFs
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('❌ Only Images and PDFs are allowed!'), false);
    }
};

// Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
    storage: storage, 
    fileFilter: multerFilter, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit
});

// ==================================================
// 🗄️ DATABASE CONNECTION (MONGODB ATLAS)
// ==================================================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/veritas_db';

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB Cloud Connected Successfully!"))
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB fails
});

// --- HELPER FUNCTION: Create Notification ---
const createNotification = async (recipient, sender, type, message, postId = null) => {
    try {
        if (recipient.toString() === sender.toString()) return;
        const newNotif = new Notification({ recipient, sender, type, message, postId });
        await newNotif.save();
    } catch (err) { console.error("Notification Error:", err); }
};

// ==================================================
// 🔥🔥🔥 API ROUTES START 🔥🔥🔥
// ==================================================

// --------------------------------------------------
// 1. AUTHENTICATION ROUTES (Register/Login)
// --------------------------------------------------

// Register New User (With Password Encryption)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check Existing
        let user = await User.findOne({ email });
        if (user) return res.json({ success: false, message: "User already exists!" });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        user = new User({ 
            firstName, 
            lastName, 
            name: `${firstName} ${lastName}`, 
            email, 
            password: hashedPassword, 
            profilePhoto: "" 
        });
        await user.save();

        console.log(`✅ New User Registered: ${email}`);
        res.json({ success: true, user });

    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Login User (Verify Encrypted Password)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ success: false, message: "Missing credentials" });

        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        // Check if user registered via Google
        if (!user.password) return res.json({ success: false, message: "Please login with Google" });

        // Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid Credentials" });
        
        console.log(`✅ User Logged In: ${email}`);
        res.json({ success: true, user });

    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Google Authentication
app.post('/api/auth/google', async (req, res) => {
    const { name, email, photo } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) { 
            user = new User({ name, email, profilePhoto: photo }); 
            await user.save(); 
            console.log(`✅ New Google User: ${email}`);
        }
        res.json({ success: true, user });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// --------------------------------------------------
// 2. USER PROFILE & NETWORK ROUTES
// --------------------------------------------------

// Get User Profile Data
app.get('/api/user/get/:userId', async (req, res) => {
    try { 
        const user = await User.findById(req.params.userId);
        if(!user) return res.json({success: false, message: "User not found"});
        res.json({ success: true, user }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Update User Profile
app.put('/api/user/update', async (req, res) => {
    try { 
        const user = await User.findOneAndUpdate({ email: req.body.email }, req.body, { new: true }); 
        res.json({ success: true, user }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Upload Profile Photo
app.put('/api/user/update-photo', upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!req.file) return res.json({ success: false, message: "No file uploaded" });
        const user = await User.findByIdAndUpdate(req.body.userId, { profilePhoto: req.file.path }, { new: true });
        res.json({ success: true, user });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Get User Network (All users except self)
app.get('/api/users/network/:currentUserId', async (req, res) => {
    try { 
        const users = await User.find({ _id: { $ne: req.params.currentUserId } }); 
        res.json({ success: true, users }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// --------------------------------------------------
// 3. EXPERIENCE & EDUCATION ROUTES (Verification Logic)
// --------------------------------------------------

// Add Experience & Trigger Verification
app.post('/api/user/add-experience', upload.single('proofDocument'), async (req, res) => {
    try {
        const { userId, title, company, location, startDate, endDate, description } = req.body;
        const user = await User.findById(userId);
        const proofPath = req.file ? req.file.path : "";

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Add to User Profile
        user.experience.push({ 
            title, company, location, startDate, endDate, description, 
            verificationStatus: 'Pending', 
            proofDocument: proofPath 
        });
        await user.save();

        // Create Verification Request for Admin/Partner
        const v = new Verification({ 
            fullName: user.name, 
            userEmail: user.email, 
            type: 'Experience Verification', 
            companyName: company, 
            status: 'Pending', 
            addressProof: proofPath 
        });
        await v.save();

        console.log(`✅ Experience Added & Verification Pending: ${user.name} - ${company}`);
        res.json({ success: true, message: "Experience Added!", user });

    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Add Education & Trigger Verification
app.post('/api/user/add-education', upload.single('proofDocument'), async (req, res) => {
    try {
        const { userId, school, degree, field, startDate, endDate, grade } = req.body;
        const user = await User.findById(userId);
        const proofPath = req.file ? req.file.path : "";

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Add to User Profile
        user.education.push({ 
            school, degree, field, startDate, endDate, grade, 
            verificationStatus: 'Pending', 
            proofDocument: proofPath 
        });
        await user.save();

        // Create Verification Request
        const v = new Verification({ 
            fullName: user.name, 
            userEmail: user.email, 
            type: 'Education Verification', 
            university: school, 
            status: 'Pending', 
            addressProof: proofPath 
        });
        await v.save();

        console.log(`✅ Education Added & Verification Pending: ${user.name} - ${school}`);
        res.json({ success: true, message: "Education Added!", user });

    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// --------------------------------------------------
// 4. PARTNER & ADMIN ROUTES
// --------------------------------------------------

// Create Partner (Admin Use) - Encrypted Password
app.post('/api/partner/create', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        
        // Check Existing
        const existing = await Partner.findOne({ email });
        if (existing) return res.json({ success: false, message: "Partner email exists" });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save Partner
        const newPartner = new Partner({ name, email, password: hashedPassword, role });
        await newPartner.save();

        console.log(`✅ New Partner Created: ${name} (${role})`);
        res.json({ success: true, partner: newPartner });

    } catch (e) { res.json({ success: false, message: e.message }); }
});

// Partner Login
app.post('/api/partner/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const partner = await Partner.findOne({ email });
        
        if (!partner) return res.json({ success: false, message: "Partner not found" });

        // Check Encrypted Password
        const isMatch = await bcrypt.compare(password, partner.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid Credentials" });

        res.json({ success: true, partner });

    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Get All Partners (For Dropdowns)
app.get('/api/partners/all', async (req, res) => {
    try { 
        // Exclude internal employees, only show external partners (Unis/Companies)
        const partners = await Partner.find({ role: { $ne: 'Veritas_Employee' } }); 
        res.json({ success: true, partners }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Admin Stats Dashboard
app.get('/api/admin/stats', async (req, res) => { 
    try { 
        const stats = { 
            totalUsers: await User.countDocuments({}), 
            pendingVerifications: await Verification.countDocuments({ status: { $in: ['Pending', 'Forwarded'] } }), 
            activePartners: await Partner.countDocuments({ role: { $in: ['University', 'Company'] } }), 
            totalPartners: await Partner.countDocuments({ role: { $ne: 'Super_Admin' } }) 
        }; 
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5); 
        res.json({ success: true, stats, recentUsers }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Broadcast Notification
app.post('/api/admin/broadcast', async (req, res) => { 
    try { 
        const users = await User.find(); 
        const notifications = users.map(u => ({ 
            recipient: u._id, 
            sender: req.body.senderId, 
            type: 'alert', 
            message: `${req.body.title}: ${req.body.message}`, 
            read: false 
        })); 
        await Notification.insertMany(notifications); 
        res.json({ success: true, count: users.length }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// --------------------------------------------------
// 5. POSTS & SOCIAL FEED ROUTES
// --------------------------------------------------

// Create Post
app.post('/api/posts/create', upload.single('postImage'), async (req, res) => { 
    try { 
        const p = new Post({ ...req.body, image: req.file ? req.file.path : "" }); 
        await p.save(); 
        res.json({ success: true, post: p }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Get Global Feed
app.get('/api/posts/feed', async (req, res) => { 
    try { 
        const posts = await Post.find().sort({ createdAt: -1 }); 
        res.json({ success: true, posts }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Get Specific User's Posts
app.get('/api/posts/user/:userId', async (req, res) => { 
    try { 
        const posts = await Post.find({ authorId: req.params.userId }).sort({ createdAt: -1 }); 
        res.json({ success: true, posts }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Like Post
app.put('/api/posts/like/:postId', async (req, res) => { 
    try { 
        const p = await Post.findById(req.params.postId); 
        if (p.likes.includes(req.body.userId)) {
            p.likes.pull(req.body.userId); 
        } else { 
            p.likes.push(req.body.userId); 
            await createNotification(p.authorId, req.body.userId, 'like', 'liked your post', p._id); 
        } 
        await p.save(); 
        res.json({ success: true, post: p }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Comment on Post
app.post('/api/posts/comment/:postId', async (req, res) => { 
    try { 
        const p = await Post.findById(req.params.postId); 
        p.comments.push(req.body); 
        await p.save(); 
        await createNotification(p.authorId, req.body.userId, 'comment', 'commented on your post', p._id); 
        res.json({ success: true, post: p }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// --------------------------------------------------
// 6. JOBS & MESSAGING ROUTES
// --------------------------------------------------

// Job Routes
app.post('/api/jobs/create', async (req, res) => { 
    try { const j = new Job(req.body); await j.save(); res.json({ success: true, job: j }); } 
    catch (e) { res.status(500).json({ success: false }); } 
});
app.get('/api/jobs/all', async (req, res) => { 
    try { const j = await Job.find().sort({ createdAt: -1 }); res.json({ success: true, jobs: j }); } 
    catch (e) { res.status(500).json({ success: false }); } 
});

// Message Routes
app.post('/api/messages/send', async (req, res) => { 
    try { const m = new Message(req.body); await m.save(); res.json({ success: true, message: m }); } 
    catch (e) { res.status(500).json({ success: false }); } 
});
app.get('/api/messages/:u1/:u2', async (req, res) => { 
    try { 
        const m = await Message.find({ 
            $or: [{ sender: req.params.u1, receiver: req.params.u2 }, { sender: req.params.u2, receiver: req.params.u1 }] 
        }).sort({ createdAt: 1 }); 
        res.json({ success: true, messages: m }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// Notification Routes
app.get('/api/notifications/:userId', async (req, res) => { 
    try { 
        const n = await Notification.find({ recipient: req.params.userId })
            .populate('sender', 'name profilePhoto')
            .sort({ createdAt: -1 }); 
        res.json({ success: true, notifications: n }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// --------------------------------------------------
// 7. VERIFICATION ADMIN WORKFLOW ROUTES
// --------------------------------------------------

// Create General Verification (Identity)
app.post('/api/verification/create', upload.fields([{ name: 'addressProof' }, { name: 'idCardProof' }]), async (req, res) => { 
    try { 
        const v = new Verification({ 
            ...req.body, 
            userEmail: req.body.email, 
            addressProof: req.files['addressProof']?.[0].path, 
            idCardProof: req.files['idCardProof']?.[0].path 
        }); 
        await v.save(); 
        res.json({ success: true }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// List Verification Requests (Based on Role)
app.get('/api/verification/list/:partnerId/:role', async (req, res) => { 
    const { partnerId, role } = req.params; 
    try { 
        let q = {}; 
        if (role === 'Veritas_Employee' || role === 'Super_Admin') { 
            q = {}; // Show All
        } else if (role === 'University' || role === 'Company') { 
            q = { assignedToPartner: partnerId, status: 'Forwarded' }; // Show Only Assigned
        }
        const r = await Verification.find(q).populate('assignedToPartner', 'name').sort({ createdAt: -1 }); 
        res.json({ success: true, requests: r }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// Forward Verification to Partner
app.put('/api/verification/forward', async (req, res) => { 
    try { 
        await Verification.findByIdAndUpdate(req.body.verificationId, { 
            status: 'Forwarded', 
            assignedToPartner: req.body.partnerId 
        }); 
        res.json({ success: true }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// Partner Action (Approve/Reject)
app.put('/api/verification/partner-action', async (req, res) => { 
    try { 
        const s = req.body.action === 'Approve' ? 'Partner_Approved' : 'Partner_Rejected'; 
        await Verification.findByIdAndUpdate(req.body.verificationId, { 
            status: s, 
            partnerFeedback: req.body.feedback 
        }); 
        res.json({ success: true }); 
    } catch (e) { res.status(500).json({ success: false }); } 
});

// Final Verify (By Staff) & Update User Profile
app.put('/api/verification/final-verify', async (req, res) => { 
    try { 
        const s = req.body.action === 'Verify' ? 'Verified' : 'Rejected'; 
        const v = await Verification.findByIdAndUpdate(req.body.verificationId, { status: s }, { new: true }); 
        
        // If Verified, Update the User's Profile directly
        if (s === 'Verified') { 
            if (v.type === 'Experience Verification') {
                await User.updateOne(
                    { email: v.userEmail, "experience.company": v.companyName }, 
                    { $set: { "experience.$.verificationStatus": "Verified" } }
                ); 
            } else if (v.type === 'Education Verification') {
                await User.updateOne(
                    { email: v.userEmail, "education.school": v.university }, 
                    { $set: { "education.$.verificationStatus": "Verified" } }
                ); 
            } else {
                await User.findOneAndUpdate({ email: v.userEmail }, { isVerified: true }); 
            }
        } 
        res.json({ success: true }); 
    } catch (e) { res.status(500).json({ success: false, message: e.message }); } 
});

// ==================================================
// 🚀 SERVER START
// ==================================================
app.listen(PORT, () => console.log(`🚀 Veritas Server running on Port ${PORT}`));