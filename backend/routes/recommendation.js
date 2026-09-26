const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET CAREER RECOMMENDATION
router.get("/", authMiddleware, async (req, res) => {

    try {

        const db = getDB();

        // Student profile
        const user = await db.collection("users").findOne({
            _id: new (require("mongodb").ObjectId)(req.user.userId)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Latest assessment
        const assessment = await db.collection("assessments")
            .findOne(
                {
                    userId: req.user.userId
                },
                {
                    sort: {
                        createdAt: -1
                    }
                }
            );


        const skills = (user.skills || [])
            .map(skill => skill.toLowerCase());

        const interests = (user.interests || [])
            .map(interest => interest.toLowerCase());

        const careerGoal =
            (user.careerGoal || "").toLowerCase();


        const score =
            assessment?.overallScore || 0;


        // Career scoring
        const careerScores = {

            "Full Stack Developer": 0,

            "Frontend Developer": 0,

            "Backend Developer": 0,

            "Data Analyst": 0,

            "AI/ML Engineer": 0

        };


        // Skill based scoring

        if (skills.includes("html")) {
            careerScores["Frontend Developer"] += 15;
            careerScores["Full Stack Developer"] += 10;
        }

        if (skills.includes("css")) {
            careerScores["Frontend Developer"] += 15;
            careerScores["Full Stack Developer"] += 10;
        }

        if (skills.includes("javascript")) {
            careerScores["Frontend Developer"] += 20;
            careerScores["Backend Developer"] += 15;
            careerScores["Full Stack Developer"] += 20;
        }

        if (skills.includes("react")) {
            careerScores["Frontend Developer"] += 25;
            careerScores["Full Stack Developer"] += 20;
        }

        if (
            skills.includes("node.js") ||
            skills.includes("nodejs")
        ) {
            careerScores["Backend Developer"] += 25;
            careerScores["Full Stack Developer"] += 25;
        }

        if (
            skills.includes("python")
        ) {
            careerScores["AI/ML Engineer"] += 20;
            careerScores["Data Analyst"] += 15;
        }

        if (
            skills.includes("sql") ||
            skills.includes("mysql")
        ) {
            careerScores["Data Analyst"] += 25;
            careerScores["Backend Developer"] += 10;
        }


        // Interest based scoring

        if (
            interests.includes("web development")
        ) {
            careerScores["Frontend Developer"] += 15;
            careerScores["Full Stack Developer"] += 20;
        }

        if (
            interests.includes("software development")
        ) {
            careerScores["Full Stack Developer"] += 15;
            careerScores["Backend Developer"] += 10;
        }

        if (
            interests.includes("ai")
        ) {
            careerScores["AI/ML Engineer"] += 25;
        }

        if (
            interests.includes("data science")
        ) {
            careerScores["Data Analyst"] += 20;
            careerScores["AI/ML Engineer"] += 15;
        }


        // Career goal matching

        if (
            careerGoal.includes("full stack")
        ) {
            careerScores["Full Stack Developer"] += 30;
        }

        if (
            careerGoal.includes("frontend")
        ) {
            careerScores["Frontend Developer"] += 30;
        }

        if (
            careerGoal.includes("backend")
        ) {
            careerScores["Backend Developer"] += 30;
        }

        if (
            careerGoal.includes("data")
        ) {
            careerScores["Data Analyst"] += 30;
        }

        if (
            careerGoal.includes("ai") ||
            careerGoal.includes("machine learning")
        ) {
            careerScores["AI/ML Engineer"] += 30;
        }


        // Assessment performance

        if (score >= 80) {

            careerScores["Full Stack Developer"] += 10;
            careerScores["Frontend Developer"] += 5;
            careerScores["Backend Developer"] += 5;

        }


        // Find highest score

        let recommendedCareer =
            "Full Stack Developer";

        let highestScore = 0;


        for (const career in careerScores) {

            if (
                careerScores[career] >
                highestScore
            ) {

                highestScore =
                    careerScores[career];

                recommendedCareer =
                    career;

            }

        }


        // Response

        res.json({

            message:
                "Career recommendation generated successfully",

            recommendedCareer,

            recommendationScore:
                highestScore,

            assessmentScore:
                score,

            careerScores

        });


    } catch (error) {

        console.error(
            "Recommendation error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;