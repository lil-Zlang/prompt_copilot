export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    achievements: string[];
    url?: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    github: string;
    url?: string;
}

export interface SkillCategory {
    title: string;
    skills: string[];
}

export const experience: Experience[] = [
    {
        company: "Tech Corp",
        role: "Senior Frontend Engineer",
        location: "San Francisco, CA",
        period: "2022 - Present",
        achievements: [
            "Led migration of legacy dashboard to Next.js 14, improving load times by 40%",
            "Implemented design system using Tailwind CSS used across 5 different products",
            "Mentored 3 junior developers and conducted weekly code review sessions",
        ],
        url: "https://example.com",
    },
    {
        company: "Startup Inc",
        role: "Full Stack Developer",
        location: "Remote",
        period: "2020 - 2022",
        achievements: [
            "Built MVP of e-commerce platform using React and Node.js",
            "Integrated Stripe payments and reduced checkout friction by 25%",
            "Managed AWS infrastructure and CI/CD pipelines",
        ],
    },
];

export const projects: Project[] = [
    {
        title: "Portfolio V2",
        description:
            "A modern, minimalist portfolio website built with Next.js 14, React, and Tailwind CSS. Features smooth animations and a clean design system.",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        github: "https://github.com/username/portfolio",
        url: "https://portfolio.com",
    },
    {
        title: "Task Master",
        description:
            "Productivity application with real-time collaboration features. Built with Supabase and React Query for optimal performance.",
        tags: ["React", "Supabase", "React Query", "Zustand"],
        github: "https://github.com/username/task-master",
    },
    {
        title: "Weather Dashboard",
        description:
            "Interactive weather dashboard visualizing complex meteorological data using D3.js and OpenWeatherMap API.",
        tags: ["D3.js", "API Integration", "TypeScript"],
        github: "https://github.com/username/weather-dash",
        url: "https://weather-dash.demo",
    },
];

export const skills: SkillCategory[] = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "PostgreSQL", "Supabase", "GraphQL", "Serverless"],
    },
    {
        title: "Tools",
        skills: ["Git", "Docker", "AWS", "Figma", "Jest"],
    },
];

export const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Shipped", value: "20+" },
    { label: "Open Source", value: "100+" },
    { label: "Coffee Consumed", value: "∞" },
];
