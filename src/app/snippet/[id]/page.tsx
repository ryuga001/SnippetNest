"use client";

import CodePreview from "@/components/codePreview";
import SectionWrapper from "@/hoc/sectionWrapper";
import { snippets } from "@/lib/data";
import { Snippet } from "@/lib/types";
import { Check, Copy, Eye, Tag, User } from "lucide-react";
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

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!template) return <div className="text-center text-2xl font-semibold text-red-500">Snippet Not Found</div>;

    return (
        <SectionWrapper>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl rounded-3xl p-10 text-white text-center">
                <h1 className="text-5xl font-extrabold drop-shadow-lg">{template.title}</h1>
                <p className="mt-4 text-lg opacity-90">{template.description}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg transform transition hover:scale-105">
                    <Tag className="text-blue-600 mb-2" size={32} />
                    <span className="font-semibold text-gray-700">Category: {template.category}</span>
                </div>
                <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg transform transition hover:scale-105">
                    <User className="text-blue-600 mb-2" size={32} />
                    <span className="font-semibold text-gray-700">Author: {template.author.username}</span>
                </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-semibold text-gray-900">Tags</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                    {template.tags.map((tag, index) => (
                        <li key={index} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Eye size={28} /> <span>Live Preview</span>
                </h2>
                <div className="mt-6 border rounded-2xl bg-gray-100 shadow-lg p-6">
                    <CodePreview code={template.source_code} />
                </div>
            </div>

            <div className="mt-12 relative bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-semibold flex items-center space-x-2">
                    <Copy size={28} /> <span>Code Snippet</span>
                </h2>
                <div className="mt-6 relative">
                    <pre className="overflow-x-auto text-sm bg-gray-800 p-6 rounded-lg shadow-lg">
                        <code>{template.source_code}</code>
                    </pre>
                    <button
                        onClick={() => copyToClipboard(template.source_code)}
                        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 shadow-md"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />} <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default TemplateDetail;
