## Intellect AI

Intellect AI is a full-stack AI chatbot application designed to answer user questions using a generative AI model. The project combines a modern React frontend with a lightweight Express backend, making it easy to build and extend for real-world AI-powered experiences.

## Overview

The app allows users to:
- Ask questions in a clean chat-style interface
- Get AI-generated responses
- Explore suggested prompts for quick interaction
- View formatted answers with markdown support

This project is ideal for learning full-stack development, integrating AI APIs, and building conversational interfaces.

## Features

- Modern and responsive user interface
- Real-time question submission
- AI-powered answer generation
- Markdown rendering for readable responses
- Lightweight backend API for handling requests
- Easy to extend with chat history, authentication, or more AI features

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Markdown

### Backend
- Node.js
- Express.js
- Google GenAI SDK
- dotenv
- CORS

## Project Structure

```bash
INTELLECT_AI - AI CHATBOT/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── app.js
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## Prerequisites

Before using this project, make sure you have:
- Node.js installed
- npm installed
- A valid Gemini API key

## Environment Setup

Create a backend environment file with the required API configuration values, including your Gemini API key.

Example variables:
- GEMINI_API_KEY
- PORT

## Installation

1. Clone the repository to your local machine.
2. Install dependencies for the backend.
3. Install dependencies for the frontend.
4. Add your environment variables in the backend configuration.
5. Start the application in the appropriate development environment.

## API Workflow

The frontend sends user prompts to the backend API, where the request is processed and sent to the Gemini model. The generated response is then returned to the frontend and displayed to the user in a friendly format.

## Use Cases

This project can be used for:
- AI assistants
- Learning and tutoring applications
- Customer support chatbots
- Product discovery assistants
- General-purpose conversational interfaces

## Future Enhancements

- Chat history persistence
- User authentication
- Multi-model support
- Better error handling
- Conversation memory
- Deployment-ready setup

## Author

Raunak Suri
```
