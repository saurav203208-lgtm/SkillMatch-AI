require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const assessmentRoutes = require("./routes/assessment");
const recommendationRoutes = require("./routes/recommendation");
const projectRoutes = require("./routes/projects");
const roadmapRoutes = require("./routes/roadmap");
const skillGapRoutes = require("./routes/skillGap");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "SkillMatch AI Backend is Running!"
    });
});


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Route Status
console.log(
    "PROFILE ROUTE LOADED:",
    typeof profileRoutes
);

console.log(
    "ASSESSMENT ROUTE LOADED:",
    typeof assessmentRoutes
);

console.log(
    "RECOMMENDATION ROUTE LOADED:",
    typeof recommendationRoutes
);

console.log("PROFILE ROUTE REGISTERED");
console.log("ASSESSMENT ROUTE REGISTERED");
console.log("RECOMMENDATION ROUTE REGISTERED");


// Connect Database and Start Server
connectDB().then(() => {

    app.listen(PORT, () => {

        console.log(
            `Server is running on http://localhost:${PORT}`
        );

    });

});