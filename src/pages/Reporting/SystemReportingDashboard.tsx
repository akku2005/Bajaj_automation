import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    IndianRupee,
    Target,
    Zap,
    BarChart3,
    Activity,
    CheckCircle,
    Download,
    RefreshCw,
    AlertCircle,
    Award,
    Calendar,
    Filter,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../../stores/useCaseStore';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

export default function SystemReportingDashboard() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState('Oct 2025');

    // Mock Data for Executive Summary (from Sketch)
    const executiveSummaryData = [
        {
            useCase: "Acquisition",
            campaign: "PL - High Intent",
            sent: 150000,
            delivered: 148500,
            read: 118000,
            clicked: 45000,
            ctr: "30.3%",
            conversion: "2.5%",
            aip: "92%",
            install: "12.5%"
        },
        {
            useCase: "Cross-Sell",
            campaign: "Gold Card Upgrade",
            sent: 80000,
            delivered: 79200,
            read: 65000,
            clicked: 22000,
            ctr: "27.8%",
            conversion: "3.1%",
            aip: "88%",
            install: "8.2%"
        },
        {
            useCase: "Retention",
            campaign: "App Engagement",
            sent: 200000,
            delivered: 198000,
            read: 145000,
            clicked: 58000,
            ctr: "29.2%",
            conversion: "1.8%",
            aip: "85%",
            install: "15.1%"
        },
        {
            useCase: "Activation",
            campaign: "Dormant User Wakeup",
            sent: 120000,
            delivered: 115000,
            read: 45000,
            clicked: 12000,
            ctr: "10.4%",
            conversion: "0.9%",
            aip: "76%",
            install: "4.5%"
        },
        {
            useCase: "Acquisition",
            campaign: "New To Bank (NTB)",
            sent: 95000,
            delivered: 94000,
            read: 72000,
            clicked: 28000,
            ctr: "29.8%",
            conversion: "2.2%",
            aip: "90%",
            install: "10.8%"
        }
    ];

    // Mock Data for Monthly Performance (from Excel)
    const monthlyPerformanceData = [
        { metric: "I2L", oct25: "73%", sep25: "72%", aug25: "79%", jul25: "82%", jun25: "77%", may25: "69%", apr25: "75%", mar25: "77%", feb25: "74%", jan25: "83%", dec24: "79%", nov24: "78%", oct24: "80%", h1Avg: "74.6%", h2Avg: "78.5%", h1Color: "bg-red-100 text-red-700", h2Color: "bg-green-100 text-green-700" },
        { metric: "T2L", oct25: "27%", sep25: "24%", aug25: "24%", jul25: "24%", jun25: "24%", may25: "27%", apr25: "24%", mar25: "25%", feb25: "26%", jan25: "26%", dec24: "25%", nov24: "28%", oct24: "28%", h1Avg: "24.9%", h2Avg: "26.3%", h1Color: "bg-red-100 text-red-700", h2Color: "bg-green-100 text-green-700" },
        { metric: "L2FF", oct25: "74%", sep25: "81%", aug25: "81%", jul25: "78%", jun25: "69%", may25: "67%", apr25: "71%", mar25: "72%", feb25: "71%", jan25: "73%", dec24: "73%", nov24: "73%", oct24: "74%", h1Avg: "74.2%", h2Avg: "72.7%", h1Color: "bg-green-100 text-green-700", h2Color: "bg-red-100 text-red-700" },
        { metric: "FF2AIP", oct25: "3%", sep25: "4%", aug25: "3%", jul25: "3%", jun25: "3%", may25: "7%", apr25: "8%", mar25: "9%", feb25: "8%", jan25: "7%", dec24: "6%", nov24: "6%", oct24: "6%", h1Avg: "4.5%", h2Avg: "7.0%", h1Color: "bg-red-100 text-red-700", h2Color: "bg-green-100 text-green-700" },
        { metric: "L2AIP", oct25: "2%", sep25: "3%", aug25: "3%", jul25: "2%", jun25: "2%", may25: "4%", apr25: "6%", mar25: "6%", feb25: "6%", jan25: "5%", dec24: "4%", nov24: "5%", oct24: "5%", h1Avg: "3.3%", h2Avg: "5.1%", h1Color: "bg-red-100 text-red-700", h2Color: "bg-green-100 text-green-700" },
        { metric: "A2D", oct25: "4%", sep25: "3%", aug25: "3%", jul25: "2%", jun25: "2%", may25: "1%", apr25: "4%", mar25: "4%", feb25: "4%", jan25: "5%", dec24: "5%", nov24: "5%", oct24: "5%", h1Avg: "2.5%", h2Avg: "4.6%", h1Color: "bg-red-100 text-red-700", h2Color: "bg-red-100 text-red-700" },
    ];

    // Chart Data for Visuals
    const trendData = [
        { name: 'Week 1', value: 2400 },
        { name: 'Week 2', value: 1398 },
        { name: 'Week 3', value: 9800 },
        { name: 'Week 4', value: 3908 },
        { name: 'Week 5', value: 4800 },
        { name: 'Week 6', value: 3800 },
        { name: 'Week 7', value: 4300 },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">System Reporting Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive analytics and performance tracking</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Calendar className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none bg-white"
                            >
                                <option value="Oct 2025">Oct 2025</option>
                                <option value="Sep 2025">Sep 2025</option>
                                <option value="Aug 2025">Aug 2025</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition shadow-sm">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-8">

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Sent</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">645,000</h3>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Send className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 flex items-center font-medium"><ArrowUpRight className="w-4 h-4 mr-1" /> 12.5%</span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg. CTR</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">24.8%</h3>
                            </div>
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Activity className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 flex items-center font-medium"><ArrowUpRight className="w-4 h-4 mr-1" /> 2.1%</span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">2.4%</h3>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Target className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-red-600 flex items-center font-medium"><ArrowDownRight className="w-4 h-4 mr-1" /> 0.5%</span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">AIP Accuracy</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">89.5%</h3>
                            </div>
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Zap className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 flex items-center font-medium"><ArrowUpRight className="w-4 h-4 mr-1" /> 1.2%</span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>
                </div>

                {/* Executive Summary Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            Executive Summary
                        </h2>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View Details</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Use Case</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Sent</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivered</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Read</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicked</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Conv.</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">AIP</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Install %</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {executiveSummaryData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.useCase}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.campaign}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{row.sent.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{row.delivered.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{row.read.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{row.clicked.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 text-right">{row.ctr}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 text-right">{row.conversion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium text-right">{row.aip}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">{row.install}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Performance Trends (Excel Data) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Monthly Performance Trends
                        </h2>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-500">
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-500">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border-collapse">
                            <thead className="bg-orange-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200 sticky left-0 bg-orange-100 z-10">Channels</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Oct'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Sep'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Aug'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">July'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">June'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">May'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">April'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">March'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Feb'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Jan'25</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Dec'24</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Nov'24</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200">Oct'24</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-orange-200 bg-orange-200">H1-2025 Avg</th>
                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider bg-orange-200">H2-2024 Avg</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="bg-gray-50">
                                    <td colSpan={16} className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200 sticky left-0 bg-gray-50 z-10">Mobile App Total</td>
                                </tr>
                                {monthlyPerformanceData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 border-r border-gray-200 sticky left-0 bg-white z-10">{row.metric}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.oct25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.sep25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.aug25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.jul25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.jun25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.may25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.apr25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.mar25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.feb25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.jan25}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.dec24}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.nov24}</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">{row.oct24}</td>
                                        <td className={`px-3 py-3 whitespace-nowrap text-sm font-bold text-center border-r border-gray-200 ${row.h1Color}`}>{row.h1Avg}</td>
                                        <td className={`px-3 py-3 whitespace-nowrap text-sm font-bold text-center ${row.h2Color}`}>{row.h2Avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Visual Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic vs Conversion Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Channel Performance Mix</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[
                                { name: 'WhatsApp', value: 85, fill: '#10b981' },
                                { name: 'SMS', value: 65, fill: '#3b82f6' },
                                { name: 'Email', value: 45, fill: '#8b5cf6' },
                                { name: 'Push', value: 35, fill: '#f59e0b' },
                            ]} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fill: '#374151', fontWeight: 500 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
