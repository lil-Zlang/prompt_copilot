'use client';

import { useState, ReactNode } from 'react';

export default function Hero() {
  return (
    <section className="border-b border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
          Prompt Co-Pilot Demo
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Try AI-powered prompt refinement without any setup. Improve your prompts with intelligent suggestions powered by advanced language models.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#try-it"
            className="px-6 py-3 bg-black text-white font-mono hover:bg-gray-800 transition-colors border border-black"
          >
            Try It Now
          </a>
          <a
            href="#features"
            className="px-6 py-3 bg-white text-black font-mono hover:bg-gray-50 transition-colors border border-black"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

