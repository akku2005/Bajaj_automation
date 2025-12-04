import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, TrendingUp, Users, IndianRupee, Play, Pause, MoreVertical, AlertCircle, Search, Download, Copy, Edit, Eye, Target, Activity, ArrowUpRight, RefreshCw, Zap, Send, BarChart3, Plus, Filter, ChevronDown } from 'lucide-react';
import { useCampaignStore } from '../../stores/campaignStore';
import { Campaign } from '../../types/campaign';

export default function CampaignOverview() {
    const navigate = useNavigate();
    const { campaigns, setCampaigns } = useCampaignStore();
    const [activeTab, setActiveTab] = useState<'all' | 'predicted' | 'sent' | 'scheduled'>('predicted');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterChannel, setFilterChannel] = useState('all');
    const [filterProduct, setFilterProduct] = useState('all');
    const [filterDeliveryType, setFilterDeliveryType] = useState('all');

    // Helper function to format date as YYYY-MM-DD for input fields
    const formatDateForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Set default date range: Today to Day After Tomorrow
    const getDefaultDateFrom = () => formatDateForInput(new Date());
    const getDefaultDateTo = () => {
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        return formatDateForInput(dayAfterTomorrow);
    };

    const [filterDateFrom, setFilterDateFrom] = useState(getDefaultDateFrom());
    const [filterDateTo, setFilterDateTo] = useState(getDefaultDateTo());
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch campaign data
    const fetchCampaignData = async () => {
        setIsRefreshing(true);
        try {
            // In a real app, we would fetch from API here and update the store
            // For now, we just simulate a delay as the store is already populated
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLastRefresh(new Date());
        } catch (error) {
            console.error('Error fetching campaign data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        // fetchCampaignData(); // Store is already initialized
        const interval = setInterval(fetchCampaignData, 30000);
        return () => clearInterval(interval);
    }, []);

    // Helper to check if date is today
    const isToday = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Helper to check if date is yesterday
    const isYesterday = (dateString: string) => {
        const date = new Date(dateString);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear();
    };

    // Filter campaigns based on active tab and filters
    const filteredCampaigns = campaigns.filter(campaign => {
        // Tab-based filtering
        if (activeTab === 'predicted') {
            // AI Suggested
            if (campaign.status !== 'predicted') return false;
        } else if (activeTab === 'sent') {
            // Sent
            if (campaign.status !== 'sent') return false;
        } else if (activeTab === 'scheduled') {
            // Scheduled
            if (campaign.status !== 'scheduled') return false;
        }

        // Date range filter (Apply to ALL tabs)
        if (filterDateFrom) {
            const campaignDate = new Date(campaign.startDate);
            const fromDate = new Date(filterDateFrom);
            // Reset times to compare dates only
            campaignDate.setHours(0, 0, 0, 0);
            fromDate.setHours(0, 0, 0, 0);
            if (campaignDate < fromDate) return false;
        }
        if (filterDateTo) {
            const campaignDate = new Date(campaign.startDate);
            const toDate = new Date(filterDateTo);
            // Reset times to compare dates only
            campaignDate.setHours(0, 0, 0, 0);
            toDate.setHours(0, 0, 0, 0);
            if (campaignDate > toDate) return false;
        }

        // Search and other filters (apply to all tabs)
        if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) && !campaign.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterChannel !== 'all' && campaign.channel !== filterChannel) return false;
        if (filterProduct !== 'all' && campaign.product !== filterProduct) return false;
        if (filterDeliveryType !== 'all' && campaign.deliveryType !== filterDeliveryType) return false;
        return true;
    });

    // Tab counts
    const tabCounts = {
        all: campaigns.length,
        predicted: campaigns.filter(c => c.status === 'predicted').length,
        sent: campaigns.filter(c => c.status === 'sent').length,
        scheduled: campaigns.filter(c => c.status === 'scheduled').length
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
            yesterday: 'bg-gray-100 text-gray-700',
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
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {[
                        { key: 'predicted', label: '🤖 AI Suggested (today)', count: tabCounts.predicted },
                        { key: 'all', label: 'All', count: tabCounts.all },
                        { key: 'scheduled', label: 'Scheduled', count: tabCounts.scheduled },
                        { key: 'sent', label: 'Sent', count: tabCounts.sent }
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
                <div className="flex flex-col gap-4">
                    {/* First Row: Search */}
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
                    </div>

                    {/* Second Row: All Filters */}
                    <div className="flex items-center gap-3">
                        {/* Date Range Filter */}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <input
                                type="date"
                                value={filterDateFrom}
                                onChange={(e) => setFilterDateFrom(e.target.value)}
                                placeholder="From date"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                            />
                            <span className="text-gray-500 text-sm">to</span>
                            <input
                                type="date"
                                value={filterDateTo}
                                onChange={(e) => setFilterDateTo(e.target.value)}
                                placeholder="To date"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                            />
                        </div>

                        {/* Product Filter */}
                        <select
                            value={filterProduct}
                            onChange={(e) => setFilterProduct(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                        >
                            <option value="all">All Products</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Personal Loan">Personal Loan</option>
                            <option value="Gold Loan">Gold Loan</option>
                            <option value="Business Loan">Business Loan</option>
                            <option value="Insurance">Insurance</option>
                        </select>

                        {/* Channel Filter */}
                        <select
                            value={filterChannel}
                            onChange={(e) => setFilterChannel(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                        >
                            <option value="all">All Channels</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="SMS">SMS</option>
                            <option value="RCS">RCS</option>
                        </select>

                        {/* Delivery Type Filter */}
                        <select
                            value={filterDeliveryType}
                            onChange={(e) => setFilterDeliveryType(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                        >
                            <option value="all">All Delivery Types</option>
                            <option value="Immediate">Immediate</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Batch">Batch</option>
                            <option value="Triggered">Triggered</option>
                        </select>

                        {/* Clear Filters Button */}
                        {(filterDateFrom || filterDateTo || filterProduct !== 'all' || filterChannel !== 'all' || filterDeliveryType !== 'all') && (
                            <button
                                onClick={() => {
                                    setFilterDateFrom('');
                                    setFilterDateTo('');
                                    setFilterProduct('all');
                                    setFilterChannel('all');
                                    setFilterDeliveryType('all');
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition text-sm"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
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
                                        {campaign.status === 'yesterday' ? (
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
