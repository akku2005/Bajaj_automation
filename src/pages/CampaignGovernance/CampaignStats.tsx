import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, IndianRupee, MessageSquare, MousePointer, CheckCircle, BarChart3, PieChart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CampaignStats() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState('30days');

    // Mock data for stats
    const overallStats = {
        totalCampaigns: 10,
        activeCampaigns: 3,
        totalSpent: 1822000,
        totalBudget: 2765000,
        totalMessagesSent: 688500,
        totalDelivered: 678000,
        totalClicks: 61300,
        totalConversions: 16355,
        avgOpenRate: 92.3,
        avgClickRate: 9.04,
        avgConversionRate: 2.38,
        avgROI: 245
    };

    const channelPerformance = [
        { channel: 'WhatsApp', campaigns: 4, sent: 325500, delivered: 320000, clicks: 35400, conversions: 9825, spend: 901000, color: 'bg-green-600' },
        { channel: 'SMS', campaigns: 3, sent: 245000, delivered: 239500, clicks: 18700, conversions: 3830, spend: 415400, color: 'bg-blue-600' },
        { channel: 'RCS', campaigns: 3, sent: 118000, delivered: 118500, clicks: 7200, conversions: 2700, spend: 505600, color: 'bg-purple-600' }
    ];

    const productPerformance = [
        { product: 'Credit Card', campaigns: 3, conversions: 6975, revenue: 3487500, spend: 785000 },
        { product: 'Personal Loan', campaigns: 2, conversions: 4830, revenue: 2415000, spend: 415400 },
        { product: 'Gold Loan', campaigns: 2, conversions: 2700, revenue: 1350000, spend: 385600 },
        { product: 'Business Loan', campaigns: 1, conversions: 925, revenue: 462500, spend: 245000 },
        { product: 'Insurance', campaigns: 1, conversions: 925, revenue: 462500, spend: 195000 }
    ];

    const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }: any) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{title}</span>
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
            {trend && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{trendValue}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/campaigns')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Campaign Statistics</h1>
                            <p className="text-sm text-gray-600 mt-1">Comprehensive analytics across all campaigns</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        >
                            <option value="7days">Last 7 days</option>
                            <option value="30days">Last 30 days</option>
                            <option value="90days">Last 90 days</option>
                            <option value="all">All time</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-6">
                {/* Overview Stats */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Campaigns"
                            value={overallStats.totalCampaigns}
                            subtitle={`${overallStats.activeCampaigns} active`}
                            icon={BarChart3}
                            trend="up"
                            trendValue="+2 this month"
                        />
                        <StatCard
                            title="Total Spent"
                            value={`₹${(overallStats.totalSpent / 1000).toFixed(0)}K`}
                            subtitle={`of ₹${(overallStats.totalBudget / 1000).toFixed(0)}K budget`}
                            icon={IndianRupee}
                        />
                        <StatCard
                            title="Messages Sent"
                            value={overallStats.totalMessagesSent.toLocaleString()}
                            subtitle={`${((overallStats.totalDelivered / overallStats.totalMessagesSent) * 100).toFixed(1)}% delivered`}
                            icon={MessageSquare}
                            trend="up"
                            trendValue="+12.5%"
                        />
                        <StatCard
                            title="Total Conversions"
                            value={overallStats.totalConversions.toLocaleString()}
                            subtitle={`${overallStats.avgConversionRate}% avg rate`}
                            icon={CheckCircle}
                            trend="up"
                            trendValue="+8.3%"
                        />
                    </div>
                </div>

                {/* Performance Metrics */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="text-sm font-medium text-gray-600 mb-2">Avg Open Rate</div>
                            <div className="text-3xl font-bold text-green-600 mb-2">{overallStats.avgOpenRate}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${overallStats.avgOpenRate}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="text-sm font-medium text-gray-600 mb-2">Avg Click Rate</div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">{overallStats.avgClickRate}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallStats.avgClickRate}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="text-sm font-medium text-gray-600 mb-2">Avg Conversion Rate</div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">{overallStats.avgConversionRate}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${overallStats.avgConversionRate * 10}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="text-sm font-medium text-gray-600 mb-2">Avg ROI</div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">{overallStats.avgROI}%</div>
                            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>+18% vs last month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Channel Performance */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Channel</h2>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaigns</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Messages Sent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Click Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {channelPerformance.map((channel) => (
                                    <tr key={channel.channel} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${channel.color}`}></div>
                                                <span className="text-sm font-medium text-gray-900">{channel.channel}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{channel.campaigns}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{channel.sent.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {((channel.delivered / channel.sent) * 100).toFixed(1)}%
                                                </span>
                                                <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full ${channel.color}`}
                                                        style={{ width: `${(channel.delivered / channel.sent) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                {((channel.clicks / channel.delivered) * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {channel.conversions.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            ₹{(channel.spend / 1000).toFixed(0)}K
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Performance */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Product</h2>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaigns</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spend</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {productPerformance.map((product, index) => {
                                    const roi = ((product.revenue - product.spend) / product.spend) * 100;
                                    return (
                                        <tr key={product.product} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">{product.product}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{product.campaigns}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {product.conversions.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-green-600">
                                                ₹{(product.revenue / 1000).toFixed(0)}K
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                ₹{(product.spend / 1000).toFixed(0)}K
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-sm font-semibold ${roi > 200 ? 'text-green-600' : roi > 100 ? 'text-blue-600' : 'text-orange-600'}`}>
                                                    {roi.toFixed(0)}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Campaign Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-600 rounded-lg">
                            <PieChart className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Campaign Insights</h3>
                            <p className="text-gray-700 mb-4">
                                Based on your campaign performance, our AI has identified 4 new campaign opportunities with an average confidence of 90%.
                                These predicted campaigns are expected to generate ₹10.17L in revenue with a 20.7% average conversion rate.
                            </p>
                            <button
                                onClick={() => navigate('/campaigns')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
                            >
                                View AI Predictions
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
