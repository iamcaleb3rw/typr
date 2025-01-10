"use client";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

interface EditorProps {
  initialHtml: string | null | undefined;
  initialCss: string | null | undefined;
  initialJs: string | null | undefined;
  id: string | null | undefined;
}

export default function Editor({
  initialHtml,
  initialCss,
  initialJs,
  id,
}: EditorProps) {
  const [htmlValue, setHtmlValue] = useState<string | undefined>(
    initialHtml ?? ""
  );
  const [cssValue, setCssValue] = useState<string | undefined>(
    initialCss ?? ""
  );
  const [jsValue, setJSValue] = useState<string | undefined>(initialJs ?? "");

  // Using ref for srcDoc to avoid unnecessary re-renders
  const srcDocRef = useRef<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      srcDocRef.current = `
        <html>
          <body>${htmlValue}</body>
          <style>${cssValue}</style>
          <script>${jsValue}</script>
        </html>
      `;
    }, 200);

    return () => clearTimeout(timeout);
  }, [htmlValue, cssValue, jsValue]); // Only rerun when one of these values changes

  // Save function using axios
  const handleSave = async () => {
    try {
      const response = await axios.post("/api/save-code", {
        id,
        html: htmlValue,
        css: cssValue,
        js: jsValue,
      });

      if (response.status === 200) {
        alert("Code was successfully saved.");
      } else {
        console.error("Failed to save code", response.statusText);
        toast.error("Failed to save the code.");
      }
    } catch (error) {
      console.error("Error saving code:", error);
      toast.error("Error saving code.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Save
      </button>
      <div className="grid grid-cols-3 gap-1">
        {/* HTML Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            HTML
          </div>
          <CodeMirror
            extensions={[htmlLang(), EditorView.lineWrapping]} // Correctly enable line wrapping
            value={htmlValue}
            onChange={setHtmlValue}
            theme={"dark"}
            className="h-full border-t w-[700px] bg-[#282C34] overflow-auto" // Removed overflow-x-hidden to ensure wrapping works
          />
        </div>

        {/* JavaScript Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            JS
          </div>
          <CodeMirror
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]} // Correctly enable line wrapping
            value={jsValue}
            onChange={setJSValue}
            theme={"dark"}
            className="h-full border-t bg-[#282C34] overflow-auto" // Removed overflow-x-hidden to ensure wrapping works
          />
        </div>

        {/* CSS Editor */}
        <div className="relative border bg-[#282C34] h-[50vh] flex flex-col rounded-md overflow-hidden">
          <div className="sticky top-0 z-30 bg-lime-400 px-2 py-1 rounded-t-md">
            CSS
          </div>
          <CodeMirror
            extensions={[cssLang(), EditorView.lineWrapping]} // Correctly enable line wrapping
            value={cssValue}
            onChange={setCssValue}
            theme={"dark"}
            className="h-full border-t bg-[#282C34] overflow-auto" // Removed overflow-x-hidden to ensure wrapping works
          />
        </div>
      </div>

      {/* Preview */}
      <div className="border h-[40vh]">
        <iframe
          srcDoc={srcDocRef.current} // Use the ref value instead of state
          title="output"
          sandbox="allow-scripts"
          frameBorder={"0"}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
}
