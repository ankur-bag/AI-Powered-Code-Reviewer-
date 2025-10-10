# AI-Powered Code Reviewer

This project provides an AI-powered code review service using Google's Gemini model to analyze code snippets and provide structured, actionable feedback to developers.

## Features

- **Automated code review:** Submits code to Google's Gemini AI and receives detailed reviews.
- **Structured feedback:** Reviews include original code issues, location, explanations, fixes, improvements, and overall improved code.
- **Retry Logic:** Automatically retries API requests if the AI service is temporarily overloaded.
- **Clear error handling:** Returns friendly messages when the AI service is unavailable.
- **Markdown output supported:** Review results are formatted using Markdown for easy rendering in clients.

## Tech Stack

- Backend: Node.js with `@google/genai` for AI calls
- Frontend: React with `react-simple-code-editor` and Markdown rendering
- Axios for HTTP requests

## Installation

1. Clone the repository:
git clone <repo_url>
cd <repo_folder>

text

2. Install backend dependencies:
cd backend
npm install

text

3. Install frontend dependencies:
cd ../frontend
npm install

text

4. Set your Google Gemini API key in `.env` at backend root:
GOOGLE_GEMINI_KEY=your_api_key_here

text

## Usage

- Run backend server:
npm start

text

- Run frontend app:
npm run dev

text

- Open the app in your browser at `http://localhost:5173` (or other configured port).

- Paste or edit code in the editor and click **Review** to get AI-generated code feedback.

## Code Review API

The backend exposes an endpoint to submit code and receive a review:

- `POST /ai/get-review`
- Body:
{
"code": "function sum(a, b) { return a + b; }"
}

text
- Response:
{
"review": "AI generated detailed code review with emojis and markdown formatting."
}

text

## Error Handling & Limits

- If the AI model is overloaded, backend retries the request up to 3 times with delays.
- Shows a user-friendly error if service is temporarily unavailable.
- Make sure your API key has sufficient quota and billing enabled.

## Contributing

Contributions are welcome! Please open issues or pull requests for bugs, improvements, or new features.

## License

MIT License

---

Built with ❤️ and Google Gemini AI API.