
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://contactglobaldynamic:Gg5pSJWuPjducRjJ@cluster0.2tt69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Models
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    displayName: String,
    email: String,
    password: String,
    profilePic: String,
    phone: String,
    whatsapp: String,
    bio: String,
    joinedDate: String,
    location: String,
    likes: Number
}));

const Listing = mongoose.model("Listing", new mongoose.Schema({
    type: String,
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [String],
    userId: mongoose.Schema.Types.ObjectId,
    likes: Number,
    createdAt: String,
    category: String
}));

// Routes
app.get('/listings', async (req, res) => {
    const listings = await Listing.find();
    res.json(listings);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, joinedDate: new Date().toISOString().split('T')[0] });
    await user.save();
    res.status(201).json(user);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.json(user);
});

app.post('/listings', async (req, res) => {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
