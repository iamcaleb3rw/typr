"use client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { useState, useEffect } from "react";

const Workspace = () => {
  const [htmlValue, setHtmlValue] = useState("Yooo");
  const [cssValue, setCssValue] = useState("Yooo");
  const [jsValue, setJSValue] = useState("Yooo");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
    <html>
    <body>${htmlValue}</body>
    <style>${cssValue}</style>
    <script>${jsValue}</script>
    </html>
    `
      );
    }, 200);
  }, [htmlValue, cssValue, jsValue]);

  return (
    <div className="flex flex-col gap-1">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-1
    "
      >
        {/* HTML Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            HTML
          </div>
          <CodeMirror
            extensions={[html()]}
            value={htmlValue}
            onChange={setHtmlValue}
            theme={"dark"}
            className="h-full border-t bg-[#282C34] overflow-auto minimal-scrollbar"
          />
        </div>

        {/* JavaScript Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            JS
          </div>
          <CodeMirror
            extensions={[javascript({ jsx: true })]}
            value={jsValue}
            onChange={setJSValue}
            theme={"dark"}
            className="h-full border-t bg-[#282C34] overflow-auto minimal-scrollbar"
          />
        </div>

        {/* CSS Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            CSS
          </div>
          <CodeMirror
            extensions={[css()]}
            value={cssValue}
            onChange={setCssValue}
            theme={"dark"}
            className="h-full border-t bg-[#282C34] overflow-auto minimal-scrollbar"
          />
        </div>
      </div>
      <div className="border h-[40vh]">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder={"0"}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default Workspace;
