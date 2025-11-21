"use client";

import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { ExpandableSection } from "./ui/ExpandableSection";
import { StatsGrid } from "./ui/StatsGrid";
import { TagList } from "./ui/TagList";
import { experience, projects, skills, stats } from "@/data/portfolio";
import { ExternalLink, Github } from "lucide-react";

export function SinglePagePortfolio() {
    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6">
                <Hero />

                <section className="mb-24">
                    <StatsGrid stats={stats} />
                </section>

                <section id="experience" className="mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
                        Experience
                    </h2>
                    <div className="space-y-2">
                        {experience.map((exp, index) => (
                            <ExpandableSection
                                key={index}
                                title={`${exp.role} @ ${exp.company}`}
                                defaultOpen={index === 0}
                            >
                                <div className="pl-4 border-l-2 border-gray-100 ml-1 space-y-4">
                                    <div className="flex justify-between items-baseline text-sm text-gray-500 font-mono">
                                        <span>{exp.location}</span>
                                        <span>{exp.period}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                                                <span className="text-gray-700 leading-relaxed">
                                                    {achievement}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    {exp.url && (
                                        <a
                                            href={exp.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium hover:underline mt-2"
                                        >
                                            Visit Company <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                            </ExpandableSection>
                        ))}
                    </div>
                </section>

                <section id="projects" className="mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
                        Featured Projects
                    </h2>
                    <div className="space-y-2">
                        {projects.map((project, index) => (
                            <ExpandableSection
                                key={index}
                                title={project.title}
                                defaultOpen={index === 0}
                            >
                                <div className="pl-4 border-l-2 border-gray-100 ml-1 space-y-6">
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {project.description}
                                    </p>
                                    <TagList tags={project.tags} />
                                    <div className="flex gap-4 pt-2">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium hover:text-gray-600 transition-colors"
                                        >
                                            <Github className="mr-2 h-4 w-4" /> View Code
                                        </a>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm font-medium hover:text-gray-600 transition-colors"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </ExpandableSection>
                        ))}
                    </div>
                </section>

                <section id="skills" className="mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
                        Technical Skills
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {skills.map((category, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="font-bold text-lg">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.skills.map((skill, i) => (
                                        <li key={i} className="text-gray-600 border-b border-gray-100 pb-2 last:border-0">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
