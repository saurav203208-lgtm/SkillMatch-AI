const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET SKILL GAP ANALYSIS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const db = getDB();

        // Get user profile
        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.user.userId)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Get latest assessment
        const assessment = await db.collection("assessments").findOne(
            {
                userId: req.user.userId
            },
            {
                sort: {
                    createdAt: -1
                }
            }
        );

        // User skills ko array mein convert karna
        let skills = user.skills || [];

        if (typeof skills === "string") {
            skills = skills.split(",");
        }

        skills = skills.map(skill =>
            String(skill).toLowerCase().trim()
        );

        // Assessment skill results ko safely read karna
        let assessmentResults = [];

        if (assessment && assessment.skillResults) {
            if (Array.isArray(assessment.skillResults)) {
                assessmentResults = assessment.skillResults;
            } else if (typeof assessment.skillResults === "object") {
                assessmentResults = Object.entries(
                    assessment.skillResults
                ).map(([skill, score]) => ({
                    skill: skill,
                    score: Number(score) || 0
                }));
            }
        }

        // Career goal
        const careerGoal = (
            user.careerGoal || ""
        ).toLowerCase();

        let requiredSkills = [];

        // Full Stack Developer
        if (careerGoal.includes("full stack")) {
            requiredSkills = [
                { skill: "HTML", required: 80 },
                { skill: "CSS", required: 80 },
                { skill: "JavaScript", required: 85 },
                { skill: "React", required: 85 },
                { skill: "Node.js", required: 80 },
                { skill: "MongoDB", required: 75 }
            ];
        }

        // Frontend Developer
        else if (careerGoal.includes("frontend")) {
            requiredSkills = [
                { skill: "HTML", required: 80 },
                { skill: "CSS", required: 80 },
                { skill: "JavaScript", required: 85 },
                { skill: "React", required: 85 }
            ];
        }

        // Backend Developer
        else if (careerGoal.includes("backend")) {
            requiredSkills = [
                { skill: "JavaScript", required: 80 },
                { skill: "Node.js", required: 85 },
                { skill: "Express.js", required: 80 },
                { skill: "MongoDB", required: 75 },
                { skill: "SQL", required: 70 }
            ];
        }

        // Data Analyst
        else if (careerGoal.includes("data")) {
            requiredSkills = [
                { skill: "Python", required: 85 },
                { skill: "SQL", required: 80 },
                { skill: "Data Analysis", required: 80 },
                { skill: "Data Visualization", required: 75 }
            ];
        }

        // AI/ML Engineer
        else if (
            careerGoal.includes("ai") ||
            careerGoal.includes("machine learning")
        ) {
            requiredSkills = [
                { skill: "Python", required: 85 },
                { skill: "Statistics", required: 75 },
                { skill: "Machine Learning", required: 80 },
                { skill: "Deep Learning", required: 75 }
            ];
        }

        // Default skills
        else {
            requiredSkills = [
                { skill: "Programming", required: 80 },
                { skill: "Problem Solving", required: 80 },
                { skill: "Database", required: 70 }
            ];
        }

        // Calculate skill gaps
        const skillGapAnalysis = requiredSkills.map(item => {
            let currentScore = 0;

            const result = assessmentResults.find(skillResult => {
                if (!skillResult || !skillResult.skill) {
                    return false;
                }

                return String(skillResult.skill)
                    .toLowerCase()
                    .trim() === item.skill.toLowerCase();
            });

            if (result) {
                currentScore = Number(result.score) || 0;
            }

            // Profile mein skill available hai
            if (
                skills.includes(item.skill.toLowerCase()) &&
                currentScore === 0
            ) {
                currentScore = 50;
            }

            const gap = Math.max(
                0,
                item.required - currentScore
            );

            let priority = "Low";

            if (gap >= 40) {
                priority = "High";
            } else if (gap >= 20) {
                priority = "Medium";
            }

            return {
                skill: item.skill,
                currentScore: currentScore,
                requiredScore: item.required,
                gap: gap,
                priority: priority
            };
        });

        // Highest gap first
        skillGapAnalysis.sort((a, b) => b.gap - a.gap);

        res.json({
            message: "Skill gap analysis generated successfully",
            careerGoal: user.careerGoal || "Not specified",
            skillGapAnalysis: skillGapAnalysis
        });

    } catch (error) {
        console.error("Skill gap error:", error.message);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;