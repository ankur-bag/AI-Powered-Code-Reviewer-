import { useState, useEffect } from "react";
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
import { HiCode, HiSparkles, HiArrowRight, HiTerminal } from "react-icons/hi";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [review]);

  async function reviewCode() {
    if (!code.trim()) return;
    setLoading(true);
    const apiUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://ai-powered-code-reviewer-pdxo.onrender.com";
    try {
      const response = await axios.post(`${apiUrl}/ai/get-review`, { code });
      setReview(response.data);
    } catch (e) {
      setReview("### Error\nSomething went wrong while fetching the review. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!showEditor) {
    return (
      <div className="min-h-screen flex flex-col items-center selection:bg-orange-500/20">
        {/* Navigation */}
        <nav className="glass-nav mt-6 w-[90%] max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <HiCode className="text-white text-xl" />
            </div>
            <span className="branding text-xl tracking-tight">Code<span className="accent-text">Zen</span></span>
          </div>
          <button onClick={() => setShowEditor(true)} className="text-sm font-light hover:text-orange-500 transition-colors">
            Open Editor
          </button>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 max-w-4xl mx-auto px-6 w-full flex flex-col items-center justify-center py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-slate-400 text-[10px] tracking-[0.2em] uppercase mb-12 animate-float">
            <HiSparkles className="text-orange-500" />
            <span>AI Review Engine</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl mb-10 tracking-tighter leading-[0.9] font-normal">
            Refine your <br />
            <span className="gradient-text">code logic.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-16 leading-relaxed font-light">
            A minimalist workspace for high-performance code analysis. 
            Instant insights, elegant execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowEditor(true)}
              className="btn-primary group"
            >
              Start analyzing
              <HiArrowRight className="group-hover:translate-x-1 transition-transform font-light" />
            </button>
            <button className="btn-secondary">
              Learn more
            </button>
          </div>

          <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl opacity-60">
            {[
              { title: "Precision", desc: "Deep semantic analysis." },
              { title: "Velocity", desc: "Results in seconds." },
              { title: "Security", desc: "Detect vulnerabilities." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <h3 className="text-[10px] text-orange-500 mb-3 uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="text-slate-400 text-xs font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>

        <footer className="py-16 text-center text-slate-600 text-[9px] tracking-[0.3em] uppercase w-full">
          <p>&copy; {new Date().getFullYear()} CodeZen. Crafted for simplicity.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col p-6 md:p-8 gap-6 overflow-hidden selection:bg-orange-500/20">
      {/* App Header */}
      <header className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowEditor(false)}>
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <HiCode className="text-white text-xl" />
          </div>
          <span className="branding text-xl">Code<span className="accent-text">Zen</span></span>
        </div>
        
        <button 
          onClick={reviewCode}
          disabled={loading}
          className="btn-primary py-2.5 px-8 text-sm"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <HiSparkles />
              Scan code
            </>
          )}
        </button>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
        {/* Editor Pan */}
        <section className="flex-1 glass-card flex flex-col">
          <div className="px-8 py-5 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiTerminal className="text-orange-500/40" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-light">Input</span>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
          <div className="flex-1 overflow-auto relative editor-container">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => {
                const lang = prism.languages.javascript || prism.languages.clike;
                return prism.highlight(code, lang, "javascript");
              }}
              padding={32}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                minHeight: "100%",
                color: "#94a3b8",
                background: "transparent",
              }}
              className="w-full h-full font-light"
            />
          </div>
        </section>

        {/* Review Pan */}
        <section className="flex-1 glass-card flex flex-col">
          <div className="px-8 py-5 border-b border-white/[0.05] bg-white/[0.01] flex items-center gap-2">
            <HiSparkles className="text-orange-500/40" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-light">Analysis</span>
          </div>
          <div className="flex-1 overflow-auto p-10 relative">
            {review ? (
              <div className="prose prose-invert prose-orange max-w-none prose-headings:font-normal prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed text-sm">
                <Markdown rehypePlugins={[rehypehighlight]}>{review}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-800 gap-6">
                <div className="w-12 h-12 rounded-2xl border border-white/[0.03] flex items-center justify-center text-xl">
                  <HiTerminal />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] font-light">Awaiting input</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

