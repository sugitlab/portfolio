import { WorkHistoryEntry } from "../lib/work-history";

type Props = {
    entries: WorkHistoryEntry[];
};

const WorkHistoryTimeline = ({ entries }: Props) => {
    return (
        <section className="w-full max-w-3xl mx-auto mt-8 px-4">
            <h2 className="font-display text-2xl font-bold mb-6 text-center text-sg-gray-950 dark:text-sg-gray-100">職務経歴</h2>
            <ol className="relative border-l-2 border-sg-green-200 dark:border-sg-dark-muted ml-3">
                {entries.map((entry, index) => (
                    <li key={index} className="mb-8 ml-6">
                        <span
                            className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-sg-green-400 ring-4 ring-white dark:ring-sg-dark-surface"
                            aria-hidden="true"
                        />
                        <div className="p-4 border border-white/80 dark:border-white/10 rounded-sg-lg bg-white/80 dark:bg-sg-dark-surface/80 shadow-sg-sm backdrop-blur-sm">
                            <div className="text-xs font-mono text-sg-gray-500 dark:text-sg-gray-400 mb-1">
                                {entry.period}
                            </div>
                            <div className="text-lg font-semibold text-sg-gray-950 dark:text-sg-gray-100">{entry.organization}</div>
                            <div className="text-sm text-sg-gray-600 dark:text-sg-gray-300 mb-3">
                                {entry.role}
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold text-sg-green-600 dark:text-sg-green-300 mb-1">
                                    主な役割と実績
                                </div>
                                <p className="text-sg-gray-700 dark:text-sg-gray-200 whitespace-pre-wrap leading-relaxed">
                                    {entry.summary}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default WorkHistoryTimeline;
