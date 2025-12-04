import { create } from 'zustand';
import { Campaign } from '../types/campaign';

interface CampaignStore {
    campaigns: Campaign[];
    setCampaigns: (campaigns: Campaign[]) => void;
    addCampaign: (campaign: Campaign) => void;
    updateCampaign: (id: string, updates: Partial<Campaign>) => void;
    getCampaignById: (id: string) => Campaign | undefined;
}

// Helper functions for dynamic dates
const today = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

const formatDateStr = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const initialCampaigns: Campaign[] = [
    // Today's Sent Campaigns
    {
        id: 'CC-001',
        name: 'High CIBIL Premium Card Push',
        status: 'sent',
        startDate: formatDateStr(today),
        endDate: formatDateStr(nextWeek),
        channel: 'WhatsApp',
        product: 'Credit Card',
        targetUsers: 125000,
        budget: 450000,
        spent: 285000,
        targetConversions: 5000,
        createdDate: formatDateStr(today),
        deliveryType: 'Immediate',
        analytics: {
            messagesSent: 98500,
            messagesDelivered: 96200,
            messagesOpened: 78500,
            messagesClicked: 12400,
            conversions: 3250,
            lastUpdated: new Date().toISOString()
        }
    },
    {
        id: 'CC-005',
        name: 'Business Loan RCS Rich Media',
        status: 'sent',
        startDate: formatDateStr(today),
        endDate: formatDateStr(nextWeek),
        channel: 'RCS',
        product: 'Business Loan',
        targetUsers: 75000,
        budget: 385000,
        spent: 245000,
        targetConversions: 3000,
        createdDate: formatDateStr(today),
        deliveryType: 'Batch',
        analytics: {
            messagesSent: 52000,
            messagesDelivered: 51200,
            messagesOpened: 43500,
            messagesClicked: 9800,
            conversions: 2925,
            lastUpdated: new Date().toISOString()
        }
    },
    // Scheduled Campaigns
    {
        id: 'CC-004',
        name: 'Insurance Cross-sell - Winter',
        status: 'scheduled',
        startDate: formatDateStr(tomorrow),
        endDate: formatDateStr(nextWeek),
        channel: 'WhatsApp',
        product: 'Insurance',
        targetUsers: 110000,
        budget: 195000,
        spent: 0,
        targetConversions: 4400,
        createdDate: formatDateStr(today),
        deliveryType: 'Scheduled',
        analytics: {
            messagesSent: 0,
            messagesDelivered: 0,
            messagesOpened: 0,
            messagesClicked: 0,
            conversions: 0,
            lastUpdated: new Date().toISOString()
        }
    },
    // Yesterday's Campaigns
    {
        id: 'CC-006',
        name: 'Diwali Special - Premium Rewards',
        status: 'sent',
        startDate: formatDateStr(yesterday),
        endDate: formatDateStr(yesterday),
        channel: 'WhatsApp',
        product: 'Premium Card',
        targetUsers: 150000,
        budget: 280000,
        spent: 275000,
        targetConversions: 6000,
        createdDate: formatDateStr(yesterday),
        deliveryType: 'Immediate',
        analytics: {
            messagesSent: 150000,
            messagesDelivered: 147000,
            messagesOpened: 135000,
            messagesClicked: 24000,
            conversions: 6750,
            lastUpdated: new Date().toISOString()
        }
    },
    // AI-Predicted Campaigns (Today)
    {
        id: 'AI-REC-001',
        name: 'Premium Credit Card - High CIBIL Acquisition',
        status: 'predicted',
        startDate: formatDateStr(tomorrow),
        endDate: formatDateStr(nextWeek),
        channel: 'WhatsApp',
        product: 'Premium Card',
        targetUsers: 50000,
        budget: 156000,
        spent: 0,
        targetConversions: 925,
        createdDate: formatDateStr(today),
        deliveryType: 'Triggered',
        analytics: {
            messagesSent: 0,
            messagesDelivered: 0,
            messagesOpened: 0,
            messagesClicked: 0,
            conversions: 0,
            lastUpdated: new Date().toISOString()
        },
        aiRecommendation: {
            recommendationId: 'REC-12345',
            confidence: 94,
            expectedLeads: 245,
            expectedConversion: '18.5%',
            expectedRevenue: '₹3,82,050',
            expectedCPA: '₹1,560',
            aiReasoning: 'High CIBIL score (750+) customers show 42% higher approval rate for premium credit cards.',
            fromUseCaseId: 'use-case-1',
            fromUseCaseName: 'PL - AIP Uplift'
        }
    },
    {
        id: 'AI-REC-002',
        name: 'Gold Card Upgrade - Existing Silver Users',
        status: 'predicted',
        startDate: formatDateStr(tomorrow),
        endDate: formatDateStr(nextWeek),
        channel: 'RCS',
        product: 'Gold Card',
        targetUsers: 35000,
        budget: 119000,
        spent: 0,
        targetConversions: 847,
        createdDate: formatDateStr(today),
        deliveryType: 'Scheduled',
        analytics: {
            messagesSent: 0,
            messagesDelivered: 0,
            messagesOpened: 0,
            messagesClicked: 0,
            conversions: 0,
            lastUpdated: new Date().toISOString()
        },
        aiRecommendation: {
            recommendationId: 'REC-12346',
            confidence: 91,
            expectedLeads: 156,
            expectedConversion: '24.2%',
            expectedRevenue: '₹2,99,520',
            expectedCPA: '₹1,920',
            aiReasoning: 'Existing Silver cardholders who spend ₹15K+ monthly are 3.2x more likely to upgrade to Gold.',
            fromUseCaseId: 'use-case-1',
            fromUseCaseName: 'PL - AIP Uplift'
        }
    },
    {
        id: 'AI-REC-003',
        name: 'Student Credit Card - College Segment',
        status: 'predicted',
        startDate: formatDateStr(tomorrow),
        endDate: formatDateStr(nextWeek),
        channel: 'SMS',
        product: 'Student Card',
        targetUsers: 60000,
        budget: 126400,
        spent: 0,
        targetConversions: 948,
        createdDate: formatDateStr(today),
        deliveryType: 'Batch',
        analytics: {
            messagesSent: 0,
            messagesDelivered: 0,
            messagesOpened: 0,
            messagesClicked: 0,
            conversions: 0,
            lastUpdated: new Date().toISOString()
        },
        aiRecommendation: {
            recommendationId: 'REC-12347',
            confidence: 87,
            expectedLeads: 189,
            expectedConversion: '15.8%',
            expectedRevenue: '₹2,39,360',
            expectedCPA: '₹1,264',
            aiReasoning: 'College students (18-24) represent untapped market with high lifetime value potential.',
            fromUseCaseId: 'use-case-1',
            fromUseCaseName: 'PL - AIP Uplift'
        }
    }
];

export const useCampaignStore = create<CampaignStore>((set, get) => ({
    campaigns: initialCampaigns,
    setCampaigns: (campaigns) => set({ campaigns }),
    addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
    updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map((c) =>
            c.id === id ? { ...c, ...updates } : c
        )
    })),
    getCampaignById: (id) => get().campaigns.find((c) => c.id === id),
}));
