const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI) // no options needed
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post("/register", async(req, res) => {
    console.log(req.body); // for debugging
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true, user });
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ success: false, message: "Registration failed", error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));