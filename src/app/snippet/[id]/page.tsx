"use client";

import CodePreview from "@/components/codePreview";
import { Button } from "@/components/ui/button";
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


            <header className="mt-12 bg-white p-8 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold drop-shadow-lg">{template.title}</h1>
                <p className="mt-4 text-lg opacity-90">{template.description}</p>

                <ul className="mt-6 flex flex-wrap gap-3">
                    {template.tags.map((tag, index) => (
                        <li key={index} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
                            {tag}
                        </li>
                    ))}
                </ul>
            </header>

            <div className="mt-12 relative bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-semibold flex items-center space-x-2">
                    <Copy size={28} /> <span>Snippet</span>
                </h2>
                <Button variant="ghost"
                    onClick={() => copyToClipboard(template.source_code)}
                    className="absolute top-4 right-4 px-4 py-2 bg-gray-500 hover:bg-gray-200 text-white rounded-lg flex items-center space-x-2 shadow-md"

                >

                    {copied ? <Check size={20} /> : <Copy size={20} />} <span>{copied ? "Copied!" : "Copy"}</span>
                </Button>
                <div className="mt-6 relative">


                    <CodePreview code={template.source_code} />


                </div>
            </div>
        </SectionWrapper>
    );
};

export default TemplateDetail;
