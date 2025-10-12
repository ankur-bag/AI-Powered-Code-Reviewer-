import { useState } from "react";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import rehypehighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    const apiUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://ai-powered-code-reviewer-pdxo.onrender.com";
    try {
      const response = await axios.post(`${apiUrl}/ai/get-review`, { code });
      setReview(response.data);
    } catch (e) {
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-950 flex flex-col">

      <header className="shrink-0 flex items-center justify-between px-10 py-5 bg-gray-900 border-b border-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-400 tracking-tight">
          AI Code Reviewer
        </h1>
        <span className="hidden md:inline-block text-sm text-gray-400">
          Powered by AI | Review your code instantly
        </span>
      </header>

      <main className="flex flex-1 gap-6 p-6 overflow-auto">
        {/* Code Editor Side */}
        <section className="flex flex-col basis-1/2 h-full bg-gray-900 rounded-xl shadow-lg p-5 min-w-[350px]">
          <h2 className="text-lg font-medium text-indigo-300 mb-2">Editor</h2>
          <div className="flex-1 rounded-lg overflow-auto border border-gray-800 bg-gray-950 mb-4">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => {
                const lang = prism.languages.javascript || prism.languages.clike;
                return prism.highlight(code, lang, "javascript");
              }}
              padding={16}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
                color: "#eee",
                background: "transparent",
                outline: "none",
              }}
              className="w-full h-full"

            />
          </div>
          <button
            onClick={reviewCode}
            disabled={loading}
            className="self-start bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 font-semibold py-2 px-6 rounded-md transition-colors"
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>
        </section>
        {/* Review Side */}
        <section className="flex flex-col basis-1/2 h-full bg-gray-900 rounded-xl shadow-lg p-5 min-w-[350px]">
          <h2 className="text-lg font-medium text-indigo-300 mb-2">Code Review</h2>
          <div
            className="flex-1 rounded-lg border border-gray-800 bg-gray-950 p-4 overflow-auto prose prose-invert max-w-none text-gray-100"
          >
            <Markdown rehypePlugins={[rehypehighlight]}>{review}</Markdown>
          </div>
        </section>
      </main>
      <footer className="shrink-0 px-4 py-2 bg-gray-900 border-t border-gray-800 text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} AI Code Reviewer. Made with ❤️ by @ankurbag.
      </footer>
    </div>
  );
}

export default App;
