require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/db");

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SkillMatch AI Backend is Running!"
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});