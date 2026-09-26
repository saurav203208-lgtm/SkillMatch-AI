const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { ObjectId } = require("mongodb");

const router = express.Router();


// GET PERSONALIZED LEARNING ROADMAP
router.get("/", authMiddleware, async (req, res) => {

    try {

        const db = getDB();

        // Get student profile
        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.user.userId)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const skills = (user.skills || [])
            .map(skill => skill.toLowerCase().trim());

        const careerGoal =
            (user.careerGoal || "").toLowerCase();


        let roadmap = [];


        // Full Stack Developer Roadmap
        if (careerGoal.includes("full stack")) {

            roadmap = [

                {
                    step: 1,
                    title: "HTML & CSS",
                    description:
                        "Learn webpage structure, forms, semantic HTML, CSS layouts and responsive design.",
                    status:
                        skills.includes("html") &&
                        skills.includes("css")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 2,
                    title: "JavaScript",
                    description:
                        "Learn variables, functions, arrays, objects, DOM manipulation, events and modern JavaScript.",
                    status:
                        skills.includes("javascript")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 3,
                    title: "React",
                    description:
                        "Learn components, props, state, hooks, forms and API integration using React.",
                    status:
                        skills.includes("react")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 4,
                    title: "Node.js & Express",
                    description:
                        "Learn backend development, REST APIs, middleware and server-side JavaScript.",
                    status:
                        skills.includes("node.js") ||
                        skills.includes("nodejs")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 5,
                    title: "MongoDB",
                    description:
                        "Learn database design, collections, CRUD operations and connecting MongoDB with Node.js.",
                    status:
                        skills.includes("mongodb")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 6,
                    title: "Full Stack Project",
                    description:
                        "Build a complete real-world application by connecting React, Node.js, Express and MongoDB.",
                    status:
                        "Recommended"
                }

            ];

        }


        // Frontend Developer Roadmap
        else if (careerGoal.includes("frontend")) {

            roadmap = [

                {
                    step: 1,
                    title: "HTML & CSS",
                    description:
                        "Learn webpage structure, layouts, forms and responsive design.",
                    status:
                        skills.includes("html") &&
                        skills.includes("css")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 2,
                    title: "JavaScript",
                    description:
                        "Learn JavaScript fundamentals, DOM, events and modern ES6 features.",
                    status:
                        skills.includes("javascript")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 3,
                    title: "React",
                    description:
                        "Learn components, props, state, hooks and API integration.",
                    status:
                        skills.includes("react")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 4,
                    title: "Frontend Projects",
                    description:
                        "Build responsive and interactive projects to strengthen your portfolio.",
                    status:
                        "Recommended"
                }

            ];

        }


        // Backend Developer Roadmap
        else if (careerGoal.includes("backend")) {

            roadmap = [

                {
                    step: 1,
                    title: "JavaScript Fundamentals",
                    description:
                        "Learn variables, functions, objects, arrays and asynchronous JavaScript.",
                    status:
                        skills.includes("javascript")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 2,
                    title: "Node.js",
                    description:
                        "Learn server-side JavaScript and backend application development.",
                    status:
                        skills.includes("node.js") ||
                        skills.includes("nodejs")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 3,
                    title: "Express.js & REST API",
                    description:
                        "Learn routing, middleware, authentication and REST API development.",
                    status:
                        "Start Learning"
                },

                {
                    step: 4,
                    title: "MongoDB & Database",
                    description:
                        "Learn database design and CRUD operations with MongoDB.",
                    status:
                        skills.includes("mongodb")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 5,
                    title: "Backend Project",
                    description:
                        "Build a complete backend application with authentication and database integration.",
                    status:
                        "Recommended"
                }

            ];

        }


        // Data Analyst Roadmap
        else if (careerGoal.includes("data")) {

            roadmap = [

                {
                    step: 1,
                    title: "Python",
                    description:
                        "Learn Python fundamentals, functions, lists, dictionaries and data handling.",
                    status:
                        skills.includes("python")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 2,
                    title: "SQL",
                    description:
                        "Learn queries, joins, grouping, filtering and database analysis.",
                    status:
                        skills.includes("sql") ||
                        skills.includes("mysql")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 3,
                    title: "Data Analysis",
                    description:
                        "Learn data cleaning, analysis and visualization techniques.",
                    status:
                        "Start Learning"
                },

                {
                    step: 4,
                    title: "Data Visualization",
                    description:
                        "Create meaningful dashboards and charts from datasets.",
                    status:
                        "Start Learning"
                },

                {
                    step: 5,
                    title: "Data Analytics Project",
                    description:
                        "Build a real-world data analytics project and add it to your portfolio.",
                    status:
                        "Recommended"
                }

            ];

        }


        // AI/ML Engineer Roadmap
        else if (
            careerGoal.includes("ai") ||
            careerGoal.includes("machine learning")
        ) {

            roadmap = [

                {
                    step: 1,
                    title: "Python",
                    description:
                        "Learn Python programming and important libraries used in AI and ML.",
                    status:
                        skills.includes("python")
                            ? "Completed"
                            : "Start Learning"
                },

                {
                    step: 2,
                    title: "Data & Mathematics",
                    description:
                        "Learn basic statistics, probability and data preprocessing.",
                    status:
                        "Start Learning"
                },

                {
                    step: 3,
                    title: "Machine Learning",
                    description:
                        "Learn supervised learning, unsupervised learning and model evaluation.",
                    status:
                        "Start Learning"
                },

                {
                    step: 4,
                    title: "Deep Learning & AI",
                    description:
                        "Learn neural networks and fundamental deep learning concepts.",
                    status:
                        "Start Learning"
                },

                {
                    step: 5,
                    title: "AI Project",
                    description:
                        "Build an AI-based real-world project and evaluate its performance.",
                    status:
                        "Recommended"
                }

            ];

        }


        // Default Roadmap
        else {

            roadmap = [

                {
                    step: 1,
                    title: "Programming Fundamentals",
                    description:
                        "Strengthen programming fundamentals and problem-solving skills.",
                    status:
                        "Start Learning"
                },

                {
                    step: 2,
                    title: "Web Development",
                    description:
                        "Learn HTML, CSS and JavaScript for building web applications.",
                    status:
                        "Start Learning"
                },

                {
                    step: 3,
                    title: "Database Fundamentals",
                    description:
                        "Learn databases, CRUD operations and basic SQL/MongoDB concepts.",
                    status:
                        "Start Learning"
                },

                {
                    step: 4,
                    title: "Build Projects",
                    description:
                        "Create practical projects to improve your development skills.",
                    status:
                        "Recommended"
                }

            ];

        }


        res.json({

            message:
                "Personalized learning roadmap generated successfully",

            careerGoal:
                user.careerGoal || "Not specified",

            roadmap

        });


    } catch (error) {

        console.error(
            "Roadmap error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;