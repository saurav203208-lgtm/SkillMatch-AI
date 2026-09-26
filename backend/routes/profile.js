const express = require("express");
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { ObjectId } = require("mongodb");

const router = express.Router();


// GET PROFILE
router.get("/", authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const users = db.collection("users");

        const user = await users.findOne(
            { _id: new ObjectId(req.user.userId) },
            {
                projection: {
                    passwordHash: 0
                }
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile accessed successfully",
            user
        });

    } catch (error) {
        console.error("Profile error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// UPDATE PROFILE
router.put("/", authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const users = db.collection("users");

        const {
            education,
            skills,
            interests,
            careerGoal
        } = req.body;

        const result = await users.updateOne(
            { _id: new ObjectId(req.user.userId) },
            {
                $set: {
                    education: education || "",
                    skills: skills || [],
                    interests: interests || [],
                    careerGoal: careerGoal || "",
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error("Profile update error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;