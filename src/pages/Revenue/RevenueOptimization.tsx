import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    LinearProgress,
    Stack,
    Paper,
    Alert,
    Divider
} from '@mui/material';
import {
    TrendingUp,
    AttachMoney,
    ShowChart,
    AccountBalance,
    CheckCircle,
    MonetizationOn,
    Savings,
    EmojiEvents
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import StatCard from '../../components/shared/StatCard';

export default function RevenueOptimization() {
    // AIP Funnel Data
    const funnelData = [
        { stage: 'Traffic', value: 100, count: '2.5M' },
        { stage: 'Lead', value: 35, count: '875K' },
        { stage: 'AIP', value: 42, count: '367K', improvement: '+200%' },
        { stage: 'Disbursement', value: 28, count: '103K', improvement: '+85%' }
    ];

    // Monthly Revenue Impact
    const revenueData = [
        { month: 'Jan', before: 45, after: 52, saved: 3.5 },
        { month: 'Feb', before: 47, after: 61, saved: 4.2 },
        { month: 'Mar', before: 46, after: 72, saved: 5.8 },
        { month: 'Apr', before: 48, after: 85, saved: 7.1 },
        { month: 'May', before: 49, after: 98, saved: 8.5 },
        { month: 'Jun', before: 50, after: 115, saved: 10.2 }
    ];

    // Partner Performance
    const partnerData = [
        { name: 'Federal Bank', aip: 2850, approval: 94, revenue: 42.5, margin: 18 },
        { name: 'ICICI', aip: 2450, approval: 89, revenue: 38.2, margin: 16 },
        { name: 'HDFC', aip: 2200, approval: 87, revenue: 35.8, margin: 15 },
        { name: 'Kotak', aip: 1950, approval: 91, revenue: 32.1, margin: 17 },
        { name: 'Axis', aip: 1750, approval: 85, revenue: 28.5, margin: 14 }
    ];

    // COA Breakdown
    const coaData = [
        { category: 'Before AI', leadCost: 145, aipCost: 520, total: 665 },
        { category: 'After AI', leadCost: 98, aipCost: 285, total: 383 }
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MonetizationOn sx={{ fontSize: 40, color: 'success.main', mr: 1.5 }} />
                    <Typography variant="h4" fontWeight="700">
                        Revenue Optimization Center
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Track revenue impact, cost savings, and ROI from AI-powered campaign orchestration
                </Typography>
            </Box>

            {/* Top Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Revenue Increase"
                        value="₹115Cr"
                        icon={<MonetizationOn />}
                        color="success"
                        subtitle="This month (June)"
                        trend={130}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="AIP Improvement"
                        value="+200%"
                        icon={<TrendingUp />}
                        color="primary"
                        subtitle="vs control group"
                        trend={85}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Cost Savings"
                        value="₹10.2Cr"
                        icon={<Savings />}
                        color="warning"
                        subtitle="From overlap elimination"
                        trend={42}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="COA Reduction"
                        value="-42%"
                        icon={<AttachMoney />}
                        color="info" subtitle="From ₹665 to ₹383"
                        trend={-42}
                        invertTrend
                    />
                </Grid>
            </Grid>

            {/* Revenue Trend */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Monthly Revenue \u0026 Cost Savings Trend
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Showing revenue growth and cost optimization over 6 months
                    </Typography>

                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9e9e9e" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#9e9e9e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" label={{ value: 'Revenue (₹Cr)', angle: -90, position: 'insideLeft' }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Savings (₹Cr)', angle: 90, position: 'insideRight' }} />
                            <Tooltip />
                            <Legend />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="before"
                                stroke="#9e9e9e"
                                fillOpacity={1}
                                fill="url(#colorBefore)"
                                name="Before AI (₹Cr)"
                                strokeWidth={2}
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="after"
                                stroke="#4caf50"
                                fillOpacity={1}
                                fill="url(#colorAfter)"
                                name="After AI (₹Cr)"
                                strokeWidth={3}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="saved"
                                stroke="#ff9800"
                                strokeWidth={3}
                                name="Cost Savings (₹Cr)"
                                dot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
                                <Typography variant="h4" fontWeight="700" color="success.dark">
                                    +130%
                                </Typography>
                                <Typography variant="body2" color="success.dark" fontWeight="600">
                                    Revenue Growth (Jan → Jun)
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    From ₹45Cr to ₹115Cr monthly
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.light' }}>
                                <Typography variant="h4" fontWeight="700" color="warning.dark">
                                    ₹39Cr
                                </Typography>
                                <Typography variant="body2" color="warning.dark" fontWeight="600">
                                    Total Cost Savings (6 Months)
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    From eliminating overlaps \u0026 optimizing spend
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.light' }}>
                                <Typography variant="h4" fontWeight="700" color="primary.dark">
                                    382%
                                </Typography>
                                <Typography variant="body2" color="primary.dark" fontWeight="600">
                                    ROI on Platform Investment
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Payback period: &lt; 2 months
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* AIP Funnel Optimization */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Lead → AIP → Disbursement Funnel
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                AI optimization significantly improved conversion at each stage
                            </Typography>

                            <Stack spacing={2}>
                                {funnelData.map((stage, index) => (
                                    <Box key={stage.stage}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" fontWeight="600">
                                                {stage.stage} {stage.improvement && (
                                                    <Chip
                                                        label={stage.improvement}
                                                        size="small"
                                                        color="success"
                                                        sx={{ ml: 1, fontWeight: 700 }}
                                                    />
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {stage.count} ({stage.value}%)
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={stage.value}
                                            sx={{
                                                height: 32 - (index * 4),
                                                borderRadius: 2,
                                                bgcolor: 'rgba(0,0,0,0.05)',
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: stage.improvement ? 'success.main' : 'primary.main'
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>

                            <Alert severity="success" icon={<CheckCircle />} sx={{ mt: 3 }}>
                                <Typography variant="body2" fontWeight="600">
                                    AIP conversion improved from 14% to 42% (+200%)
                                </Typography>
                                <Typography variant="caption">
                                    Through intelligent channel, product, and partner matching
                                </Typography>
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Cost of Acquisition (COA) Breakdown
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Comparing costs before and after AI decisioning
                            </Typography>

                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={coaData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="category" />
                                    <YAxis label={{ value: 'Cost (₹)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="leadCost" stackId="a" fill="#1976d2" name="Cost per Lead" />
                                    <Bar dataKey="aipCost" stackId="a" fill="#4caf50" name="Cost per AIP" />
                                </BarChart>
                            </ResponsiveContainer>

                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.light' }}>
                                    <Typography variant="body2" fontWeight="600" color="error.dark">
                                        Before AI: ₹665 total COA
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        ₹145 per lead + ₹520 per AIP
                                    </Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
                                    <Typography variant="body2" fontWeight="600" color="success.dark">
                                        After AI: ₹383 total COA (-42%)
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        ₹98 per lead + ₹285 per AIP
                                    </Typography>
                                </Paper>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Partner Performance */}
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Top 5 Partner Performance
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        AI prioritizes partners with highest approval rates and margins
                    </Typography>

                    <Stack spacing={2}>
                        {partnerData.map((partner, index) => (
                            <Paper
                                key={partner.name}
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderLeft: '4px solid',
                                    borderLeftColor: index === 0 ? 'success.main' : 'primary.light'
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {index === 0 && <EmojiEvents sx={{ color: 'success.main', mr: 1 }} />}
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="600">
                                                    {partner.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Rank #{index + 1}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 2 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            AIP Generated
                                        </Typography>
                                        <Typography variant="body1" fontWeight="700">
                                            {partner.aip.toLocaleString()}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 2 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Approval Rate
                                        </Typography>
                                        <Chip
                                            label={`${partner.approval}%`}
                                            size="small"
                                            color={partner.approval > 90 ? 'success' : 'primary'}
                                            sx={{ fontWeight: 700 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 2 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Revenue
                                        </Typography>
                                        <Typography variant="body1" fontWeight="700" color="success.main">
                                            ₹{partner.revenue}Cr
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                            Margin {partner.margin}%
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={partner.margin * 5}
                                            sx={{ height: 8, borderRadius: 1 }}
                                            color="success"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>

                    <Alert severity="info" sx={{ mt: 3 }}>
                        <Typography variant="body2">
                            <strong>AI Partner Matching:</strong> System automatically routes users to partners with highest
                            approval probability based on CIBIL score, location, product type, and historical rejection data.
                            Federal Bank shows 94% approval rate with 18% margin - prioritized for S1 segment users.
                        </Typography>
                    </Alert>
                </CardContent>
            </Card>
        </Box>
    );
}
