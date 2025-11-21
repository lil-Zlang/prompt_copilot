interface Stat {
    label: string;
    value: string;
}

interface StatsGridProps {
    stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col space-y-2">
                    <span className="text-4xl font-bold tracking-tighter">{stat.value}</span>
                    <span className="text-sm text-gray-500 uppercase tracking-widest">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
