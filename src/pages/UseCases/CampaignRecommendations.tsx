import React, { useState } from 'react';
import { ChevronLeft, Send, ThumbsUp, ThumbsDown, Copy, Zap, AlertCircle } from 'lucide-react';

export default function CampaignRecommendations() {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
    const [userQuery, setUserQuery] = useState('');
    const [conversationHistory, setConversationHistory] = useState([
        { role: 'assistant', content: 'I\'ve analyzed your credit card segments and generated 4 AI-powered campaign recommendations. Ask me anything about why these campaigns are suggested or how to optimize them.' }
    ]);

    const recommendations = [
        {
            id: 1,
            recommendationId: 'REC-12345',
            title: 'Premium Credit Card - High CIBIL Acquisition',
            segment: '25% CREDIT',
            channels: ['WhatsApp', 'SMS', 'RCS'],
            expectedOutput: {
                leads: 245,
                conversion: '18.5%',
                revenue: '₹3,82,050',
                cpa: '₹1,560'
            },
            aiReasoning: 'High CIBIL score (750+) customers show 42% higher approval rate for premium credit cards. Historical data shows WhatsApp gets 18% CTR for this segment. SMS follow-up with instant approval messaging increases engagement by 22%.',
            whyThisSegment: 'This segment represents high-value customers with excellent credit history. They qualify for premium cards with high credit limits and generate higher interchange revenue. Low default risk makes them ideal for acquisition.',
            whatToChange: 'Consider highlighting exclusive benefits like lounge access and cashback in first message. A/B test instant approval vs. premium benefits messaging - instant approval typically performs 12% better for high CIBIL segments.',
            schedule: 'Mon-Wed, 10 AM - 2 PM IST',
            aiModel: 'High-Precision Model',
            confidence: 94
        },
        {
            id: 2,
            recommendationId: 'REC-12346',
            title: 'Gold Card Upgrade - Existing Silver Users',
            segment: '10% CURRENT CREDIT',
            channels: ['RCS', 'WhatsApp', 'Push Notification'],
            expectedOutput: {
                leads: 156,
                conversion: '24.2%',
                revenue: '₹2,99,520',
                cpa: '₹1,920'
            },
            aiReasoning: 'Existing Silver cardholders who spend ₹15K+ monthly are 3.2x more likely to upgrade to Gold. RCS rich media showcasing Gold benefits drives 28% higher engagement. Best conversion window: Tuesday-Thursday evenings when users review statements.',
            whyThisSegment: 'These users already trust the brand and have proven spending behavior. Upgrading them increases fee revenue and card usage. They represent the lowest acquisition cost and highest lifetime value for premium cards.',
            whatToChange: 'Use staggered multi-touch approach: Day 1 RCS with benefits comparison, Day 3 WhatsApp with limited-time upgrade offer, Day 5 Push reminder. This sequence typically increases conversion by 15% vs single-touch.',
            schedule: 'Tue-Thu, 6 PM - 9 PM IST',
            aiModel: 'Efficiency Model',
            confidence: 91
        },
        {
            id: 3,
            recommendationId: 'REC-12347',
            title: 'Student Credit Card - College Segment',
            segment: '10% CONTROL CHECK',
            channels: ['SMS', 'WhatsApp', 'Push Notification'],
            expectedOutput: {
                leads: 189,
                conversion: '15.8%',
                revenue: '₹2,39,360',
                cpa: '₹1,264'
            },
            aiReasoning: 'College students (18-24) represent untapped market with high lifetime value potential. Digital-first messaging (WhatsApp, Push) performs 35% better than email for Gen-Z. Back-to-school season (July-Aug) shows peak interest.',
            whyThisSegment: 'This segment has minimal credit card penetration, making it perfect for market expansion. Early card relationships build long-term loyalty. Student cards have lower acquisition cost and create brand advocates.',
            whatToChange: 'Split test messaging: 60% emphasize no-annual-fee + cashback, 40% highlight credit-building benefits. Gen-Z responds better to financial education angle, especially for first credit card.',
            schedule: 'Mon-Wed-Fri, 9 AM - 11 AM IST',
            aiModel: 'High-Precision Model',
            confidence: 87
        },
        {
            id: 4,
            recommendationId: 'REC-12348',
            title: 'Dormant Card Reactivation - High-Value Customers',
            segment: '10% PREVENT CHURN',
            channels: ['WhatsApp', 'SMS', 'RCS'],
            expectedOutput: {
                leads: 78,
                conversion: '31.4%',
                revenue: '₹1,95,920',
                cpa: '₹2,512'
            },
            aiReasoning: 'Dormant cardholders (no txn 90+ days) who previously spent ₹20K+ monthly show 45% reactivation rate with targeted offers. Personalized WhatsApp messages with spend-based rewards drive highest engagement. High-touch approach essential for retention.',
            whyThisSegment: 'These are valuable customers showing churn signals. They already have approved cards and credit history. Reactivation is 5x cheaper than new acquisition. Preventing churn protects existing revenue base.',
            whatToChange: 'Add hyper-personalization: Reference their last transaction category, offer bonus rewards in that category (e.g., "Miss dining rewards? Get 10x points on restaurants"). Personalized offers show 3x higher reactivation vs generic messaging.',
            schedule: 'Tue-Thu, 2 PM - 5 PM IST',
            aiModel: 'Efficiency Model',
            confidence: 89
        }
    ];

    const handleSendMessage = () => {
        if (!userQuery.trim()) return;

        setConversationHistory([
            ...conversationHistory,
            { role: 'user', content: userQuery }
        ]);

        setTimeout(() => {
            const responses = [
                'The Premium Credit Card campaign has the highest confidence score (94%). Based on your audience data, I recommend launching this first. It has the best ROI profile with 245 expected leads and strong 18.5% conversion rate.',
                'For the dormant card reactivation, the personalized approach referencing past spending is crucial. These customers are worth retaining - their lifetime value is 3x higher than new acquisitions.',
                'I suggest running all 4 campaigns simultaneously on different cadences. The Student Card campaign provides valuable test data for identifying which channels work best with Gen-Z customers.',
                'To improve the Student Credit Card campaign, consider partnering with colleges for campus events. Personalized campus-based messaging typically boosts conversion by 12-18% for this demographic.',
                'The staggered multi-touch approach for the Gold Card upgrade (RCS → WhatsApp → Push) typically outperforms single-channel by 15-20%. This segment loves product upgrades when approached with clear benefit comparisons.'
            ];
            setConversationHistory(prev => [...prev, {
                role: 'assistant',
                content: responses[Math.floor(Math.random() * responses.length)]
            }]);
        }, 600);

        setUserQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="px-8 py-8">
                <div className="grid grid-cols-4 gap-8">

                    {/* Left Section - AI Recommendations */}
                    <div className="col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">AI-Generated Campaign Recommendations</h2>
                            <span className="text-sm text-gray-600">{recommendations.length} Recommendations</span>
                        </div>

                        {recommendations.map((rec, index) => (
                            <div
                                key={rec.id}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                            >
                                {/* Recommendation Card Header */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCampaigns.includes(rec.id)}
                                                    onChange={() => setSelectedCampaigns(prev =>
                                                        prev.includes(rec.id) ? prev.filter(c => c !== rec.id) : [...prev, rec.id]
                                                    )}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                                                />
                                                <h3 className="text-base font-bold text-gray-900">{rec.title}</h3>
                                                <span className="text-xs text-gray-500 ml-auto">{rec.recommendationId}</span>
                                            </div>

                                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                                <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded">
                                                    {rec.segment}
                                                </span>
                                                <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded">
                                                    {rec.confidence}% Confidence
                                                </span>
                                                <span className={`text-xs font-semibold px-3 py-1 rounded ${rec.aiModel === 'High-Precision Model'
                                                        ? 'text-purple-700 bg-purple-50'
                                                        : 'text-blue-700 bg-blue-50'
                                                    }`}>
                                                    {rec.aiModel}
                                                </span>
                                            </div>

                                            <div className="flex gap-2 mt-4 flex-wrap">
                                                {rec.channels.map((ch, i) => (
                                                    <span key={i} className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                                        {ch}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expected Output Metrics */}
                                <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold uppercase">Expected Leads</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{rec.expectedOutput.leads}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold uppercase">Conversion</p>
                                        <p className="text-2xl font-bold text-green-600 mt-1">{rec.expectedOutput.conversion}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold uppercase">Revenue</p>
                                        <p className="text-2xl font-bold text-blue-600 mt-1">{rec.expectedOutput.revenue}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold uppercase">CPA</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{rec.expectedOutput.cpa}</p>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedCard === index && (
                                    <div className="border-t border-gray-200 p-6 bg-blue-50 space-y-6">

                                        {/* AI Reasoning */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Zap className="w-5 h-5 text-yellow-500" />
                                                <h4 className="font-bold text-gray-900 text-sm">AI Reasoning</h4>
                                            </div>
                                            <p className="text-sm text-gray-700 bg-white p-4 rounded border-l-4 border-yellow-400">
                                                {rec.aiReasoning}
                                            </p>
                                        </div>

                                        {/* Why This Segment */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <AlertCircle className="w-5 h-5 text-blue-500" />
                                                <h4 className="font-bold text-gray-900 text-sm">Why This Segment?</h4>
                                            </div>
                                            <p className="text-sm text-gray-700 bg-white p-4 rounded border-l-4 border-blue-400">
                                                {rec.whyThisSegment}
                                            </p>
                                        </div>

                                        {/* What to Change */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                                <h4 className="font-bold text-gray-900 text-sm">Suggested Improvements</h4>
                                            </div>
                                            <p className="text-sm text-gray-700 bg-white p-4 rounded border-l-4 border-orange-400">
                                                {rec.whatToChange}
                                            </p>
                                        </div>

                                        {/* Schedule */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-2">Optimal Schedule</h4>
                                            <p className="text-sm text-gray-900 bg-white p-3 rounded">{rec.schedule}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                                                onClick={(e) => e.stopPropagation()}>
                                                <Copy className="w-4 h-4" />
                                                Use This Recommendation
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                                                onClick={(e) => e.stopPropagation()}>
                                                <ThumbsUp className="w-4 h-4" />
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                                                onClick={(e) => e.stopPropagation()}>
                                                <ThumbsDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Section - AI Chat Assistant */}
                    <div className="col-span-1">
                        <div className="sticky top-32 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-96 shadow-sm">

                            {/* Chat Header */}
                            <div className="bg-blue-600 p-4 text-white">
                                <h3 className="font-bold text-sm">Ask AI Assistant</h3>
                                <p className="text-xs text-blue-100 mt-1">Intelligent Campaign Advisor</p>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {conversationHistory.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-xs px-3 py-2 rounded text-sm ${msg.role === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="border-t border-gray-200 p-4 space-y-3 bg-white">
                                <textarea
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Ask why... what to change... should I run..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Ask AI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
