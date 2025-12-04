export interface UseCaseMetrics {
    lead: number;
    aip: string;
    coa: string;
    targetAchieved: number;
    trendData?: number[];
}

export interface UseCase {
    id: string;
    name: string;
    description: string;
    goal: string;
    status: 'active' | 'inactive' | 'draft' | 'paused';
    metrics: UseCaseMetrics;
    quarterlyGoal: string;
    budget: string;
    currentPerformance: {
        actual: string;
        expectedProgress: string;
        conversionForecast: string;
        cap: string;
    };
    todayGroup?: {
        improveAppBy: number;
        percentage: number;
    };
    budgetAdjustment?: {
        increaseSpendBy: number;
    };
    overrides: UseCaseOverrides;
    averageTicketSize?: number;
}

export interface UseCaseOverrides {
    overrideDuration: 'today' | '1week' | 'custom';
    channelBoost: 'sms' | 'rcs' | 'whatsapp' | null;
    focus: 'monitored' | 'aggressive' | 'conservative';
}

export interface PredictionDimension {
    id: number;
    dimension: string;
    description: string;
    sendDecisionsTo: string;
    locked: boolean;
    order: number;
}

export interface UseCaseConfiguration {
    useCaseId: string;
    predictionDimensions: PredictionDimension[];
    customerGroups?: any[];
    actionBanks?: any[];
    channels?: any[];
    conversion?: any[];
    rewards?: any[];
    guardrails?: any[];
}
