import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    LinearProgress,
    Paper
} from '@mui/material';
import {
    TrendingUp,
    GpsFixed,
    CreditCard,
    Campaign,
    AutoAwesome
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    FunnelChart,
    Funnel,
    LabelList
} from 'recharts';

import StatCard from '../../components/shared/StatCard';
import NewCampaignModal from '../../components/modals/NewCampaignModal';

import GuardrailsDisplay from '../../components/dashboard/GuardrailsDisplay';

// Mock Data
const funnelData = [
    { value: 1000000, name: 'Traffic', fill: '#8884d8' },
    { value: 200000, name: 'Leads', fill: '#83a6ed' },
    { value: 50000, name: 'AIP', fill: '#8dd1e1' },
    { value: 15000, name: 'Disbursement', fill: '#82ca9d' },
];

const channelData = [
    { name: 'WhatsApp', ctr: 3.5, cost: 2000 },
    { name: 'SMS', ctr: 0.8, cost: 1500 },
    { name: 'RCS', ctr: 2.8, cost: 1200 },
];

export default function CampaignStrategyDashboard() {
    const [openNewCampaign, setOpenNewCampaign] = useState(false);

    return (
        <Box>
            <NewCampaignModal open={openNewCampaign} onClose={() => setOpenNewCampaign(false)} />

            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                        Command Center
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label="AI Decisioning Active"
                            color="success"
                            size="small"
                            icon={<AutoAwesome />}
                        />
                        <Chip
                            label="Real-time: 15,400 Decisions/hr"
                            variant="outlined"
                            size="small"
                            icon={<TrendingUp />}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined" sx={{ mr: 2 }}>Export Report</Button>
                    <Button variant="contained" onClick={() => setOpenNewCampaign(true)}>New Campaign</Button>
                </Box>
            </Box>

            {/* SECTION 1: Aggregate Metrics */}
            <Typography variant="h5" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
                Aggregate Performance
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard
                        title="CTR (Click Through Rate)"
                        value="3.5%"
                        trend={25}
                        icon={<TrendingUp />}
                        color="primary"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard
                        title="AIP Conversion"
                        value="15.2%"
                        trend={12}
                        icon={<GpsFixed />}
                        color="success"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard
                        title="Cost of Acquisition"
                        value="₹450"
                        trend={-15}
                        icon={<CreditCard />}
                        color="warning"
                        invertTrend
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard
                        title="Active Campaigns"
                        value="12"
                        subtitle="Budget: ₹4.5L / ₹10L Used"
                        icon={<Campaign />}
                        color="info"
                    />
                </Grid>
            </Grid>

            {/* Funnel & Budget */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="600">
                                Conversion Funnel (Live)
                            </Typography>
                            <Box sx={{ height: 300, width: '100%', minWidth: 0, position: 'relative' }}>
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
                                    <FunnelChart>
                                        <Tooltip />
                                        <Funnel
                                            dataKey="value"
                                            data={funnelData}
                                            isAnimationActive
                                        >
                                            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                                        </Funnel>
                                    </FunnelChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="600">
                                Budget Utilization
                            </Typography>
                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <Typography variant="h2" fontWeight="700" color="success.main">
                                        45%
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    of Monthly Budget Used
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={45}
                                    color="success"
                                    sx={{ mt: 2, height: 10, borderRadius: 5 }}
                                />
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Spent: ₹4.5L</Typography>
                                    <Typography variant="body2">Total: ₹10.0L</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Channel Performance */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                        Channel Performance (CTR vs Cost)
                    </Typography>
                    <Box sx={{ height: 300, width: '100%', minWidth: 0, position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
                            <BarChart data={channelData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Bar yAxisId="left" dataKey="ctr" name="CTR %" fill="#8884d8" />
                                <Bar yAxisId="right" dataKey="cost" name="Cost" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
}
