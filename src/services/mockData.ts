// Mock data for user-level AI decisioning demo

export interface User {
    userId: string;
    mobile: string;
    email?: string;
    name?: string;
    segment: string;
    cibil: number;
    cibilBand: 'S1' | 'S2' | 'S3' | 'S4';
    city: string;
    cityTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
    createdAt: string;
    lastSeen: string;
    currentStage: 'anonymous' | 'registered' | 'lead' | 'aip' | 'disbursed';

    affinityScores: {
        product: Record<string, number>;
        channel: Record<string, number>;
        partner: Record<string, number>;
    };

    features: Record<string, any>;
    rlParams: Record<string, { alpha: number; beta: number }>;
    engagementScore: number;
    churnRisk: number;
    fatigueScore: number;
}

export interface Decision {
    decisionId: string;
    userId: string;
    timestamp: string;
    offer: string;
    offerAmount: number;
    channel: string;
    partner: string;
    creativeVariant: string;
    score: number;
    confidence: number;
    exploration: boolean;
    outcome?: 'converted' | 'pending' | 'ignored' | 'suppressed';
    outcomeTimestamp?: string;
    reasoning: string;
}

export interface Feature {
    name: string;
    value: any;
    type: 'numeric' | 'categorical' | 'array' | 'boolean';
    computedAt: string;
    expiresAt?: string;
    category: 'product_affinity' | 'channel_affinity' | 'partner_affinity' | 'eligibility' | 'engagement' | 'governance';
    history?: { timestamp: string; value: number }[];
}

// Generate mock users  
const generateMockUsers = (): User[] => {
    const segments = ['S1 - High CIBIL', 'S2 - Metro Cities', 'S3 - Tier 2 Cities', 'S4 - New Users'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'];
    const names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohan', 'Pooja', 'Karthik', 'Divya'];

    return Array.from({ length: 100 }, (_, i) => {
        const userId = `U-${7000000 + i}`;
        const segment = segments[i % segments.length];
        const cibilBase = segment.includes('S1') ? 750 : segment.includes('S2') ? 700 : segment.includes('S3') ? 650 : 600;
        const cibil = cibilBase + Math.floor(Math.random() * 50);

        return {
            userId,
            mobile: `+91-${9000000000 + i}`,
            email: `user${i}@example.com`,
            name: names[i % names.length],
            segment,
            cibil,
            cibilBand: (cibil >= 750 ? 'S1' : cibil >= 700 ? 'S2' : cibil >= 650 ? 'S3' : 'S4') as 'S1' | 'S2' | 'S3' | 'S4',
            city: cities[i % cities.length],
            cityTier: (i % 3 === 0 ? 'Tier 1' : i % 3 === 1 ? 'Tier 2' : 'Tier 3') as 'Tier 1' | 'Tier 2' | 'Tier 3',
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            currentStage: (['registered', 'lead', 'aip', 'disbursed'][Math.floor(Math.random() * 4)] as any),

            affinityScores: {
                product: {
                    pl: 0.6 + Math.random() * 0.4,
                    cc: 0.3 + Math.random() * 0.4,
                    gl: 0.2 + Math.random() * 0.3,
                    hl: 0.1 + Math.random() * 0.3,
                    bl: 0.4 + Math.random() * 0.3,
                },
                channel: {
                    whatsapp: 0.5 + Math.random() * 0.5,
                    sms: 0.2 + Math.random() * 0.4,
                    rcs: 0.3 + Math.random() * 0.4,
                    push: 0.1 + Math.random() * 0.3,
                    email: 0.2 + Math.random() * 0.3,
                },
                partner: {
                    federal: 0.6 + Math.random() * 0.4,
                    fibe: 0.7 + Math.random() * 0.3,
                    icici: 0.5 + Math.random() * 0.3,
                    hdfc: 0.5 + Math.random() * 0.3,
                    kisht: 0.2 + Math.random() * 0.3,
                },
            },

            features: {
                pl_page_views_7d: Math.floor(Math.random() * 10),
                whatsapp_open_rate: 0.3 + Math.random() * 0.7,
                sms_open_rate: 0.2 + Math.random() * 0.4,
                bureau_pl_enquiries_30d: Math.floor(Math.random() * 3),
                app_opens_7d: Math.floor(Math.random() * 15),
                campaigns_received_7d: Math.floor(Math.random() * 8),
                conversion_probability: 0.2 + Math.random() * 0.6,
            },

            rlParams: {
                'pl_whatsapp_federal': { alpha: Math.floor(Math.random() * 50) + 10, beta: Math.floor(Math.random() * 20) + 5 },
                'cc_sms_fibe': { alpha: Math.floor(Math.random() * 30) + 5, beta: Math.floor(Math.random() * 30) + 10 },
                'gl_rcs_icici': { alpha: Math.floor(Math.random() * 20) + 3, beta: Math.floor(Math.random() * 25) + 8 },
            },

            engagementScore: 0.4 + Math.random() * 0.6,
            churnRisk: Math.random() * 0.5,
            fatigueScore: Math.random() * 0.8,
        };
    });
};

// Generate mock decisions
const generateMockDecisions = (users: User[]): Decision[] => {
    const decisions: Decision[] = [];
    const offers = ['PL 500K', 'PL 300K', 'CC 100K', 'GL 200K', 'HL 1000K', 'BL 150K'];
    const channels = ['WhatsApp', 'SMS', 'RCS', 'Push', 'Email'];
    const partners = ['Federal', 'Fibe', 'ICICI', 'HDFC', 'Kisht', 'PayU'];
    const outcomes: Array<'converted' | 'pending' | 'ignored' | 'suppressed'> = ['converted', 'pending', 'ignored', 'suppressed'];

    users.slice(0, 50).forEach((user) => {
        const numDecisions = Math.floor(Math.random() * 10) + 3;

        for (let i = 0; i < numDecisions; i++) {
            const timestamp = new Date(Date.now() - (numDecisions - i) * 24 * 60 * 60 * 1000).toISOString();
            const exploration = Math.random() < 0.1;

            decisions.push({
                decisionId: `D-${100000 + decisions.length}`,
                userId: user.userId,
                timestamp,
                offer: offers[Math.floor(Math.random() * offers.length)],
                offerAmount: [300000, 500000, 100000, 200000, 1000000, 150000][Math.floor(Math.random() * 6)],
                channel: channels[Math.floor(Math.random() * channels.length)],
                partner: partners[Math.floor(Math.random() * partners.length)],
                creativeVariant: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
                score: exploration ? 0.3 + Math.random() * 0.3 : 0.7 + Math.random() * 0.3,
                confidence: exploration ? 0.5 + Math.random() * 0.3 : 0.8 + Math.random() * 0.2,
                exploration,
                outcome: i < numDecisions - 2 ? outcomes[Math.floor(Math.random() * outcomes.length)] : 'pending',
                outcomeTimestamp: i < numDecisions - 2 ? new Date(Date.parse(timestamp) + Math.random() * 48 * 60 * 60 * 1000).toISOString() : undefined,
                reasoning: `User has ${Math.floor(Math.random() * 100)}% response rate. Recently viewed product. High engagement on channel. CIBIL ${user.cibil} ideal for this product.`,
            });
        }
    });

    return decisions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Initialize mock data
export const mockUsers = generateMockUsers();
export const mockDecisions = generateMockDecisions(mockUsers);

// Mock RL Metrics
export const mockRLMetrics = {
    totalDecisions: 7200000,
    averageAccuracy: 0.92,
    explorationRate: 0.08,
    decisionsToday: 125000,
    avgConfidence: 0.88,
    explorationHistory: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        explorationRate: 0.15 - (i * 0.0023),
        exploitationRate: 0.85 + (i * 0.0023),
    })),
    learningCurve: Array.from({ length: 12 }, (_, i) => ({
        week: `Week ${i + 1}`,
        accuracy: 0.65 + (i * 0.0225),
        decisions: (i + 1) * 1200,
    })),
};

// Helper functions
export const getUserById = (userId: string): User | undefined => {
    return mockUsers.find(u => u.userId === userId);
};

export const searchUsers = (query: string): User[] => {
    const lowerQuery = query.toLowerCase();
    return mockUsers.filter(u =>
        u.userId.toLowerCase().includes(lowerQuery) ||
        u.mobile.includes(query) ||
        u.email?.toLowerCase().includes(lowerQuery) ||
        u.name?.toLowerCase().includes(lowerQuery)
    ).slice(0, 20);
};

export const getUserDecisions = (userId: string, limit = 50): Decision[] => {
    return mockDecisions.filter(d => d.userId === userId).slice(0, limit);
};

export const getDecisionById = (decisionId: string): Decision | undefined => {
    return mockDecisions.find(d => d.decisionId === decisionId);
};

export const getDecisionStream = (params?: {
    limit?: number;
    segment?: string;
    channel?: string;
    product?: string;
}): Decision[] => {
    let filtered = [...mockDecisions];

    if (params?.segment) {
        const userIds = mockUsers.filter(u => u.segment === params.segment).map(u => u.userId);
        filtered = filtered.filter(d => userIds.includes(d.userId));
    }

    if (params?.channel) {
        filtered = filtered.filter(d => d.channel === params.channel);
    }

    if (params?.product) {
        filtered = filtered.filter(d => d.offer.includes(params.product));
    }

    return filtered.slice(0, params?.limit || 100);
};

export const getUserFeatures = (userId: string): Feature[] => {
    const user = getUserById(userId);
    if (!user) return [];

    return Object.entries(user.features).map(([name, value]) => {
        let category: Feature['category'] = 'engagement';
        if (name.includes('_page_views')) category = 'product_affinity';
        else if (name.includes('_open_rate')) category = 'channel_affinity';
        else if (name.includes('bureau_')) category = 'eligibility';
        else if (name.includes('campaigns_')) category = 'governance';

        return {
            name,
            value,
            type: typeof value === 'number' ? 'numeric' : typeof value === 'boolean' ? 'boolean' : Array.isArray(value) ? 'array' : 'categorical',
            computedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            expiresAt: Math.random() < 0.3 ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            category,
            history: typeof value === 'number' ? Array.from({ length: 7 }, (_, i) => ({
                timestamp: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
                value: value * (0.8 + Math.random() * 0.4),
            })) : undefined,
        };
    });
};

// Live decision simulation
export const getLiveDecisionUpdate = (): Decision => {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const offers = ['PL 500K', 'PL 300K', 'CC 100K', 'GL 200K'];
    const channels = ['WhatsApp', 'SMS', 'RCS', 'Push'];
    const partners = ['Federal', 'Fibe', 'ICICI', 'HDFC'];

    const exploration = Math.random() < 0.08;

    return {
        decisionId: `D-${Date.now()}`,
        userId: user.userId,
        timestamp: new Date().toISOString(),
        offer: offers[Math.floor(Math.random() * offers.length)],
        offerAmount: [300000, 500000, 100000, 200000][Math.floor(Math.random() * 4)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        partner: partners[Math.floor(Math.random() * partners.length)],
        creativeVariant: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        score: exploration ? 0.3 + Math.random() * 0.3 : 0.7 + Math.random() * 0.3,
        confidence: exploration ? 0.5 + Math.random() * 0.3 : 0.8 + Math.random() * 0.2,
        exploration,
        outcome: 'pending',
        reasoning: `User has ${Math.floor(Math.random() * 100)}% response rate. High engagement. CIBIL ${user.cibil} ideal.`,
    };
};
