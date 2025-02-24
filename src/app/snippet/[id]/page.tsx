"use client";

import CodePreview from "@/components/codePreview";
import { snippets } from "@/lib/data";
import { Snippet } from "@/lib/types";
import { Check, Copy, Download, Eye, FileText, Layers, User, Tag } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TemplateDetail = () => {
    const [copied, setCopied] = useState(false);
    const [template, setTemplate] = useState<Snippet | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const snip = snippets.find((item) => item.id === id);
        setTemplate(snip || null);
    }, [id, snippets]);

    const copyToClipboard = (code: any) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    if (!template) return <div>Snippet Is Not Found </div>

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col items-center text-center">
                <h1 className="text-5xl font-bold text-gray-900">{template.title}</h1>
                <p className="text-gray-500 mt-4 text-lg">{template.description}</p>

            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center shadow-sm">
                    <Tag className="text-blue-600 mb-2" size={28} />
                    <span className="font-semibold text-gray-700">Category: {template.category}</span>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center shadow-sm">
                    <User className="text-blue-600 mb-2" size={28} />
                    <span className="font-semibold text-gray-700">Author: {template.author.username}</span>
                </div>
            </div>

            <div className="mt-12">
                <ul className="mt-6 space-y-3">
                    {template.tags.map((feature, index) => (
                        <li key={index} className="text-gray-700 text-lg flex items-center space-x-2">
                            ✅ <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Eye size={24} /> <span>Code Editor</span>
                </h2>
                <div className="mt-6 border rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg p-6">
                    <CodePreview code={template.source_code} />
                </div>
            </div>

            <div className="mt-12 relative">
                <h2 className="text-3xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Copy size={24} /> <span>Code</span>
                </h2>
                <div className="bg-gray-900 text-white p-6 rounded-2xl mt-6 relative shadow-xl">
                    <pre className="overflow-x-auto text-sm bg-gray-800 p-4 rounded-lg">
                        <code>{template.source_code}</code>
                    </pre>
                    <button
                        onClick={() => copyToClipboard(template.source_code)}
                        className="absolute top-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 shadow-md"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />} <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetail;
