export function Footer() {
    return (
        <footer className="py-8 border-t border-gray-200 mt-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                        GitHub
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                        LinkedIn
                    </a>
                    <a href="mailto:hello@example.com" className="text-sm text-gray-500 hover:text-black transition-colors">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
