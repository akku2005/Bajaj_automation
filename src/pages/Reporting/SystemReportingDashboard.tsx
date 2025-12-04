import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, IndianRupee, Target, Zap, BarChart3, Activity, CheckCircle, Download, RefreshCw, AlertCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../../stores/useCaseStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

export default function SystemReportingDashboard() {
    const navigate = useNavigate();
    const { useCases } = useUseCaseStore();
    const [dateRange, setDateRange] = useState('30days');
    const [activeSection, setActiveSection] = useState('overview');

    // Aggregate system-wide metrics
    const systemMetrics = {
        campaigns: {
            total: 10,
            active: 3,
            totalBudget: 2765000,
            totalSpent: 1822000,
            messagesSent: 688500,
            messagesDelivered: 678000,
            clicks: 61300,
            conversions: 16355,
            avgConversionRate: 2.38,
            avgROI: 245
        },
        useCases: {
            total: useCases.length,
            active: useCases.filter(uc => uc.status === 'active').length,
            totalLeads: useCases.reduce((sum, uc) => sum + uc.metrics.lead, 0),
            avgTargetAchievement: useCases.reduce((sum, uc) => sum + uc.metrics.targetAchieved, 0) / useCases.length
        },
        ai: {
            totalDecisions: 45680,
            predictionAccuracy: 89.5,
            aiRecommendations: 4,
            decisionsToday: 1850
        },
        revenue: {
            total: 12458000,
            growth: 18.5
        }
    };

    // Chart Data
    const revenueChartData = [
        { month: 'Jan', revenue: 820 }, { month: 'Feb', revenue: 780 },
        { month: 'Mar', revenue: 910 }, { month: 'Apr', revenue: 950 },
        { month: 'May', revenue: 1020 }, { month: 'Jun', revenue: 1100 },
        { month: 'Jul', revenue: 1180 }, { month: 'Aug', revenue: 1050 },
        { month: 'Sep', revenue: 1220 }, { month: 'Oct', revenue: 1150 },
        { month: 'Nov', revenue: 1280 }, { month: 'Dec', revenue: 1246 }
    ];

    const campaignPerformanceData = [
        { name: 'Week 1', sent: 150000, delivered: 148000, clicks: 13000, conversions: 3500 },
        { name: 'Week 2', sent: 160000, delivered: 157000, clicks: 14000, conversions: 3800 },
        { name: 'Week 3', sent: 155000, delivered: 152000, clicks: 13500, conversions: 3600 },
        { name: 'Week 4', sent: 170000, delivered: 167000, clicks: 15000, conversions: 4100 }
    ];

    const channelDistribution = [
        { name: 'WhatsApp', value: 45, color: '#10b981' },
        { name: 'SMS', value: 30, color: '#3b82f6' },
        { name: 'RCS', value: 25, color: '#8b5cf6' }
    ];

    const productRevenueData = [
        { product: 'Credit Card', revenue: 3487 },
        { product: 'Personal Loan', revenue: 4215 },
        { product: 'Gold Loan', revenue: 2350 },
        { product: 'Business Loan', revenue: 1462 },
        { product: 'Insurance', revenue: 943 }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">System Reporting Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive analytics across all modules</p>
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
                        </select>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Section Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
                        { id: 'campaigns', label: 'Campaign Performance', icon: Activity },
                        { id: 'usecases', label: 'Use Cases', icon: Target },
                        { id: 'ai', label: 'AI Insights', icon: Zap },
                        { id: 'revenue', label: 'Revenue & Financial', icon: IndianRupee },
                        { id: 'governance', label: 'Governance', icon: CheckCircle }
                    ].map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${activeSection === section.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {section.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
                {/* Executive Overview Tab */}
                {activeSection === 'overview' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Executive Overview</h2>

                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: 'Total Campaigns', value: systemMetrics.campaigns.total, icon: Activity, color: 'blue', trend: '+2 this month' },
                                { title: 'Total Revenue', value: `₹${(systemMetrics.revenue.total / 100000).toFixed(1)}L`, icon: IndianRupee, color: 'green', trend: `+${systemMetrics.revenue.growth}%` },
                                { title: 'Active Use Cases', value: systemMetrics.useCases.active, icon: Target, color: 'purple', subtitle: `${systemMetrics.useCases.avgTargetAchievement.toFixed(0)}% avg achievement` },
                                { title: 'AI Decisions', value: systemMetrics.ai.decisionsToday.toLocaleString(), icon: Zap, color: 'orange', trend: '+12.5%' }
                            ].map((metric, i) => {
                                const Icon = metric.icon;
                                const colorClasses = {
                                    blue: 'bg-blue-50 text-blue-600',
                                    green: 'bg-green-50 text-green-600',
                                    purple: 'bg-purple-50 text-purple-600',
                                    orange: 'bg-orange-50 text-orange-600'
                                };
                                return (
                                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">{metric.title}</span>
                                            <div className={`p-2 rounded-lg ${colorClasses[metric.color]}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                                        {metric.trend && (
                                            <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>{metric.trend}</span>
                                            </div>
                                        )}
                                        {metric.subtitle && (
                                            <div className="text-sm text-gray-500 mt-2">{metric.subtitle}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Revenue Trend Chart */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (₹ in thousands)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="month" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Campaign Performance Bar Chart */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance (Weekly)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={campaignPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="conversions" fill="#3b82f6" />
                                        <Bar dataKey="clicks" fill="#8b5cf6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Charts Row 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Channel Distribution */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RePieChart>
                                        <Pie
                                            data={channelDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value }) => `${name}: ${value}%`}
                                            outerRadius={100}
                                            dataKey="value"
                                        >
                                            {channelDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </RePieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Product Revenue */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Product (₹ in thousands)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={productRevenueData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis type="number" stroke="#9ca3af" />
                                        <YAxis dataKey="product" type="category" stroke="#9ca3af" width={120} />
                                        <Tooltip />
                                        <Bar dataKey="revenue" fill="#10b981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Campaigns Tab */}
                {activeSection === 'campaigns' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Campaign Performance Analytics</h2>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="grid grid-cols-4 gap-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Messages Sent</div>
                                    <div className="text-2xl font-bold text-gray-900">{systemMetrics.campaigns.messagesSent.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Delivery Rate</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {((systemMetrics.campaigns.messagesDelivered / systemMetrics.campaigns.messagesSent) * 100).toFixed(1)}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Avg Conversion</div>
                                    <div className="text-2xl font-bold text-gray-900">{systemMetrics.campaigns.avgConversionRate}%</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Avg ROI</div>
                                    <div className="text-2xl font-bold text-green-600">{systemMetrics.campaigns.avgROI}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Use Cases Tab */}
                {activeSection === 'usecases' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Use Case Performance</h2>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="space-y-4">
                                {useCases.map((useCase) => (
                                    <div key={useCase.id} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm font-medium text-gray-900">{useCase.name}</div>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${useCase.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {useCase.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Leads: </span>
                                                <span className="font-semibold text-gray-900">{useCase.metrics.lead}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">AIP: </span>
                                                <span className="font-semibold text-gray-900">{useCase.metrics.aip}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">COA: </span>
                                                <span className="font-semibold text-gray-900">{useCase.metrics.coa}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Target: </span>
                                                <span className="font-semibold text-green-600">{useCase.metrics.targetAchieved}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* AI Tab */}
                {activeSection === 'ai' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">AI Decision & Insights</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Total AI Decisions', value: systemMetrics.ai.totalDecisions.toLocaleString() },
                                { label: 'Prediction Accuracy', value: `${systemMetrics.ai.predictionAccuracy}%`, color: 'green' },
                                { label: 'AI Recommendations', value: systemMetrics.ai.aiRecommendations },
                                { label: 'Decisions Today', value: systemMetrics.ai.decisionsToday.toLocaleString() }
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-lg border border-gray-200 p-5">
                                    <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                                    <div className={`text-3xl font-bold ${item.color === 'green' ? 'text-green-600' : 'text-gray-900'}`}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Revenue Tab */}
                {activeSection === 'revenue' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Revenue & Financial Performance</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                                <div className="text-3xl font-bold text-green-600">₹{(systemMetrics.revenue.total / 100000).toFixed(1)}L</div>
                                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+{systemMetrics.revenue.growth}%</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="text-sm text-gray-600 mb-1">Total Budget</div>
                                <div className="text-3xl font-bold text-gray-900">₹{(systemMetrics.campaigns.totalBudget / 100000).toFixed(1)}L</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="text-sm text-gray-600 mb-1">Total Spent</div>
                                <div className="text-3xl font-bold text-blue-600">₹{(systemMetrics.campaigns.totalSpent / 100000).toFixed(1)}L</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Governance Tab */}
                {activeSection === 'governance' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Governance & Compliance</h2>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="space-y-4">
                                {[
                                    { label: 'Budget Adherence', value: '92.5%', status: 'good' },
                                    { label: 'No Active Audit Issues', status: 'good' },
                                    { label: 'Pending Approvals', value: '3 campaigns', status: 'warning' }
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between p-4 rounded-lg ${item.status === 'good' ? 'bg-green-50' : 'bg-orange-50'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            {item.status === 'good' ? (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-orange-600" />
                                            )}
                                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                        </div>
                                        {item.value && (
                                            <span className={`text-sm font-semibold ${item.status === 'good' ? 'text-green-600' : 'text-orange-600'
                                                }`}>
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
