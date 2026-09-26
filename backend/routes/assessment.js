const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Assessment Questions
const questions = [
    {
        id: 1,
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>",
        skill: "HTML"
    },
    {
        id: 2,
        question: "Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        answer: "color",
        skill: "CSS"
    },
    {
        id: 3,
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        answer: "const",
        skill: "JavaScript"
    },
    {
        id: 4,
        question: "Which library is commonly used to build user interfaces with JavaScript?",
        options: ["React", "MongoDB", "Express", "MySQL"],
        answer: "React",
        skill: "React"
    },
    {
        id: 5,
        question: "Node.js is primarily used for what?",
        options: [
            "Backend/server-side JavaScript",
            "Image editing",
            "Database only",
            "Operating system installation"
        ],
        answer: "Backend/server-side JavaScript",
        skill: "Node.js"
    }
];


// GET QUESTIONS
router.get("/questions", authMiddleware, (req, res) => {

    const safeQuestions = questions.map(
        ({ answer, ...question }) => question
    );

    res.json({
        message: "Assessment questions loaded",
        questions: safeQuestions
    });
});


// GET LATEST ASSESSMENT RESULT
router.get("/result", authMiddleware, async (req, res) => {

    try {

        const db = getDB();

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

        if (!assessment) {

            return res.status(404).json({
                message: "No assessment result found"
            });

        }

        res.json({

            message:
                "Assessment result fetched successfully",

            overallScore:
                assessment.overallScore,

            skillResults:
                assessment.skillResults,

            createdAt:
                assessment.createdAt

        });

    } catch (error) {

        console.error(
            "Assessment result error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


// SUBMIT ASSESSMENT
router.post("/submit", authMiddleware, async (req, res) => {

    try {

        const { answers } = req.body;

        if (!Array.isArray(answers)) {

            return res.status(400).json({
                message: "Answers must be an array"
            });

        }


        const skillScores = {};


        questions.forEach(question => {

            if (!skillScores[question.skill]) {

                skillScores[question.skill] = {
                    correct: 0,
                    total: 0
                };

            }


            skillScores[question.skill].total++;


            const studentAnswer = answers.find(
                item => item.questionId === question.id
            );


            if (
                studentAnswer &&
                studentAnswer.answer === question.answer
            ) {

                skillScores[question.skill].correct++;

            }

        });


        const skillResults = {};


        for (const skill in skillScores) {

            const result =
                skillScores[skill];


            skillResults[skill] =
                Math.round(
                    (result.correct / result.total) * 100
                );

        }


        const totalCorrect =
            Object.values(skillScores)
                .reduce(
                    (sum, skill) =>
                        sum + skill.correct,
                    0
                );


        const totalQuestions =
            questions.length;


        const overallScore =
            Math.round(
                (totalCorrect / totalQuestions) * 100
            );


        const db = getDB();


        // SAVE RESULT IN MONGODB
        await db.collection("assessments").insertOne({

            userId:
                req.user.userId,

            answers,

            skillResults,

            overallScore,

            createdAt:
                new Date()

        });


        res.json({

            message:
                "Assessment submitted successfully",

            overallScore,

            skillResults

        });


    } catch (error) {

        console.error(
            "Assessment error:",
            error.message
        );


        res.status(500).json({

            message:
                "Server error"

        });

    }

});


module.exports = router;