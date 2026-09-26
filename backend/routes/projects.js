const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET PROJECT RECOMMENDATIONS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const db = getDB();

        // Get student profile
        const user = await db.collection("users").findOne({
            _id: new (require("mongodb").ObjectId)(req.user.userId)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Student skills
        const skills = (user.skills || [])
            .map(skill => skill.toLowerCase().trim());


        // Student career goal
        const careerGoal =
            (user.careerGoal || "").toLowerCase();


        // Project database
        const projects = [

            {
                title: "Student Management System",
                description:
                    "A web application to manage student records, courses and academic information.",
                difficulty: "Beginner",
                skills: ["html", "css", "javascript"],
                careers: [
                    "frontend developer",
                    "full stack developer"
                ]
            },

            {
                title: "E-Commerce Web Application",
                description:
                    "An online shopping platform with products, users, cart and order management.",
                difficulty: "Intermediate",
                skills: [
                    "html",
                    "css",
                    "javascript",
                    "react",
                    "node.js"
                ],
                careers: [
                    "frontend developer",
                    "backend developer",
                    "full stack developer"
                ]
            },

            {
                title: "Task Management Application",
                description:
                    "A productivity application where users can create, update and manage tasks.",
                difficulty: "Intermediate",
                skills: [
                    "javascript",
                    "react",
                    "node.js"
                ],
                careers: [
                    "frontend developer",
                    "full stack developer"
                ]
            },

            {
                title: "AI Chatbot",
                description:
                    "An intelligent chatbot application that can answer user questions using AI.",
                difficulty: "Intermediate",
                skills: [
                    "javascript",
                    "python",
                    "ai"
                ],
                careers: [
                    "ai/ml engineer",
                    "full stack developer"
                ]
            },

            {
                title: "Data Analytics Dashboard",
                description:
                    "A dashboard for visualizing and analyzing datasets using charts and statistics.",
                difficulty: "Intermediate",
                skills: [
                    "python",
                    "sql"
                ],
                careers: [
                    "data analyst",
                    "ai/ml engineer"
                ]
            },

            {
                title: "Job Portal",
                description:
                    "A platform where students can search for jobs and companies can post job opportunities.",
                difficulty: "Advanced",
                skills: [
                    "html",
                    "css",
                    "javascript",
                    "react",
                    "node.js",
                    "sql"
                ],
                careers: [
                    "full stack developer",
                    "backend developer"
                ]
            }

        ];


        // Calculate project scores
        const recommendedProjects =
            projects.map(project => {

                let score = 0;


                // Skill matching
                project.skills.forEach(
                    projectSkill => {

                        if (
                            skills.includes(
                                projectSkill
                            )
                        ) {

                            score += 20;

                        }

                    }
                );


                // Career matching
                project.careers.forEach(
                    career => {

                        if (
                            careerGoal.includes(
                                career
                            )
                        ) {

                            score += 30;

                        }

                    }
                );


                return {
                    title: project.title,
                    description: project.description,
                    difficulty: project.difficulty,
                    score
                };

            });


        // Highest matching projects first
        recommendedProjects.sort(
            (a, b) => b.score - a.score
        );


        res.json({

            message:
                "Project recommendations generated successfully",

            projects:
                recommendedProjects.slice(0, 5)

        });


    } catch (error) {

        console.error(
            "Project recommendation error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;