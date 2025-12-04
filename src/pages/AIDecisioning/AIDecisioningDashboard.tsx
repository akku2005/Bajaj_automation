import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    LinearProgress,
    Stack,
    Paper,
    Tab,
    Tabs,
    Alert,
    TextField
} from '@mui/material';
import {
    Psychology,
    TrendingUp,
    EmojiEvents,
    AutoAwesome
} from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/shared/StatCard';

interface AffinityScore {
    dimension: string;
    score: number;
    trend: 'up' | 'down' | 'stable';
    impact: string;
}

export default function AIDecisioningDashboard() {
    const [tabValue, setTabValue] = useState(0);
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Function to handle AI chat
    const handleAskAI = () => {
        if (!chatInput.trim()) return;

        setIsProcessing(true);
        setChatResponse(null);

        // Simulate AI processing
        setTimeout(() => {
            const query = chatInput.toLowerCase();
            let response = '';

            // Pattern matching for different queries
            if (query.includes('uplift') || query.includes('200%') || query.includes('driving')) {
                response = '🎯 The 200% uplift is driven by three key factors:\n\n1. **Channel Optimization**: AI routes 65% of users to WhatsApp, which has 2.8x higher engagement than SMS\n2. **Partner Matching**: Federal Bank (94% approval rate) is prioritized for high-CIBIL users\n3. **Timing**: Messages sent during 10-11 AM slot show 35% higher CTR\n\nResult: 48% AIP conversion vs 16% for manual campaigns!';
            } else if (query.includes('channel') || query.includes('whatsapp') || query.includes('sms')) {
                response = '📱 Channel Performance Analysis:\n\n**WhatsApp** (Best for S1 segment):\n• AIP Conversion: 45%\n• Cost per AIP: ₹285\n• User Preference: 80% prefer WA\n• Best for: High-CIBIL, metro users\n\n**SMS** (Cost-effective for Tier 2):\n• AIP Conversion: 28%\n• Cost per AIP: ₹320\n• Best for: Tier 2 cities, budget campaigns\n\n**Recommendation**: Allocate 65% budget to WhatsApp for S1 segment.';
            } else if (query.includes('time') || query.includes('when') || query.includes('timing')) {
                response = '⏰ Optimal Timing Analysis:\n\n**Peak Engagement**: 10-11 AM\n• 35% higher CTR\n• 28% better AIP conversion\n• Users most active on mobile\n\n**Secondary Window**: 7-8 PM\n• 22% higher CTR\n• Good for working professionals\n\n**Avoid**: 12-2 PM (lunch), after 10 PM\n\n💡 Tip: AI automatically schedules based on individual user behavior patterns!';
            } else if (query.includes('partner') || query.includes('bank') || query.includes('approval')) {
                response = '🏦 Top Partner Performance:\n\n**#1 Federal Bank**:\n• Approval Rate: 94%\n• Margin: 18%\n• Best for: CIBIL > 750\n• Avg Disbursal Time: 2.3 days\n\n**#2 ICICI Bank**:\n• Approval Rate: 89%\n• Margin: 16%\n• Best for: Salaried, metro\n\n**#3 HDFC Bank**:\n• Approval Rate: 86%\n• Margin: 15%\n\nRecommendation: Route 60% of S1 segment to Federal Bank.';
            } else if (query.includes('budget') || query.includes('allocate') || query.includes('spend')) {
                response = '💰 Budget Allocation Recommendation:\n\n**Current Split**:\n• WhatsApp: ₹570K/month (43%)\n• SMS: ₹330K/month (25%)\n• RCS: ₹420K/month (32%)\n\n**AI Recommended**:\n• WhatsApp: ₹780K (+37%) - Highest ROI\n• SMS: ₹250K (-24%) - Cost optimization\n• RCS: ₹280K (-33%) - Focus on metro only\n\n**Expected Impact**:\n• +₹8.2Cr revenue\n• +45 AIP conversions/day\n• 382% ROI improvement';
            } else if (query.includes('funnel') || query.includes('conversion')) {
                response = '📊 Conversion Funnel Breakdown:\n\n**Traffic**: 2.5M (100%)\n↓ 35% convert to leads\n**Leads**: 875K\n↓ 42% get AIP (AI: 48% vs Manual: 16%)\n**AIP**: 367K\n↓ 28% get disbursed\n**Disbursement**: 103K\n\n**Key Bottlenecks**:\n1. Lead→AIP: AI solving with affinity scoring\n2. AIP→Disbursement: Partner optimization needed\n\n**Improvement Opportunity**: +₹25Cr if we increase AIP→Disbursement to 35%';
            } else {
                response = `💡 I can help you with:\n\n• Performance analysis ("What's driving the 200% uplift?")\n• Channel optimization ("Which channel works best?")\n• Timing recommendations ("Best time to send messages?")\n• Partner insights ("Which partner has highest approval?")\n• Budget allocation ("How much should I allocate to WhatsApp?")\n• Funnel analysis ("Show conversion funnel breakdown")\n\nWhat would you like to know about?`;
            }

            setChatResponse(response);
            setIsProcessing(false);
            setChatInput(''); // Clear input
        }, 1200);
    };

    const handleSuggestionClick = (suggestion: string) => {
        // Remove emoji from suggestion
        const cleanSuggestion = suggestion.replace(/^[^\w\s]+\s*/, '');
        setChatInput(cleanSuggestion);
        // Auto-submit after a short delay
        setTimeout(() => {
            setChatInput(cleanSuggestion);
            handleAskAI();
        }, 100);
    };

    // Performance trending data
    const performanceData = [
        { month: 'Jan', aiDecisioning: 18, control: 12, uplift: 50 },
        { month: 'Feb', aiDecisioning: 22, control: 13, uplift: 69 },
        { month: 'Mar', aiDecisioning: 28, control: 14, uplift: 100 },
        { month: 'Apr', aiDecisioning: 35, control: 15, uplift: 133 },
        { month: 'May', aiDecisioning: 42, control: 15, uplift: 180 },
        { month: 'Jun', aiDecisioning: 48, control: 16, uplift: 200 }
    ];

    // Channel affinity distribution
    const channelAffinityData = [
        { channel: 'WhatsApp', value: 45, color: '#25D366' },
        { channel: 'SMS', value: 30, color: '#1976d2' },
        { channel: 'RCS', value: 25, color: '#ea4335' }
    ];

    // Affinity scores by dimension
    const affinityScores: AffinityScore[] = [
        {
            dimension: 'Product Affinity: Personal Loan',
            score: 89,
            trend: 'up',
            impact: 'Highest conversion propensity for PL among S1 segment'
        },
        {
            dimension: 'Partner Affinity: Federal Bank',
            score: 92,
            trend: 'up',
            impact: '94% approval rate, highest margin partner'
        },
        {
            dimension: 'Channel Affinity: WhatsApp',
            score: 87,
            trend: 'stable',
            impact: '2.8x higher engagement vs SMS for high-value users'
        },
        {
            dimension: 'Time Optimization',
            score: 84,
            trend: 'up',
            impact: 'Send between 10-11 AM for 35% uplift  in CTR'
        }
    ];

    // Learning metrics
    const learningMetrics = [
        { week: 'Week 1', accuracy: 65, decisions: 1200 },
        { week: 'Week 2', accuracy: 72, decisions: 2400 },
        { week: 'Week 3', accuracy: 78, decisions: 3600 },
        { week: 'Week 4', accuracy: 85, decisions: 4800 },
        { week: 'Week 5', accuracy: 89, decisions: 6000 },
        { week: 'Week 6', accuracy: 92, decisions: 7200 }
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Psychology sx={{ fontSize: 40, color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="h4" fontWeight="700">
                        AI Decisioning Engine
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Self-learning AI that optimizes channel, product, and partner selection for each user
                </Typography>
            </Box>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="AI Uplift vs Control"
                        value="+200%"
                        icon={<TrendingUp />}
                        color="success"
                        subtitle="AIP conversion improvement"
                        trend={45}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Decision Accuracy"
                        value="92%"
                        icon={<Psychology />}
                        color="primary"
                        subtitle="Improving weekly"
                        trend={8}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Daily Decisions"
                        value="125K"
                        icon={<AutoAwesome />}
                        color="info"
                        subtitle="Real-time recommendations"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Cost Savings"
                        value="₹1.2Cr"
                        icon={<EmojiEvents />}
                        color="warning"
                        subtitle="From intelligent targeting"
                        trend={32}
                    />
                </Grid>
            </Grid>

            {/* Tabs for different views */}
            <Card sx={{ mb: 4 }}>
                <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Performance Trending" />
                    <Tab label="Affinity Insights" />
                    <Tab label="Learning Metrics" />
                </Tabs>

                <CardContent sx={{ p: 3 }}>
                    {/* Tab 1: Performance Trending */}
                    {tabValue === 0 && (
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                AI Decisioning vs Control Group Performance
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Showing continuous improvement in AIP conversion rate over 6 months
                            </Typography>

                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorControl" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef5350" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ef5350" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="month" />
                                    <YAxis label={{ value: 'AIP Conversion %', angle: -90, position: 'insideLeft' }} />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="aiDecisioning"
                                        stroke="#1976d2"
                                        fillOpacity={1}
                                        fill="url(#colorAI)"
                                        name="AI Decisioning"
                                        strokeWidth={3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="control"
                                        stroke="#ef5350"
                                        fillOpacity={1}
                                        fill="url(#colorControl)"
                                        name="Control (Manual)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>

                            <Grid container spacing={3} sx={{ mt: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
                                        <Typography variant="h3" fontWeight="700" color="success.dark" gutterBottom>
                                            +200%
                                        </Typography>
                                        <Typography variant="body2" color="success.dark" fontWeight="600">
                                            Uplift in June vs Control Group
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            AI achieved 48% AIP conversion vs 16% for manual campaigns
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.light' }}>
                                        <Typography variant="h3" fontWeight="700" color="primary.dark" gutterBottom>
                                            6 Months
                                        </Typography>
                                        <Typography variant="body2" color="primary.dark" fontWeight="600">
                                            of Continuous Learning
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            System improves automatically with each campaign interaction
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* Tab 2: Affinity Insights */}
                    {tabValue === 1 && (
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Multi-Dimensional Affinity Scoring
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                AI analyzes product, partner, and channel preferences for each user
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                        Channel Affinity Distribution
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <PieChart>
                                            <Pie
                                                data={channelAffinityData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, value }) => `${name}: ${value}%`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="channel"
                                            >
                                                {channelAffinityData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                        Affinity Scores by Dimension
                                    </Typography>
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        {affinityScores.map((score, index) => (
                                            <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="body2" fontWeight="600">
                                                        {score.dimension}
                                                    </Typography>
                                                    <Chip
                                                        label={`${score.score}%`}
                                                        size="small"
                                                        color={score.score > 85 ? 'success' : 'primary'}
                                                        sx={{ fontWeight: 700 }}
                                                    />
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={score.score}
                                                    sx={{ height: 8, borderRadius: 1, mb: 1 }}
                                                    color={score.score > 85 ? 'success' : 'primary'}
                                                />
                                                <Typography variant="caption" color="text.secondary">
                                                    💡 {score.impact}
                                                </Typography>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* Tab 3: Learning Metrics */}
                    {tabValue === 2 && (
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Continuous Learning Progress
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                System accuracy improves automatically with each campaign interaction
                            </Typography>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={learningMetrics}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="week" />
                                    <YAxis yAxisId="left" label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Decisions Made', angle: 90, position: 'insideRight' }} />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="accuracy"
                                        stroke="#1976d2"
                                        strokeWidth={3}
                                        name="Prediction Accuracy %"
                                        dot={{ r: 6 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="decisions"
                                        stroke="#4caf50"
                                        strokeWidth={2}
                                        name="Decisions Made (000s)"
                                        strokeDasharray="5 5"
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.lighter' }}>
                                        <Typography variant="h4" fontWeight="700" color="primary.dark">
                                            92%
                                        </Typography>
                                        <Typography variant="body2" color="primary.dark" fontWeight="600">
                                            Current Accuracy
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            +27% improvement in 6 weeks
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'success.lighter' }}>
                                        <Typography variant="h4" fontWeight="700" color="success.dark">
                                            7.2M
                                        </Typography>
                                        <Typography variant="body2" color="success.dark" fontWeight="600">
                                            Total Decisions
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Across all campaigns
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.lighter' }}>
                                        <Typography variant="h4" fontWeight="700" color="warning.dark">
                                            6 wks
                                        </Typography>
                                        <Typography variant="body2" color="warning.dark" fontWeight="600">
                                            To Reach 90%+ Accuracy
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Faster than manual A/B testing
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* AI Analytics Chat Input - Embedded in Page */}
            <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Psychology sx={{ fontSize: 32 }} />
                        <Box>
                            <Typography variant="h6" fontWeight="700">
                                Ask AI for Analytics Insights
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Get instant answers about performance and optimizations
                            </Typography>
                        </Box>
                    </Box>

                    {/* Suggestion Chips */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                        {[
                            '🎯 What\'s driving the 200% uplift?',
                            '📱 Which channel works best for S1 segment?',
                            '⏰ Best time to send messages?',
                            '🏦 Which partner has highest approval rate?',
                            '💰 How much budget should I allocate to WhatsApp?',
                            '📊 Show conversion funnel breakdown'
                        ].map((suggestion, idx) => (
                            <Chip
                                key={idx}
                                label={suggestion}
                                onClick={() => handleSuggestionClick(suggestion)}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.2s'
                                    }
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Chat Input */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 0.5,
                            display: 'flex',
                            gap: 1,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <TextField
                            fullWidth
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isProcessing) {
                                    handleAskAI();
                                }
                            }}
                            placeholder="Ask me anything: 'Why is WhatsApp performing better?' or 'Suggest budget optimizations'..."
                            variant="standard"
                            disabled={isProcessing}
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    color: 'white',
                                    px: 2,
                                    py: 1,
                                    fontSize: '1rem',
                                    '& ::placeholder': {
                                        color: 'rgba(255,255,255,0.7)',
                                        opacity: 1
                                    }
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={isProcessing ? <AutoAwesome className="spin" /> : <AutoAwesome />}
                            onClick={handleAskAI}
                            disabled={!chatInput.trim() || isProcessing}
                            sx={{
                                bgcolor: 'white',
                                color: '#667eea',
                                fontWeight: 700,
                                minWidth: 140,
                                px: 3,
                                borderRadius: 1.5,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.95)',
                                    transform: 'scale(1.02)',
                                    transition: 'all 0.2s'
                                },
                                '&:disabled': {
                                    bgcolor: 'rgba(255,255,255,0.5)',
                                    color: 'rgba(103, 126, 234, 0.5)'
                                }
                            }}
                        >
                            {isProcessing ? 'Thinking...' : 'Ask AI'}
                        </Button>
                    </Paper>

                    {/* AI Response */}
                    {chatResponse && (
                        <Alert
                            severity="success"
                            icon={<Psychology />}
                            sx={{
                                mt: 2.5,
                                bgcolor: 'rgba(255,255,255,0.15)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                '& .MuiAlert-icon': { color: 'white' },
                                whiteSpace: 'pre-line'
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {chatResponse}
                            </Typography>
                        </Alert>
                    )}

                    {/* Quick Insights Preview */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                                💡 Quick Insights Based on Current Data:
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography variant="h5" fontWeight="700">WhatsApp</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Best Channel (45% users)</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography variant="h5" fontWeight="700">10-11 AM</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Peak Engagement Time</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography variant="h5" fontWeight="700">Federal</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Top Partner (94% approval)</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography variant="h5" fontWeight="700">48%</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>AI AIP Conversion Rate</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
