import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, TrendingUp, Users, IndianRupee, Play, Pause, MoreVertical, AlertCircle, Search, Download, Copy, Edit, Eye, Target, Activity, ArrowUpRight, RefreshCw, Zap, Send, BarChart3, Plus, Filter, ChevronDown } from 'lucide-react';

// Campaign Analytics Interface
interface CampaignAnalytics {
    messagesSent: number;
    messagesDelivered: number;
    messagesOpened: number;
    messagesClicked: number;
    conversions: number;
    lastUpdated: string;
}

interface AIRecommendation {
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

interface Campaign {
    id: string;
    name: string;
    status: 'sent' | 'paused' | 'scheduled' | 'completed' | 'predicted';
    startDate: string;
    endDate: string;
    channel: 'WhatsApp' | 'SMS' | 'RCS';
    product: string;
    targetUsers: number;
    budget: number;
    spent: number;
    targetConversions: number;
    analytics: CampaignAnalytics;
    aiRecommendation?: AIRecommendation;
    createdDate: string;
}

export default function CampaignOverview() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'scheduled' | 'predicted' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterChannel, setFilterChannel] = useState('all');
    const [filterProduct, setFilterProduct] = useState('all');
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch campaign data
    const fetchCampaignData = async () => {
        setIsRefreshing(true);
        try {
            // In production, this would be an API call
            const mockData: Campaign[] = [
                {
                    id: 'CC-001',
                    name: 'High CIBIL Premium Card Push',
                    status: 'sent',
                    startDate: '2025-11-28',
                    endDate: '2025-12-15',
                    channel: 'WhatsApp',
                    product: 'Credit Card',
                    targetUsers: 125000,
                    budget: 450000,
                    spent: 285000,
                    targetConversions: 5000,
                    createdDate: '2025-11-25',
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
                    id: 'CC-002',
                    name: 'Q4 Personal Loan Campaign',
                    status: 'sent',
                    startDate: '2025-12-01',
                    endDate: '2025-12-20',
                    channel: 'SMS',
                    product: 'Personal Loan',
                    targetUsers: 180000,
                    budget: 320000,
                    spent: 95000,
                    targetConversions: 7200,
                    createdDate: '2025-11-28',
                    analytics: {
                        messagesSent: 65000,
                        messagesDelivered: 63500,
                        messagesOpened: 48200,
                        messagesClicked: 8900,
                        conversions: 1580,
                        lastUpdated: new Date().toISOString()
                    }
                },
                {
                    id: 'CC-003',
                    name: 'Gold Loan - Festival Season',
                    status: 'paused',
                    startDate: '2025-11-20',
                    endDate: '2025-12-10',
                    channel: 'RCS',
                    product: 'Gold Loan',
                    targetUsers: 95000,
                    budget: 280000,
                    spent: 142000,
                    targetConversions: 3800,
                    createdDate: '2025-11-18',
                    analytics: {
                        messagesSent: 58000,
                        messagesDelivered: 56800,
                        messagesOpened: 42100,
                        messagesClicked: 6200,
                        conversions: 1850,
                        lastUpdated: new Date().toISOString()
                    }
                },
                {
                    id: 'CC-004',
                    name: 'Insurance Cross-sell - Winter',
                    status: 'scheduled',
                    startDate: '2025-12-08',
                    endDate: '2025-12-22',
                    channel: 'WhatsApp',
                    product: 'Insurance',
                    targetUsers: 110000,
                    budget: 195000,
                    spent: 0,
                    targetConversions: 4400,
                    createdDate: '2025-11-30',
                    analytics: {
                        messagesSent: 0,
                        messagesDelivered: 0,
                        messagesOpened: 0,
                        messagesClicked: 0,
                        conversions: 0,
                        lastUpdated: new Date().toISOString()
                    }
                },
                {
                    id: 'CC-005',
                    name: 'Business Loan RCS Rich Media',
                    status: 'sent',
                    startDate: '2025-11-25',
                    endDate: '2025-12-12',
                    channel: 'RCS',
                    product: 'Business Loan',
                    targetUsers: 75000,
                    budget: 385000,
                    spent: 245000,
                    targetConversions: 3000,
                    createdDate: '2025-11-22',
                    analytics: {
                        messagesSent: 52000,
                        messagesDelivered: 51200,
                        messagesOpened: 43500,
                        messagesClicked: 9800,
                        conversions: 2925,
                        lastUpdated: new Date().toISOString()
                    }
                },
                {
                    id: 'CC-006',
                    name: 'Diwali Special - Premium Rewards',
                    status: 'completed',
                    startDate: '2025-10-15',
                    endDate: '2025-11-15',
                    channel: 'WhatsApp',
                    product: 'Premium Card',
                    targetUsers: 150000,
                    budget: 280000,
                    spent: 275000,
                    targetConversions: 6000,
                    createdDate: '2025-10-10',
                    analytics: {
                        messagesSent: 150000,
                        messagesDelivered: 147000,
                        messagesOpened: 135000,
                        messagesClicked: 24000,
                        conversions: 6750,
                        lastUpdated: new Date().toISOString()
                    }
                },
                // AI-Predicted Campaigns
                {
                    id: 'AI-REC-001',
                    name: 'Premium Credit Card - High CIBIL Acquisition',
                    status: 'predicted',
                    startDate: '2025-12-10',
                    endDate: '2025-12-28',
                    channel: 'WhatsApp',
                    product: 'Premium Card',
                    targetUsers: 50000,
                    budget: 156000,
                    spent: 0,
                    targetConversions: 925,
                    createdDate: '2025-12-03',
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
                    startDate: '2025-12-08',
                    endDate: '2025-12-22',
                    channel: 'RCS',
                    product: 'Gold Card',
                    targetUsers: 35000,
                    budget: 119000,
                    spent: 0,
                    targetConversions: 847,
                    createdDate: '2025-12-03',
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
                    startDate: '2025-12-05',
                    endDate: '2025-12-25',
                    channel: 'SMS',
                    product: 'Student Card',
                    targetUsers: 60000,
                    budget: 126400,
                    spent: 0,
                    targetConversions: 948,
                    createdDate: '2025-12-03',
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
                },
                {
                    id: 'AI-REC-004',
                    name: 'Dormant Card Reactivation - High-Value',
                    status: 'predicted',
                    startDate: '2025-12-12',
                    endDate: '2025-12-30',
                    channel: 'WhatsApp',
                    product: 'Reactivation',
                    targetUsers: 25000,
                    budget: 98000,
                    spent: 0,
                    targetConversions: 785,
                    createdDate: '2025-12-03',
                    analytics: {
                        messagesSent: 0,
                        messagesDelivered: 0,
                        messagesOpened: 0,
                        messagesClicked: 0,
                        conversions: 0,
                        lastUpdated: new Date().toISOString()
                    },
                    aiRecommendation: {
                        recommendationId: 'REC-12348',
                        confidence: 89,
                        expectedLeads: 78,
                        expectedConversion: '31.4%',
                        expectedRevenue: '₹1,95,920',
                        expectedCPA: '₹2,512',
                        aiReasoning: 'Dormant cardholders (no txn 90+ days) who previously spent ₹20K+ monthly show 45% reactivation rate.',
                        fromUseCaseId: 'use-case-1',
                        fromUseCaseName: 'PL - AIP Uplift'
                    }
                }
            ];

            setCampaigns(mockData);
            setLastRefresh(new Date());
        } catch (error) {
            console.error('Error fetching campaign data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCampaignData();
        const interval = setInterval(fetchCampaignData, 30000);
        return () => clearInterval(interval);
    }, []);

    // Filter campaigns based on active tab and filters
    const filteredCampaigns = campaigns.filter(campaign => {
        if (activeTab !== 'all' && campaign.status !== activeTab) return false;
        if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) && !campaign.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterChannel !== 'all' && campaign.channel !== filterChannel) return false;
        if (filterProduct !== 'all' && campaign.product !== filterProduct) return false;
        return true;
    });

    // Tab counts
    const tabCounts = {
        all: campaigns.length,
        sent: campaigns.filter(c => c.status === 'sent').length,
        scheduled: campaigns.filter(c => c.status === 'scheduled').length,
        predicted: campaigns.filter(c => c.status === 'predicted').length,
        completed: campaigns.filter(c => c.status === 'completed').length
    };

    // Helper functions
    const getChannelColor = (channel: string) => {
        switch (channel) {
            case 'WhatsApp': return 'bg-green-600';
            case 'SMS': return 'bg-blue-600';
            case 'RCS': return 'bg-purple-600';
            default: return 'bg-gray-600';
        }
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            sent: 'bg-green-100 text-green-700',
            paused: 'bg-yellow-100 text-yellow-700',
            scheduled: 'bg-blue-100 text-blue-700',
            completed: 'bg-gray-100 text-gray-700',
            predicted: 'bg-purple-100 text-purple-700'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All campaigns</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage and monitor all your campaign performance</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchCampaignData}
                            disabled={isRefreshing}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={() => navigate('/campaigns/stats')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition"
                        >
                            <BarChart3 className="w-4 h-4" />
                            Campaign Stats
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition font-semibold">
                            <Plus className="w-4 h-4" />
                            Create campaign
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {[
                        { key: 'all', label: 'All', count: tabCounts.all },
                        { key: 'sent', label: 'sent', count: tabCounts.sent },
                        { key: 'scheduled', label: 'Scheduled', count: tabCounts.scheduled },
                        { key: 'predicted', label: '🤖 AI Predicted', count: tabCounts.predicted },
                        { key: 'completed', label: 'Completed', count: tabCounts.completed }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeTab === tab.key
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-md relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterChannel}
                        onChange={(e) => setFilterChannel(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                        <option value="all">All Channels</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="SMS">SMS</option>
                        <option value="RCS">RCS</option>
                    </select>
                    <select
                        value={filterProduct}
                        onChange={(e) => setFilterProduct(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                        <option value="all">All Products</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Gold Loan">Gold Loan</option>
                        <option value="Business Loan">Business Loan</option>
                        <option value="Insurance">Insurance</option>
                    </select>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
                        <Filter className="w-4 h-4" />
                        More filters
                    </button>
                </div>
            </div>

            {/* Results Info */}
            <div className="px-8 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                    Showing latest {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Table */}
            <div className="px-8 py-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Campaign Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Campaign Performance
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Budget
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    AI Confidence
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCampaigns.map(campaign => (
                                <tr
                                    key={campaign.id}
                                    className={`hover:bg-gray-50 transition ${campaign.status === 'predicted' ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                                        }`}
                                >
                                    {/* Campaign Name */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500">ID: {campaign.id}</span>
                                                {campaign.status === 'predicted' && campaign.aiRecommendation && (
                                                    <>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-purple-600 font-medium flex items-center gap-1">
                                                            <Target className="w-3 h-3" />
                                                            From: {campaign.aiRecommendation.fromUseCaseName}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-900">{campaign.product}</span>
                                        </div>
                                        <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${getChannelColor(campaign.channel)}`}>
                                            {campaign.channel}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(campaign.status)}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {formatDate(campaign.startDate)}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Created */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(campaign.createdDate)}
                                    </td>

                                    {/* Campaign Performance */}
                                    <td className="px-6 py-4">
                                        {campaign.status === 'completed' ? (
                                            <div className="space-y-2 min-w-[200px]">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs text-gray-600">Sent</span>
                                                        <span className="text-xs font-medium text-gray-900">
                                                            {campaign.analytics.messagesSent.toLocaleString()} ({((campaign.analytics.messagesSent / campaign.targetUsers) * 100).toFixed(0)}%)
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min((campaign.analytics.messagesSent / campaign.targetUsers) * 100, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs text-gray-600">Delivered</span>
                                                        <span className="text-xs font-medium text-gray-900">
                                                            {campaign.analytics.messagesDelivered.toLocaleString()} ({((campaign.analytics.messagesDelivered / campaign.analytics.messagesSent) * 100).toFixed(0)}%)
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(campaign.analytics.messagesDelivered / campaign.analytics.messagesSent) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs text-gray-600">Clicks</span>
                                                        <span className="text-xs font-medium text-gray-900">
                                                            {campaign.analytics.messagesClicked.toLocaleString()} ({((campaign.analytics.messagesClicked / campaign.analytics.messagesDelivered) * 100).toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${(campaign.analytics.messagesClicked / campaign.analytics.messagesDelivered) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : campaign.status === 'predicted' && campaign.aiRecommendation ? (
                                            <div className="space-y-2 min-w-[200px]">
                                                <div className="text-xs text-purple-600 font-medium mb-1">Expected Performance</div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">Conv. Rate</span>
                                                    <span className="text-xs font-medium text-green-600">{campaign.aiRecommendation.expectedConversion}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">Expected Revenue</span>
                                                    <span className="text-xs font-medium text-gray-900">{campaign.aiRecommendation.expectedRevenue}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">CPA</span>
                                                    <span className="text-xs font-medium text-gray-900">{campaign.aiRecommendation.expectedCPA}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                <div className="font-medium text-gray-900">{formatDate(campaign.createdDate)}</div>
                                                <div className="text-xs text-gray-500 mt-1">{formatTime(campaign.createdDate)}</div>
                                            </div>
                                        )}
                                    </td>

                                    {/* Budget */}
                                    <td className="px-6 py-4">
                                        <div className="min-w-[120px]">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs text-gray-600">Spent</span>
                                                <span className="text-xs font-medium text-gray-900">₹{(campaign.spent / 1000).toFixed(0)}K</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                                <div
                                                    className={`h-1.5 rounded-full ${(campaign.spent / campaign.budget) * 100 > 90 ? 'bg-red-600' : (campaign.spent / campaign.budget) * 100 > 75 ? 'bg-yellow-600' : 'bg-blue-600'}`}
                                                    style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-xs text-gray-500">of ₹{(campaign.budget / 1000).toFixed(0)}K</div>
                                        </div>
                                    </td>

                                    {/* AI Confidence */}
                                    <td className="px-6 py-4">
                                        {campaign.aiRecommendation ? (
                                            <div className="flex items-center gap-1">
                                                <Zap className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm font-semibold text-purple-700">
                                                    {campaign.aiRecommendation.confidence}%
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">—</span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {campaign.status === 'predicted' ? (
                                                <button
                                                    onClick={() => alert(`Launch campaign: ${campaign.name}`)}
                                                    className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-1"
                                                >
                                                    <Send className="w-3 h-3" />
                                                    Launch
                                                </button>
                                            ) : (
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    );
}
