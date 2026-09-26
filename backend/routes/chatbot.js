const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// AI CHATBOT
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { message } = req.body;


        if (!message || message.trim() === "") {

            return res.status(400).json({
                message: "Please enter a message"
            });

        }


        const userMessage =
            message.toLowerCase().trim();


        let reply =
            "I can help you with your career, skills, projects and learning roadmap.";


        if (
            userMessage.includes("skill") ||
            userMessage.includes("skills")
        ) {

            reply =
                "You can improve your skills by following your personalized Skill Gap Analysis and Learning Roadmap.";

        }


        else if (
            userMessage.includes("career") ||
            userMessage.includes("job")
        ) {

            reply =
                "Your career recommendation is generated using your profile, interests and assessment performance.";

        }


        else if (
            userMessage.includes("project") ||
            userMessage.includes("projects")
        ) {

            reply =
                "You can find personalized project suggestions in the Recommended Projects section of your dashboard.";

        }


        else if (
            userMessage.includes("roadmap") ||
            userMessage.includes("learn")
        ) {

            reply =
                "Your Learning Roadmap shows the skills and technologies you should learn step by step according to your career goal.";

        }


        else if (
            userMessage.includes("hello") ||
            userMessage.includes("hi")
        ) {

            reply =
                "Hello! I am your SkillMatch AI Assistant. I can help you with skills, careers, projects and learning.";

        }


        res.json({

            message:
                "AI response generated successfully",

            reply

        });


    } catch (error) {

        console.error(
            "Chatbot error:",
            error.message
        );


        res.status(500).json({

            message:
                "Server error"

        });

    }

});


module.exports = router;