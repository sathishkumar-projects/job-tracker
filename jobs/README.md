# AI-Powered Job Application Tracker

> "Track Smarter, Apply Better"

A REST API backend built with Django REST Framework that helps freshers 
track job applications and get AI-powered resume suggestions.

## 🔗 Live Demo
https://job-tracker-oyd7.onrender.com

## 🛠️ Tech Stack
- Python, Django REST Framework
- Token Authentication
- Groq AI (LLaMA 3.3)
- SQLite Database
- Deployed on Render

## ✨ Features
- User Registration & Login with Token Authentication
- Track job applications with status updates
- AI-powered resume improvement suggestions
- Secure API key management with python-dotenv

## 📌 API Endpoints
| Endpoint | Method | Description |
|---|---|---|
| /api/register/ | POST | Register new user |
| /api/login/ | POST | Login and get token |
| /api/jobs/ | GET, POST | List and create jobs |
| /api/ai-suggest/ | POST | Get AI resume suggestions |

## 👨‍💻 Author
Sathishkumar K — github.com/sathishkumar-projects