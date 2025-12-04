export interface CampaignAnalytics {
    messagesSent: number;
    messagesDelivered: number;
    messagesOpened: number;
    messagesClicked: number;
    conversions: number;
    lastUpdated: string;
}

export interface AIRecommendation {
    recommendationId: string;
    confidence: number;
    expectedLeads: number;
    expectedConversion: string;
    expectedRevenue: string;
    expectedCPA: string;
    aiReasoning: string;
    fromUseCaseId: string;
    fromUseCaseName: string;
}

export interface Campaign {
    id: string;
    name: string;
    status: 'sent' | 'paused' | 'scheduled' | 'yesterday' | 'predicted';
    startDate: string;
    endDate: string;
    channel: 'WhatsApp' | 'SMS' | 'RCS' | 'Push Notification';
    product: string;
    targetUsers: number;
    budget: number;
    spent: number;
    targetConversions: number;
    analytics: CampaignAnalytics;
    aiRecommendation?: AIRecommendation;
    createdDate: string;
    deliveryType: 'Immediate' | 'Scheduled' | 'Batch' | 'Triggered';
}
