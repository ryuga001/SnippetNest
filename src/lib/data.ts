import { Snippet, User } from "./types";


export const snippets: Snippet[] = [
    {
        id: '1',
        title: 'Modern Portfolio',
        description: 'A sleek portfolio template for creative professionals',
        category: ['Portfolio'],
        tags: ['Minimal', 'Dark Mode', 'Responsive'],
        source_code: `
import React from "react";

export default function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <header className="w-full bg-blue-600 text-white p-6 text-center">
                <h1 className="text-3xl font-bold">Modern Portfolio</h1>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <p className="text-xl">Welcome to your portfolio!</p>
            </main>
            <footer className="w-full p-4 bg-gray-800 text-white text-center">
                &copy; 2025 Portfolio Inc.
            </footer>
        </div>
    );
}`,
        cover_image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1470&fit=crop',
        author: {
            author_id: '101',
            username: 'Alex Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&fit=crop'
        },
        liked: true
    },
    {
        id: '2',
        title: 'E-commerce Pro',
        description: 'Complete e-commerce solution with modern design',
        category: ['E-commerce'],
        tags: ['Shop', 'Cart', 'Dashboard'],
        source_code: `
import React from "react";

export default function ECommerce() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-4xl font-bold text-gray-800">E-commerce Pro</h1>
            <p className="text-lg text-gray-600">A powerful e-commerce solution</p>
        </div>
    );
}`,
        cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&fit=crop',
        author: {
            author_id: '102',
            username: 'Sarah Miller',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&fit=crop'
        },
        liked: false
    },
    {
        id: '3',
        title: 'Blog Master',
        description: 'Professional blog template with multiple layouts',
        category: ['Blog'],
        tags: ['Content', 'SEO', 'Responsive'],
        source_code: `
import React from "react";

export default function Blog() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-800">Blog Master</h1>
            <p className="text-lg text-gray-600">Your go-to blog template</p>
        </div>
    );
}`,
        cover_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&fit=crop',
        author: {
            author_id: '103',
            username: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&fit=crop'
        },
        liked: true
    }
];


export const featuredSnippets = snippets.slice(0, 3);


export const categories = [
    'All',
    'Portfolio',
    'E-commerce',
    'Blog',
    'Landing Page',
    'Dashboard',
    'Mobile App'
];


export const mockUser: User = {
    id: '1',
    username: 'JohnDoe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&fit=crop',
    role: 'user'
};

