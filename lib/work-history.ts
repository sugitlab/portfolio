import workHistoryData from "./work-history.json";

export type WorkHistoryEntry = {
    period: string;
    organization: string;
    role: string;
    summary: string;
};

export const getWorkHistory = (): WorkHistoryEntry[] => {
    return workHistoryData as WorkHistoryEntry[];
};
