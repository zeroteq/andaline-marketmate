const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://contactglobaldynamic:Gg5pSJWuPjducRjJ@cluster0.2tt69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Models
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    displayName: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: { type: String, default: 'https://picsum.photos/400/400?random=15' },
    phone: String,
    whatsapp: String,
    bio: String,
    joinedDate: String,
    location: String,
    likes: { type: Number, default: 0 }
}));

const Listing = mongoose.model("Listing", new mongoose.Schema({
    type: String,
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    createdAt: String,
    category: String
}));

// Routes

// Get all listings
app.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const user = new User({ 
            name, 
            displayName: name, 
            email, 
            password, 
            joinedDate: new Date().toISOString().split('T')[0] 
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new listing route
app.post('/listings', async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
