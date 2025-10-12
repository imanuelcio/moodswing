import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  id: string;
}

const CodeBlock = ({ code, language = "bash" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="bg-slate-950 rounded-lg p-4 border border-border overflow-x-auto">
        <div className="text-xs text-slate-400 mb-2 font-mono">{language}</div>
        <pre className="text-sm font-mono text-slate-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
export default CodeBlock;
