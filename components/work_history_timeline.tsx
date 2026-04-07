import { WorkHistoryEntry } from "../lib/work-history";

type Props = {
    entries: WorkHistoryEntry[];
};

const WorkHistoryTimeline = ({ entries }: Props) => {
    return (
        <section className="w-full max-w-3xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">職務経歴</h2>
            <ol className="relative border-l-2 border-sg-color-border-default dark:border-sg-dark-muted ml-3">
                {entries.map((entry, index) => (
                    <li key={index} className="mb-8 ml-6">
                        <span
                            className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-sg-blue-400 ring-4 ring-white dark:ring-sg-dark-surface"
                            aria-hidden="true"
                        />
                        <div className="p-4 border border-sg-color-border-default dark:border-sg-dark-muted rounded-sg-lg bg-white dark:bg-sg-dark-surface shadow-sg-sm">
                            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                                {entry.period}
                            </div>
                            <div className="text-lg font-semibold">{entry.organization}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {entry.role}
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold text-sg-blue-500 dark:text-sg-blue-300 mb-1">
                                    主な役割と実績
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
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
