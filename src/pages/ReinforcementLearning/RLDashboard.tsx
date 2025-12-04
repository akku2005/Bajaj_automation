import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    Psychology,
    TrendingUp,
    AutoAwesome,
    Timeline,
    EmojiEvents,
    ShowChart,
} from '@mui/icons-material';
import {
    LineChart,
    Line,
    AreaChart,
    Area,


    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
} from 'recharts';
import { mockRLMetrics, mockUsers } from '../../services/mockData';
import StatCard from '../../components/shared/StatCard';

export default function RLDashboard() {
    const [selectedActionType, setSelectedActionType] = useState('all');

    // Prepare heatmap data
    const segments = ['S1', 'S2', 'S3', 'S4'];
    const actions = ['PL+WA', 'PL+SMS', 'CC+WA', 'GL+RCS', 'BL+WhatsApp'];

    const heatmapData = segments.map(segment => ({
        segment,
        ...Object.fromEntries(actions.map(action => [
            action,
            50 + Math.random() * 50 // Confidence score 50-100
        ]))
    }));

    // Leaderboard data - users with most decisions 
    const leaderboardData = mockUsers
        .slice(0, 10)
        .map(user => ({
            userId: user.userId,
            name: user.name,
            segment: user.segment,
            totalDecisions: Math.floor(Math.random() * 100) + 50,
            successRate: 0.4 + Math.random() * 0.5,
            avgConfidence: 0.7 + Math.random() * 0.3,
        }))
        .sort((a, b) => b.totalDecisions - a.totalDecisions);

    // Scatter plot data - Decisions vs Accuracy
    const scatterData = Array.from({ length: 30 }, (_, i) => ({
        decisions: (i + 1) * 100,
        accuracy: 0.65 + (i * 0.009) + (Math.random() * 0.05 - 0.025),
        actionType: ['PL+WhatsApp', 'CC+SMS', 'GL+RCS'][Math.floor(Math.random() * 3)],
    }));

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Psychology sx={{ fontSize: 40, color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="h4" fontWeight="700">
                        Reinforcement Learning Dashboard
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Thompson Sampling progress, exploration/exploitation metrics, and learning curves
                </Typography>
            </Box>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Decisions"
                        value="7.2M"
                        icon={<Psychology />}
                        color="primary"
                        subtitle="Across all users"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Current Accuracy"
                        value={`${(mockRLMetrics.averageAccuracy * 100).toFixed(0)}%`}
                        icon={<TrendingUp />}
                        color="success"
                        subtitle="+27% since launch"
                        trend={27}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Exploration Rate"
                        value={`${(mockRLMetrics.explorationRate * 100).toFixed(0)}%`}
                        icon={<AutoAwesome />}
                        color="secondary"
                        subtitle="Decreasing as system learns"
                        trend={-15}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Decisions Today"
                        value="125K"
                        icon={<ShowChart />}
                        color="info"
                        subtitle="Real-time optimization"
                    />
                </Grid>
            </Grid>

            {/* Exploration vs Exploitation Over Time */}
            <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Exploration vs Exploitation Trend
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Showing how the system shifts from exploration to exploitation as it learns
                    </Typography>

                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={mockRLMetrics.explorationHistory}>
                            <defs>
                                <linearGradient id="colorExplore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#9c27b0" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExploit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="date" />
                            <YAxis label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
                            <RechartsTooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="explorationRate"
                                stackId="1"
                                stroke="#9c27b0"
                                fill="url(#colorExplore)"
                                name="Exploration"
                            />
                            <Area
                                type="monotone"
                                dataKey="exploitationRate"
                                stackId="1"
                                stroke="#4caf50"
                                fill="url(#colorExploit)"
                                name="Exploitation"
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'secondary.lighter', border: '1px solid', borderColor: 'secondary.light' }}>
                                <Typography variant="h4" fontWeight="700" color="secondary.dark" gutterBottom>
                                    {(mockRLMetrics.explorationRate * 100).toFixed(1)}%
                                </Typography>
                                <Typography variant="body2" color="secondary.dark" fontWeight="600">
                                    Current Exploration Rate
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    System is exploring {mockRLMetrics.explorationRate * mockRLMetrics.decisionsToday} times/day to discover better actions
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
                                <Typography variant="h4" fontWeight="700" color="success.dark" gutterBottom>
                                    {((1 - mockRLMetrics.explorationRate) * 100).toFixed(1)}%
                                </Typography>
                                <Typography variant="body2" color="success.dark" fontWeight="600">
                                    Current Exploitation Rate
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Using learned optimal actions {(1 - mockRLMetrics.explorationRate) * mockRLMetrics.decisionsToday} times/day
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Learning Curve */}
                <Grid item xs={12} lg={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Learning Curve
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Accuracy improvement over time with cumulative decisions
                            </Typography>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={mockRLMetrics.learningCurve}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="week" />
                                    <YAxis
                                        yAxisId="left"
                                        label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }}
                                        domain={[60, 100]}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        label={{ value: 'Decisions (K)', angle: 90, position: 'insideRight' }}
                                    />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="accuracy"
                                        stroke="#1976d2"
                                        strokeWidth={3}
                                        name="Accuracy %"
                                        dot={{ r: 6 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="decisions"
                                        stroke="#4caf50"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Cumulative Decisions (000s)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                                <Typography variant="body2" color="primary.dark" fontWeight="600">
                                    💡 Key Insight
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    System reached 90% accuracy after just 6 weeks and 5.4K decisions - significantly faster than traditional A/B testing which would take 3-6 months
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Decisions vs Accuracy Scatter */}
                <Grid item xs={12} lg={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Decision Quality Distribution
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Relationship between decision volume and prediction accuracy
                            </Typography>

                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis
                                        type="number"
                                        dataKey="decisions"
                                        name="Decisions"
                                        label={{ value: 'Number of Decisions', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="accuracy"
                                        name="Accuracy"
                                        label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}
                                        domain={[0.6, 1]}
                                    />
                                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter
                                        name="Action Pairs"
                                        data={scatterData}
                                        fill="#1976d2"
                                        fillOpacity={0.6}
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>

                            <Box sx={{ mt: 2, p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}>
                                <Typography variant="body2" color="success.dark" fontWeight="600">
                                    ✓ Strong Correlation
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    More decisions = Higher accuracy. Action pairs with 2000+ decisions achieve 92%+ accuracy
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Learning Leaderboard */}
            <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Learning Leaderboard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Users with most decisions (most data for learning)
                            </Typography>
                        </Box>
                        <EmojiEvents sx={{ fontSize: 40, color: 'warning.main' }} />
                    </Box>

                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Rank</strong></TableCell>
                                    <TableCell><strong>User</strong></TableCell>
                                    <TableCell><strong>Segment</strong></TableCell>
                                    <TableCell><strong>Total Decisions</strong></TableCell>
                                    <TableCell><strong>Success Rate</strong></TableCell>
                                    <TableCell><strong>Avg Confidence</strong></TableCell>
                                    <TableCell><strong>Data Quality</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboardData.map((user, index) => (
                                    <TableRow key={user.userId} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                                        <TableCell>
                                            {index < 3 ? (
                                                <Chip
                                                    label={`#${index + 1}`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32',
                                                        color: 'white',
                                                        fontWeight: 700
                                                    }}
                                                />
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    #{index + 1}
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="600">
                                                {user.userId}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {user.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={user.segment.split(' - ')[0]} size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" fontWeight="700" color="primary.main">
                                                {user.totalDecisions}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" fontWeight="600">
                                                    {(user.successRate * 100).toFixed(1)}%
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={user.successRate * 100}
                                                    sx={{ width: 80, height: 4, borderRadius: 1, mt: 0.5 }}
                                                    color={user.successRate > 0.7 ? 'success' : user.successRate > 0.5 ? 'warning' : 'error'}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="600">
                                                {(user.avgConfidence * 100).toFixed(0)}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.totalDecisions > 80 ? 'Excellent' : user.totalDecisions > 60 ? 'Good' : 'Fair'}
                                                size="small"
                                                color={user.totalDecisions > 80 ? 'success' : user.totalDecisions > 60 ? 'primary' : 'default'}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Action Confidence Heatmap */}
            <Card>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Action Confidence Heatmap
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Confidence levels for different action combinations across segments
                    </Typography>

                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Segment</strong></TableCell>
                                    {actions.map(action => (
                                        <TableCell key={action} align="center">
                                            <strong>{action}</strong>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {heatmapData.map(row => (
                                    <TableRow key={row.segment}>
                                        <TableCell>
                                            <Chip label={row.segment} size="small" variant="outlined" />
                                        </TableCell>
                                        {actions.map(action => {
                                            const value = row[action] as number;
                                            const intensity = (value - 50) / 50; // 0 to 1

                                            return (
                                                <TableCell
                                                    key={action}
                                                    align="center"
                                                    sx={{
                                                        bgcolor: `rgba(25, 118, 210, ${intensity * 0.7})`,
                                                        color: intensity > 0.5 ? 'white' : 'inherit',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {value.toFixed(0)}%
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            Low Confidence (50%)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {[0.1, 0.3, 0.5, 0.7, 0.9].map(intensity => (
                                <Box
                                    key={intensity}
                                    sx={{
                                        width: 40,
                                        height: 20,
                                        bgcolor: `rgba(25, 118, 210, ${intensity})`,
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                />
                            ))}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            High Confidence (100%)
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
