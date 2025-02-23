"use client";

import { Sandpack } from "@codesandbox/sandpack-react";

export default function CodePreview({ code = "" }: { code: string }) {



    const tailwindCSS = `
  @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  `;

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl border rounded-xl overflow-hidden shadow-lg bg-gray-100 p-4">
                <Sandpack
                    template="react"
                    files={{
                        "/App.js": { code },
                        "/index.css": { code: tailwindCSS },
                    }}
                    options={{
                        showConsole: true,
                        showLineNumbers: true,
                        editorHeight: 500,
                        editorWidthPercentage: 50,
                        resizablePanels: true,
                    }}
                />
            </div>
        </div>
    );
}
