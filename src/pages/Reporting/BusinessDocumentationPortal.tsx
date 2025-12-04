import React, { useState } from 'react';
import { Download, RefreshCw, TrendingUp, IndianRupee, Target, Zap, CheckCircle, Activity } from 'lucide-react';

export default function BusinessDocumentationPortal() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'current', label: 'Current State' },
        { id: 'future', label: 'Future State' },
        { id: 'roi', label: 'ROI & Value' },
        { id: 'roadmap', label: 'Roadmap' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Business Reporting</h1>
                        <p className="text-sm text-gray-600">AI-Powered Campaign Transformation</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 flex items-center gap-1">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Simple Tabs */}
                <div className="flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded text-sm font-medium transition ${activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 max-w-7xl mx-auto">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'current' && <CurrentStateTab />}
                {activeTab === 'future' && <FutureStateTab />}
                {activeTab === 'roi' && <ROITab />}
                {activeTab === 'roadmap' && <RoadmapTab />}
            </div>
        </div>
    );
}

// Overview Tab
function OverviewTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Program Overview</h2>
                <p className="text-gray-600">Transform Bajaj Markets from rule-based CRM to AI-powered decisioning platform</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">AIP Uplift</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">+15%</div>
                    <p className="text-sm text-gray-500 mt-1">Increase in applications</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-600">COA Reduction</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">-12%</div>
                    <p className="text-sm text-gray-500 mt-1">Lower acquisition cost</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-600">Disbursement Growth</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">+25%</div>
                    <p className="text-sm text-gray-500 mt-1">Increase in loans</p>
                </div>
            </div>

            {/* Program Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Program Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 font-medium text-gray-900">6 months</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Phases:</span>
                        <span className="ml-2 font-medium text-gray-900">4 Sprints</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Sprint 2 In Progress</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Total Value:</span>
                        <span className="ml-2 font-medium text-green-600">₹1.48 Cr</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Current State Tab
function CurrentStateTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Current State Analysis</h2>
                <p className="text-gray-600">As-is funnel and key challenges</p>
            </div>

            {/* Funnel */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
                <div className="space-y-3">
                    {[
                        { stage: 'Traffic', count: '1,000,000', percent: 100 },
                        { stage: 'Leads', count: '125,000', percent: 12.5 },
                        { stage: 'AIP', count: '31,250', percent: 3.1 },
                        { stage: 'Disbursement', count: '15,625', percent: 1.6 }
                    ].map((item) => (
                        <div key={item.stage}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                                <span className="text-sm text-gray-600">{item.count} ({item.percent}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${item.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Key Challenges</h3>
                <div className="space-y-3">
                    {[
                        { title: 'Manual Campaign Planning', impact: '50+ hours/week' },
                        { title: 'No Partner Affinity', impact: '23% lead leakage' },
                        { title: 'Limited Segmentation', impact: 'Generic messaging' },
                        { title: 'Reactive Governance', impact: 'Compliance risk' }
                    ].map((challenge, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-900">{challenge.title}</span>
                            <span className="text-sm text-red-600">{challenge.impact}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Future State Tab
function FutureStateTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Future State with AI</h2>
                <p className="text-gray-600">AI-powered decisioning capabilities</p>
            </div>

            {/* AI Layers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { name: 'Intelligence Layer', desc: 'AI decision engine', icon: Zap },
                    { name: 'Governance Layer', desc: 'Automated compliance', icon: CheckCircle },
                    { name: 'Orchestration', desc: 'Self-optimizing campaigns', icon: Activity }
                ].map((layer) => {
                    const Icon = layer.icon;
                    return (
                        <div key={layer.name} className="bg-white rounded-lg border border-gray-200 p-5">
                            <Icon className="w-6 h-6 text-purple-600 mb-3" />
                            <h4 className="font-semibold text-gray-900 mb-1">{layer.name}</h4>
                            <p className="text-sm text-gray-600">{layer.desc}</p>
                        </div>
                    );
                })}
            </div>

            {/* Expected Improvements */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Expected Improvements</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-600 mb-1">Automation Coverage</div>
                        <div className="text-2xl font-bold text-gray-900">80%</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-1">AI Accuracy</div>
                        <div className="text-2xl font-bold text-gray-900">89%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ROI Tab
function ROITab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">ROI & Value Framework</h2>
                <p className="text-gray-600">Expected business impact</p>
            </div>

            {/* Total Value */}
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                <div className="text-sm font-medium text-green-700 mb-1">Total Program Value</div>
                <div className="text-4xl font-bold text-green-900">₹1.48 Cr</div>
                <p className="text-sm text-green-700 mt-1">12-month projection</p>
            </div>

            {/* Value Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: 'Cost Savings', value: '₹50L', desc: 'Automation efficiency' },
                    { name: 'Revenue Growth', value: '₹97.5L', desc: 'Higher conversions' },
                    { name: 'Efficiency Gains', value: '₹25L', desc: 'Faster processing' },
                    { name: 'Risk Reduction', value: '₹15L', desc: 'Better compliance' }
                ].map((item) => (
                    <div key={item.name} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="text-sm text-gray-600 mb-1">{item.name}</div>
                        <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Roadmap Tab
function RoadmapTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Implementation Roadmap</h2>
                <p className="text-gray-600">4-sprint delivery plan</p>
            </div>

            {/* Sprint Timeline */}
            <div className="space-y-3">
                {[
                    { name: 'S1: Foundation', duration: '6 weeks', status: 'completed', color: 'green' },
                    { name: 'S2: Intelligence', duration: '6 weeks', status: 'in-progress', color: 'blue' },
                    { name: 'S3: Predictive Segmentation', duration: '8 weeks', status: 'planned', color: 'gray' },
                    { name: 'S4: Agentic Automation', duration: '6 weeks', status: 'planned', color: 'gray' }
                ].map((sprint) => (
                    <div key={sprint.name} className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900">{sprint.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{sprint.duration}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${sprint.color === 'green' ? 'bg-green-100 text-green-700' :
                                    sprint.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {sprint.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
