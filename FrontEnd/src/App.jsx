import { useState } from "react";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios"
import rehypehighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import "./App.css";
import Markdown from "react-markdown"

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

const [review , setReview] = useState('')

async function  reviewCode() {
  const response = await axios.post('http://localhost:3000/ai/get-review', {code})
  setReview (response.data)
  
}



  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              const lang = prism.languages.javascript || prism.languages.clike;
              return prism.highlight(code, lang, "javascript");
            }}
            padding={10}
            style={{
              backgroundColor: "#000000ff",
              color: "white",
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #333",
              overflow: "auto",
            }}
          />
        </div>
        <div onClick ={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
        <Markdown

            rehypePlugins={[rehypehighlight]}

        >{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
