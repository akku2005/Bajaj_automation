import { create } from 'zustand';
import type { UseCase } from '../types/useCase';

interface UseCaseStore {
    useCases: UseCase[];
    setUseCases: (useCases: UseCase[]) => void;
    updateUseCase: (id: string, updates: Partial<UseCase>) => void;
    getUseCaseById: (id: string) => UseCase | undefined;
}

// Initial mock data
const initialUseCases: UseCase[] = [
    {
        id: 'pl-aip-uplift',
        name: 'PL - AIP Uplift',
        description: 'Goal: 15% AIP',
        goal: '15% AIP',
        status: 'active',
        metrics: {
            lead: 1204,
            aip: '89%',
            coa: '$15.72',
            targetAchieved: 75,
            trendData: [65, 68, 70, 72, 71, 73, 75]
        },
        quarterlyGoal: '15%',
        budget: 'XMN INR',
        currentPerformance: {
            actual: '48%',
            expectedProgress: '55%',
            conversionForecast: '12%',
            cap: '7%'
        },
        overrides: {
            overrideDuration: 'today',
            channelBoost: 'sms',
            focus: 'monitored'
        },
        averageTicketSize: 1.4,
        todayGroup: {
            improveAppBy: 5,
            percentage: 5
        },
        budgetAdjustment: {
            increaseSpendBy: 10000
        }
    },
    {
        id: 'cc-lead-growth',
        name: 'CC - Lead Growth',
        description: 'Campaign for credit cards',
        goal: 'Lead Growth',
        status: 'inactive',
        metrics: {
            lead: 852,
            aip: '12.5%',
            coa: '$21.40',
            targetAchieved: 92,
            trendData: [85, 87, 88, 90, 89, 91, 92]
        },
        quarterlyGoal: '12%',
        budget: 'XMN INR',
        currentPerformance: {
            actual: '42%',
            expectedProgress: '50%',
            conversionForecast: '10%',
            cap: '5%'
        },
        overrides: {
            overrideDuration: 'today',
            channelBoost: null,
            focus: 'monitored'
        }
    },
    {
        id: 'insurance-approval',
        name: 'Insurance - Approval Uplift',
        description: 'Optimize insurance approvals',
        goal: 'Approval Uplift',
        status: 'inactive',
        metrics: {
            lead: 450,
            aip: '67%',
            coa: '$34.20',
            targetAchieved: 45,
            trendData: [40, 41, 42, 43, 44, 44, 45]
        },
        quarterlyGoal: '18%',
        budget: 'XMN INR',
        currentPerformance: {
            actual: '35%',
            expectedProgress: '45%',
            conversionForecast: '8%',
            cap: '4%'
        },
        overrides: {
            overrideDuration: '1week',
            channelBoost: null,
            focus: 'conservative'
        }
    }
];

export const useUseCaseStore = create<UseCaseStore>((set, get) => ({
    useCases: initialUseCases,
    setUseCases: (useCases) => set({ useCases }),
    updateUseCase: (id, updates) => set((state) => ({
        useCases: state.useCases.map((uc) =>
            uc.id === id ? { ...uc, ...updates } : uc
        )
    })),
    getUseCaseById: (id) => get().useCases.find((uc) => uc.id === id),
}));
