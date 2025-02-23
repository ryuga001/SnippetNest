"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const images = [
    "https://img.freepik.com/free-photo/mythical-dragon-beast-anime-style_23-2151112835.jpg?w=1800",
    "https://img.freepik.com/free-photo/men-women-embrace-sunset-generative-ai_188544-12581.jpg?w=1800",
    "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645914.jpg?w=1800",
    "https://img.freepik.com/free-photo/anime-style-portrait-traditional-japanese-samurai-character_23-2151499086.jpg?w=1800",
    "https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546166.jpg?w=1380",
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Image Slider */}
            <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
                <img
                    src={images[currentIndex]}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-5xl font-bold drop-shadow-lg">
                    Welcome to Our Store
                </h1>
                <p className="text-xl mt-2">Discover amazing website templates</p>
                <Button className="p-8 bg-transparent m-2" variant="outline" asChild>
                    <Link href="/templates">Browse Template</Link>
                </Button>
            </div>


            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
