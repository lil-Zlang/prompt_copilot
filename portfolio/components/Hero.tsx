import { ArrowRight, Download } from "lucide-react";

export function Hero() {
    return (
        <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-32">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                <div className="flex-1 space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                        Building digital
                        <br />
                        <span className="text-gray-400">experiences</span> that matter.
                    </h1>
                    <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                        I'm a Full Stack Developer based in San Francisco. I build accessible,
                        pixel-perfect, and performant web applications.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#projects"
                            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors group"
                        >
                            View Work
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center px-6 py-3 border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-colors"
                        >
                            Download CV
                            <Download className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
                    {/* Placeholder for profile image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span className="text-sm uppercase tracking-widest">Profile Image</span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
            </div>
        </section>
    );
}
