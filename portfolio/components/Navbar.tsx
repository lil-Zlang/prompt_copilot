"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Twitter, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tighter">
                    DEV.
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                        <a href="#" className="text-gray-500 hover:text-black transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-black transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-black transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex items-center space-x-6 pt-6 border-t border-gray-100">
                                <a href="#" className="text-gray-500 hover:text-black">
                                    <Github className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-black">
                                    <Twitter className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-black">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
