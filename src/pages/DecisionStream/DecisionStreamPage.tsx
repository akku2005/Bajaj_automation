import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton,
    Tooltip,
    Avatar,
    Badge,
    Alert,
} from '@mui/material';
import {
    Stream,
    FilterList,
    TrendingUp,
    Psychology,
    AutoAwesome,
    CheckCircle,
    Schedule,
    Info,
    Refresh,
    Pause,
    PlayArrow,
} from '@mui/icons-material';
import { getDecisionStream, getLiveDecisionUpdate, Decision, mockUsers, getUserById } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

export default function DecisionStreamPage() {
    const navigate = useNavigate();
    const [decisions, setDecisions] = useState<Decision[]>(getDecisionStream({ limit: 50 }));
    const [isLive, setIsLive] = useState(true);
    const [filters, setFilters] = useState({
        segment: '',
        channel: '',
        product: '',
    });

    // Stats
    const totalDecisions = decisions.length;
    const avgConfidence = decisions.reduce((sum, d) => sum + d.confidence, 0) / totalDecisions || 0;
    const explorationRate = (decisions.filter(d => d.exploration).length / totalDecisions) * 100 || 0;
    const conversionRate = (decisions.filter(d => d.outcome === 'converted').length / totalDecisions) * 100 || 0;

    // Channel breakdown
    const channelBreakdown = decisions.reduce((acc, d) => {
        acc[d.channel] = (acc[d.channel] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Simulate live updates
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            const newDecision = getLiveDecisionUpdate();
            setDecisions(prev => [newDecision, ...prev].slice(0, 100));
        }, 3000); // New decision every 3 seconds

        return () => clearInterval(interval);
    }, [isLive]);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const filtered = getDecisionStream({
            limit: 100,
            segment: newFilters.segment || undefined,
            channel: newFilters.channel || undefined,
            product: newFilters.product || undefined,
        });
        setDecisions(filtered);
    };

    const handleDecisionClick = (decision: Decision) => {
        navigate(`/users/${decision.userId}`);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Stream sx={{ fontSize: 40, color: 'primary.main', mr: 1.5 }} />
                        <Box>
                            <Typography variant="h4" fontWeight="700">
                                Live Decision Stream
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Real-time AI decisions being made for individual users
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Tooltip title={isLive ? 'Pause Stream' : 'Resume Stream'}>
                            <IconButton
                                onClick={() => setIsLive(!isLive)}
                                color={isLive ? 'error' : 'success'}
                                sx={{ bgcolor: isLive ? 'error.lighter' : 'success.lighter' }}
                            >
                                {isLive ? <Pause /> : <PlayArrow />}
                            </IconButton>
                        </Tooltip>
                        <Button
                            variant="outlined"
                            startIcon={<Refresh />}
                            onClick={() => setDecisions(getDecisionStream({ limit: 50 }))}
                        >
                            Refresh
                        </Button>
                    </Box>
                </Box>

                {isLive && (
                    <Alert severity="success" icon={<AutoAwesome className="pulse" />} sx={{ mt: 2 }}>
                        <strong>Live Mode Active</strong> - Streaming new decisions every few seconds
                    </Alert>
                )}
            </Box>

            <Grid container spacing={3}>
                {/* Left Side - Decision Feed */}
                <Grid item xs={12} lg={8}>
                    {/* Filters */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <FilterList color="primary" />
                                <Typography variant="subtitle1" fontWeight="700">
                                    Filters
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Segment</InputLabel>
                                        <Select
                                            value={filters.segment}
                                            label="Segment"
                                            onChange={(e) => handleFilterChange('segment', e.target.value)}
                                        >
                                            <MenuItem value="">All Segments</MenuItem>
                                            <MenuItem value="S1 - High CIBIL">S1 - High CIBIL</MenuItem>
                                            <MenuItem value="S2 - Metro Cities">S2 - Metro Cities</MenuItem>
                                            <MenuItem value="S3 - Tier 2 Cities">S3 - Tier 2 Cities</MenuItem>
                                            <MenuItem value="S4 - New Users">S4 - New Users</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Channel</InputLabel>
                                        <Select
                                            value={filters.channel}
                                            label="Channel"
                                            onChange={(e) => handleFilterChange('channel', e.target.value)}
                                        >
                                            <MenuItem value="">All Channels</MenuItem>
                                            <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                                            <MenuItem value="SMS">SMS</MenuItem>
                                            <MenuItem value="RCS">RCS</MenuItem>
                                            <MenuItem value="Push">Push</MenuItem>
                                            <MenuItem value="Email">Email</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Product</InputLabel>
                                        <Select
                                            value={filters.product}
                                            label="Product"
                                            onChange={(e) => handleFilterChange('product', e.target.value)}
                                        >
                                            <MenuItem value="">All Products</MenuItem>
                                            <MenuItem value="PL">Personal Loan</MenuItem>
                                            <MenuItem value="CC">Credit Card</MenuItem>
                                            <MenuItem value="GL">Gold Loan</MenuItem>
                                            <MenuItem value="HL">Home Loan</MenuItem>
                                            <MenuItem value="BL">Business Loan</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Decision Feed */}
                    <Box sx={{ maxHeight: '800px', overflowY: 'auto', pr: 1 }}>
                        <Stack spacing={2}>
                            {decisions.map((decision, index) => {
                                const user = getUserById(decision.userId);

                                return (
                                    <Card
                                        key={`${decision.decisionId}-${index}`}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 4,
                                            },
                                            border: decision.exploration ? '2px solid' : '1px solid',
                                            borderColor: decision.exploration ? 'secondary.main' : 'divider',
                                            bgcolor: decision.exploration ? 'secondary.lighter' : 'white',
                                        }}
                                        onClick={() => handleDecisionClick(decision)}
                                    >
                                        <CardContent sx={{ p: 2.5 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                        {user?.name?.[0] || 'U'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight="700">
                                                            {decision.userId}
                                                        </Typography>
                                                        <Chip label={user?.segment || 'Unknown'} size="small" variant="outlined" />
                                                    </Box>
                                                </Box>

                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(decision.timestamp).toLocaleTimeString()}
                                                    </Typography>
                                                    {index < 5 && (
                                                        <Chip label="NEW" size="small" color="success" sx={{ ml: 1 }} />
                                                    )}
                                                </Box>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            Offer
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="700">
                                                            {decision.offer}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            ₹{(decision.offerAmount / 100000).toFixed(1)}L
                                                        </Typography>
                                                    </Paper>
                                                </Grid>

                                                <Grid item xs={6} sm={3}>
                                                    <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            Channel
                                                        </Typography>
                                                        <Chip label={decision.channel} size="small" color="primary" />
                                                    </Paper>
                                                </Grid>

                                                <Grid item xs={6} sm={3}>
                                                    <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            Partner
                                                        </Typography>
                                                        <Chip label={decision.partner} size="small" />
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Tooltip title="Decision Score">
                                                        <Box sx={{ textAlign: 'center' }}>
                                                            <Typography variant="h6" fontWeight="700" color="primary.main">
                                                                {(decision.score * 100).toFixed(0)}%
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Score
                                                            </Typography>
                                                        </Box>
                                                    </Tooltip>

                                                    <Tooltip title="Model Confidence">
                                                        <Box sx={{ textAlign: 'center' }}>
                                                            <Typography variant="h6" fontWeight="700" color="success.main">
                                                                {(decision.confidence * 100).toFixed(0)}%
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Confidence
                                                            </Typography>
                                                        </Box>
                                                    </Tooltip>
                                                </Box>

                                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                    <Chip
                                                        label={decision.exploration ? 'Explore' : 'Exploit'}
                                                        size="small"
                                                        color={decision.exploration ? 'secondary' : 'success'}
                                                        icon={decision.exploration ? <AutoAwesome /> : <TrendingUp />}
                                                    />

                                                    {decision.outcome === 'converted' && (
                                                        <Chip label="Converted" size="small" color="success" icon={<CheckCircle />} />
                                                    )}
                                                    {decision.outcome === 'pending' && (
                                                        <Chip label="Pending" size="small" color="warning" icon={<Schedule />} />
                                                    )}
                                                    {decision.outcome === 'ignored' && (
                                                        <Chip label="Ignored" size="small" variant="outlined" />
                                                    )}
                                                </Box>
                                            </Box>

                                            {decision.reasoning && (
                                                <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                    <Typography variant="caption" color="text.secondary" sx={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>
                                                        💡 {decision.reasoning}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>
                </Grid>

                {/* Right Side - Stats Sidebar */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={3} sx={{ position: 'sticky', top: 20 }}>
                        {/* Real-time Stats */}
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Psychology color="primary" />
                                    <Typography variant="subtitle1" fontWeight="700">
                                        Real-time Statistics
                                    </Typography>
                                </Box>

                                <Stack spacing={2.5}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Decisions in Feed
                                        </Typography>
                                        <Typography variant="h4" fontWeight="700" color="primary.main">
                                            {totalDecisions}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Avg Confidence
                                        </Typography>
                                        <Typography variant="h4" fontWeight="700" color="success.main">
                                            {(avgConfidence * 100).toFixed(1)}%
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Exploration Rate
                                        </Typography>
                                        <Typography variant="h4" fontWeight="700" color="secondary.main">
                                            {explorationRate.toFixed(1)}%
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {decisions.filter(d => d.exploration).length} exploring, {decisions.filter(d => !d.exploration).length} exploiting
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Conversion Rate
                                        </Typography>
                                        <Typography variant="h4" fontWeight="700" color="warning.main">
                                            {conversionRate.toFixed(1)}%
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Channel Distribution */}
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                                    Top Channels Today
                                </Typography>

                                <Stack spacing={1.5} sx={{ mt: 2 }}>
                                    {Object.entries(channelBreakdown)
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 5)
                                        .map(([channel, count], index) => (
                                            <Box key={channel}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                                    <Typography variant="body2" fontWeight="600">
                                                        {index + 1}. {channel}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {count} ({((count / totalDecisions) * 100).toFixed(0)}%)
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                                                    <Box sx={{
                                                        width: `${(count / totalDecisions) * 100}%`,
                                                        height: '100%',
                                                        bgcolor: index === 0 ? 'success.main' : index === 1 ? 'primary.main' : 'secondary.main',
                                                        transition: 'width 0.3s'
                                                    }} />
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Recent Outcomes */}
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                                    Recent Outcomes
                                </Typography>

                                <Stack spacing={1} sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CheckCircle color="success" sx={{ fontSize: 20 }} />
                                            <Typography variant="body2">Converted</Typography>
                                        </Box>
                                        <Chip
                                            label={decisions.filter(d => d.outcome === 'converted').length}
                                            size="small"
                                            color="success"
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Schedule color="warning" sx={{ fontSize: 20 }} />
                                            <Typography variant="body2">Pending</Typography>
                                        </Box>
                                        <Chip
                                            label={decisions.filter(d => d.outcome === 'pending').length}
                                            size="small"
                                            color="warning"
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Info color="disabled" sx={{ fontSize: 20 }} />
                                            <Typography variant="body2">Ignored</Typography>
                                        </Box>
                                        <Chip
                                            label={decisions.filter(d => d.outcome === 'ignored').length}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Info Card */}
                        <Alert severity="info" icon={<Info />}>
                            <Typography variant="caption">
                                <strong>Click any decision</strong> to view the user's full profile and AI journey
                            </Typography>
                        </Alert>
                    </Stack>
                </Grid>
            </Grid>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </Box>
    );
}
