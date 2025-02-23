"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Snippet } from "@/lib/types";



interface SnippetCardProps {
    snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
    const [isLiked, setIsLiked] = useState(snippet.liked);

    return (
        <Card className="overflow-hidden group">
            <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={snippet.cover_image}
                        alt={snippet.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <Heart
                            className={`w-5 h-5 ${isLiked ? "fill-destructive text-destructive" : ""}`}
                        />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{snippet.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{snippet.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={snippet.author.avatar}
                        alt={snippet.author.username}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">by {snippet.author.username}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Link href={`/template/${snippet.id}`}>
                    <Button variant="outline">View Snippet</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
