import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import only necessary languages to optimize bundle
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("python", python);

import {
    FileText,
    Upload,
    ChevronLeft,
    Copy,
    Check,
    Moon,
    Sun,
    Info,
    AlertTriangle,
    Lightbulb,
    Hash,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MarkdownViewer() {
    const [markdown, setMarkdown] = useState<string | null>(null);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [copyId, setCopyId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (file: File) => {
        if (
            file &&
            (file.name.endsWith(".md") ||
                file.name.endsWith(".markdown") ||
                file.type === "text/markdown")
        ) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result;
                if (typeof content === "string") {
                    setMarkdown(content);
                }
            };
            reader.readAsText(file);
        } else {
            alert("Vui lòng chọn file định dạng .md");
        }
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file);
    }, []);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const isDark = theme === "dark";

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopyId(id);
        setTimeout(() => setCopyId(null), 2000);
    };

    const components = {
        h1: ({ children, ...props }: any) => {
            return (
                <h1
                    className={`text-4xl font-black mb-8 border-b pb-4 ${isDark ? "text-white border-white/10" : "text-neutral-900 border-neutral-200"}`}
                    {...props}
                >
                    {children}
                </h1>
            );
        },
        h2: ({ children, ...props }: any) => {
            return (
                <h2
                    className={`text-2xl font-bold mt-12 mb-4 flex items-center gap-2 group ${isDark ? "text-white" : "text-neutral-900"}`}
                    {...props}
                >
                    <Hash
                        size={20}
                        className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-all"
                    />
                    {children}
                </h2>
            );
        },
        h3: ({ children, ...props }: any) => (
            <h3
                className={`text-xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-neutral-800"}`}
                {...props}
            >
                {children}
            </h3>
        ),
        p: ({ children }: any) => (
            <p
                className={`leading-relaxed mb-6 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
                {children}
            </p>
        ),
        li: ({ children }: any) => (
            <li
                className={`mb-2 list-none flex items-start gap-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
                {children}
            </li>
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            if (!inline && match) {
                return (
                    <div className="relative group my-8">
                        <div className="absolute right-4 top-4 z-10">
                            <button
                                onClick={() =>
                                    handleCopy(codeString, codeString)
                                }
                                className={`p-2 rounded-lg border transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/5"}`}
                            >
                                {copyId === codeString ? (
                                    <Check
                                        size={16}
                                        className="text-green-500"
                                    />
                                ) : (
                                    <Copy
                                        size={16}
                                        className="text-neutral-400"
                                    />
                                )}
                            </button>
                        </div>
                        <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-xl bg-[#0d0d0d]! p-6! border border-white/10"
                            {...props}
                        >
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                );
            }
            return (
                <code
                    className={`px-1.5 py-0.5 rounded font-mono text-sm ${isDark ? "bg-white/5 text-cyan-400" : "bg-black/5 text-cyan-600"}`}
                    {...props}
                >
                    {children}
                </code>
            );
        },
        blockquote: ({ children }: any) => {
            const content = children?.[1]?.props?.children?.[0];
            let type: "note" | "warning" | "tip" | "standard" = "standard";
            if (typeof content === "string") {
                if (content.includes("[!NOTE]")) type = "note";
                else if (content.includes("[!WARNING]")) type = "warning";
                else if (content.includes("[!TIP]")) type = "tip";
            }

            const styles = {
                note: {
                    bg: isDark ? "bg-blue-500/5" : "bg-blue-50",
                    border: "border-blue-500/50",
                    icon: <Info className="text-blue-500" />,
                    label: "Ghi chú",
                },
                warning: {
                    bg: isDark ? "bg-yellow-500/5" : "bg-yellow-50",
                    border: "border-yellow-500/50",
                    icon: <AlertTriangle className="text-yellow-500" />,
                    label: "Cảnh báo",
                },
                tip: {
                    bg: isDark ? "bg-cyan-500/5" : "bg-cyan-50",
                    border: "border-cyan-500/50",
                    icon: <Lightbulb className="text-cyan-500" />,
                    label: "Mẹo",
                },
                standard: {
                    bg: isDark ? "bg-white/5" : "bg-neutral-100",
                    border: isDark ? "border-white/10" : "border-black/5",
                    icon: null,
                    label: null,
                },
            };
            const style = styles[type];

            return (
                <div
                    className={`my-8 p-6 rounded-xl border-l-4 ${style.bg} ${style.border}`}
                >
                    {style.label && (
                        <div
                            className={`flex items-center gap-2 mb-2 font-bold text-sm uppercase tracking-widest ${isDark ? "text-white" : "text-neutral-900"}`}
                        >
                            {style.icon}
                            {style.label}
                        </div>
                    )}
                    <div
                        className={`italic ${isDark ? "opacity-80" : "text-neutral-600"}`}
                    >
                        {children}
                    </div>
                </div>
            );
        },
        table: ({ children }: any) => (
            <div
                className={`my-8 overflow-x-auto rounded-xl border ${isDark ? "border-white/10" : "border-neutral-200"}`}
            >
                <table
                    className={`w-full border-collapse ${isDark ? "bg-white/5" : "bg-white"}`}
                >
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: any) => (
            <th
                className={`p-4 text-left text-sm font-bold uppercase ${isDark ? "text-white bg-white/10" : "text-neutral-900 bg-neutral-100"}`}
            >
                {children}
            </th>
        ),
        td: ({ children }: any) => (
            <td
                className={`p-4 border-t text-sm ${isDark ? "border-white/5 text-neutral-400" : "border-neutral-100 text-neutral-600"}`}
            >
                {children}
            </td>
        ),
    };

    return (
        <div
            className={`min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-neutral-900"}`}
        >
            {/* Minimal Header */}
            <header
                className={`h-16 flex items-center justify-between px-8 border-b transition-all sticky top-0 z-50 shrink-0 backdrop-blur-md ${isDark ? "bg-black/50 border-white/5" : "bg-white/80 border-neutral-200 shadow-sm"}`}
            >
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/5 text-neutral-400 hover:text-white" : "hover:bg-black/5 text-neutral-500 hover:text-black"}`}
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <FileText size={20} className="text-cyan-500" />
                        <span
                            className={`font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}
                        >
                            Markdown Viewer
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {markdown && (
                        <button
                            onClick={() => setMarkdown(null)}
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? "text-neutral-50" : "text-neutral-500 hover:text-black"}`}
                        >
                            Đôi file
                        </button>
                    )}
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`p-2 rounded-lg transition-all border ${isDark ? "bg-white/5 hover:bg-white/10 text-neutral-400 border-white/5" : "bg-black/5 hover:bg-black/10 text-neutral-500 border-black/5"}`}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col relative">
                {!markdown ? (
                    <div
                        className={`flex-1 flex flex-col items-center justify-center p-6 transition-all ${isDragging ? "bg-cyan-500/5" : ""}`}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <label
                            className={`w-full max-w-2xl aspect-video flex flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed transition-all cursor-pointer group ${isDragging ? "border-cyan-500 bg-cyan-500/10 scale-102" : `border-neutral-200 hover:border-cyan-500/50 ${isDark ? "bg-white/5 border-white/10" : "bg-neutral-50"}`}`}
                        >
                            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                                <Upload size={40} />
                            </div>
                            <div className="text-center space-y-2">
                                <h3
                                    className={`text-xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}
                                >
                                    Kéo thả file Markdown (.md)
                                </h3>
                                <p className="text-neutral-500">
                                    Hoặc click vào đây để chọn file từ máy tính
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept=".md,.markdown"
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    handleFileUpload(e.target.files[0])
                                }
                            />
                        </label>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="max-w-4xl mx-auto p-12 lg:p-24 min-h-full">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={components}
                            >
                                {markdown}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </main>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
