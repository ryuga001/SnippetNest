"use client";

import CodePreview from "@/components/codePreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Clipboard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const predefinedPrompts = [
    "Create a modern business landing page with a hero section and features showcase",
    "Design a minimalist portfolio for a photographer with a gallery grid",
    "Generate an e-commerce homepage with featured products and categories",
];

export default function AIGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedCode(""); // Clear previous code

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.snippet) {
                const extractedCode = extractCodeBlock(data.snippet);
                setGeneratedCode(extractedCode || "No valid code found.");
            } else {
                setGeneratedCode("No code generated.");
            }
        } catch (error) {
            console.error("Error fetching AI snippet:", error);
            setGeneratedCode("Error generating code.");
        } finally {
            setIsGenerating(false);
        }
    };


    const extractCodeBlock = (text: string) => {
        const codeMatch = text.match(/```(?:tsx|jsx|javascript|html|css|.*)?\n([\s\S]*?)\n```/);
        return codeMatch ? codeMatch[1].trim() : text.trim();
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success("Code copied to clipboard!");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white py-16">
            <div className="container px-6 mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                        AI Snippet Generator
                    </h1>
                    <p className="text-lg text-gray-300">
                        Describe your dream website, and let AI create it for you!
                    </p>
                </div>


                <Card className="p-8 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-400">
                                Describe your website
                            </label>
                            <Textarea
                                placeholder="E.g., I need a modern business landing page with a hero section, features showcase, and contact form..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="h-32 bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            />
                        </div>


                        <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-400">
                                Try these examples
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {predefinedPrompts.map((predefinedPrompt) => (
                                    <Button
                                        key={predefinedPrompt}
                                        variant="outline"
                                        onClick={() => setPrompt(predefinedPrompt)}
                                        className="text-sm border-gray-600 hover:bg-gray-800 transition-all"
                                    >
                                        {predefinedPrompt}
                                    </Button>
                                ))}
                            </div>
                        </div>


                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 text-lg font-semibold rounded-lg"
                            size="lg"
                            onClick={handleGenerate}
                            disabled={!prompt || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate Template
                                </>
                            )}
                        </Button>
                    </div>
                </Card>


                {generatedCode && (
                    <div className="mt-10">
                        <Card className="p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-blue-400">Generated Code</h2>
                                <Button
                                    variant="ghost"
                                    className="text-gray-400 hover:text-white transition-all flex items-center"
                                    onClick={copyToClipboard}
                                >
                                    <Clipboard className="w-5 h-5 mr-2" />
                                    Copy
                                </Button>
                            </div>
                            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                                <code>{generatedCode}</code>
                            </pre>
                        </Card>


                        <div className="mt-6">
                            <CodePreview code={generatedCode} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
