"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface EditorProps {
  initialHtml: string | null | undefined;
  initialCss: string | null | undefined;
  initialJs: string | null | undefined;
  id: string | null | undefined;
}

const CodeEditor = ({
  initialHtml,
  initialCss,
  initialJs,
  id,
}: EditorProps) => {
  const [htmlValue, setHtmlValue] = useState<string | undefined>(
    initialHtml ?? ""
  );
  const [cssValue, setCssValue] = useState<string | undefined>(
    initialCss ?? ""
  );
  const [jsValue, setJSValue] = useState<string | undefined>(initialJs ?? "");

  // Using ref for srcDoc to avoid unnecessary re-renders
  const [srcDoc, setSrcDoc] = useState<string | undefined>("");
  const [saving, setSaving] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmlValue}</body>
          <style>${cssValue}</style>
          <script>${jsValue}</script>
        </html>
      `);
    }, 50);

    return () => clearTimeout(timeout);
  }, [htmlValue, cssValue, jsValue]); // Only rerun when one of these values changes

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axios.post("/api/save-code", {
        id,
        html: htmlValue,
        css: cssValue,
        js: jsValue,
      });

      if (response.status === 200) {
        toast.success("Code was successfully saved.");
      } else {
        toast.error("Failed to save the code.");
      }
    } catch (error) {
      toast.error("Error saving code.");
    } finally {
      setSaving(false);
    }
  };

  // Handle the keydown event for Ctrl+S or Cmd+S
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if "Ctrl" (or "Cmd") and "S" are pressed simultaneously
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default save action
        handleSave(); // Trigger the save function
      }
    };

    // Add event listener on mount
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [htmlValue, cssValue, jsValue]); // Triggered when values change

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={handleSave}
        disabled={saving}
        variant={"outline"}
        className="  px-4 py-2 "
      >
        {saving ? (
          <div className="flex items-center gap-2">
            Saving{" "}
            <span>
              <Loader2 className="animate-spin" />
            </span>
          </div>
        ) : (
          "Save"
        )}
      </Button>
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
            className="h-full border-t w-[700px] bg-[#282C34] overflow-auto"
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
            className="h-full border-t bg-[#282C34] overflow-auto"
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
            className="h-full border-t bg-[#282C34] overflow-auto"
          />
        </div>
      </div>

      {/* Preview */}
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

export default CodeEditor;
