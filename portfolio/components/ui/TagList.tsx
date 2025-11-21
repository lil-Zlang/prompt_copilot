interface TagListProps {
    tags: string[];
    className?: string;
}

export function TagList({ tags, className }: TagListProps) {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-default"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}
