# 🚀 SkillMatch AI

### AI-Based Personalized Skill Gap & Career Recommendation Platform for Students

SkillMatch AI is a full-stack web application designed to help students understand their current technical skills, identify skill gaps, explore suitable career paths, receive project recommendations, and follow a personalized learning roadmap.

The platform combines student profile data, assessment performance, rule-based recommendation logic, skill-gap analysis, project recommendations, and a career-focused assistant into one centralized platform.

---

## 🌐 Live Demo

**Frontend:**  
https://saurav-skillmatch-ai-2026.netlify.app/

**Backend API:**  
https://skillmatch-ai-backend-p9z9.onrender.com

**GitHub Repository:**  
https://github.com/saurav203208-lgtm/SkillMatch-AI

---

## ✨ Features

### 🔐 Authentication
- Student registration
- Secure login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Logout functionality

### 👤 Student Profile
Students can maintain their:
- Education
- Technical skills
- Interests
- Career goal

### 📝 Skill Assessment
The platform provides a technical assessment covering:
- HTML
- CSS
- JavaScript
- React
- Node.js

The system calculates the student's assessment performance and individual skill scores.

### 📊 Assessment Results
Students can view:
- Overall assessment score
- Individual skill performance
- Skill-wise scores

### 🎯 Career Recommendation
SkillMatch AI analyzes profile and assessment information to provide career recommendations such as:
- Full Stack Developer
- Frontend Developer
- Backend Developer
- Data Analyst
- AI/ML Engineer

### 💡 Recommended Projects
The platform suggests projects based on the student's career direction and skills.

Example projects include:
- E-Commerce Web Application
- Job Portal
- Student Management System
- Task Management Application
- AI Chatbot

### 🗺️ Learning Roadmap
Students receive a structured learning roadmap based on their selected career goal.

Example Full Stack roadmap:
1. HTML & CSS
2. JavaScript
3. React
4. Node.js & Express
5. MongoDB
6. Full Stack Project

### 📈 Skill Gap Analysis
The system compares the student's current skill level with the required level and identifies:
- Current skill score
- Required skill score
- Skill gap
- Priority

### 🤖 AI Assistant
The platform includes a career-focused assistant that helps students with queries related to:
- Skills
- Career
- Projects
- Learning roadmap

> Note: The current assistant uses rule-based response logic. LLM integration can be added as a future enhancement.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      Student        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Frontend Interface │
                    │   HTML / CSS / JS   │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      Node.js        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Authentication    Recommendation   Skill Analysis
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     MongoDB Atlas   │
                    └─────────────────────┘
