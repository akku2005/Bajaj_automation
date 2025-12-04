import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    TextField,
    Switch,
    FormControlLabel,
    Paper,
    Chip,
    Stack,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    AutoAwesome,
    Search,
    GroupAdd,
    TrendingUp,
    Schedule,
    Favorite,
    ShoppingCart,
    AccountBalance,
    LocationCity,
    Smartphone,
    StarBorder,
    ContentCopy,
    Delete,
    Edit,
    Info
} from '@mui/icons-material';

interface SegmentTemplate {
    id: string;
    name: string;
    description: string;
    query: string;
    estimatedSize: number;
    icon: React.ReactNode;
    category: string;
}

const SEGMENT_TEMPLATES: SegmentTemplate[] = [
    {
        id: '1',
        name: 'High-Value Prospects',
        description: 'CIBIL > 750, visited PL page, no active loan',
        query: 'Show me users with CIBIL score greater than 750 who visited the Personal Loan page in the last 7 days but haven\'t applied for any loan yet',
        estimatedSize: 45000,
        icon: <TrendingUp />,
        category: 'High Intent'
    },
    {
        id: '2',
        name: 'Dormant Users',
        description: 'No activity in 30+ days, had high engagement before',
        query: 'Find users who haven\'t opened the app in the last 30 days but previously had more than 5 sessions per week',
        estimatedSize: 120000,
        icon: <Schedule />,
        category: 'Re-engagement'
    },
    {
        id: '3',
        name: 'Insurance Ready',
        description: 'Has loan, no insurance, metro city',
        query: 'Show me users who have an active loan but no insurance policy and live in metro cities',
        estimatedSize: 32000,
        icon: <Favorite />,
        category: 'Cross-sell'
    },
    {
        id: '4',
        name: 'Cart Abandoners',
        description: 'Started application but didn\'t complete',
        query: 'Users who started a loan application in the last 3 days but didn\'t complete the form',
        estimatedSize: 18500,
        icon: <ShoppingCart />,
        category: 'High Intent'
    },
    {
        id: '5',
        name: 'Gold Loan Seekers',
        description: 'Searched gold loan, visited page 3+ times',
        query: 'Find users who searched for "gold loan" and visited the gold loan page more than 3 times in the last 14 days',
        estimatedSize: 28000,
        icon: <AccountBalance />,
        category: 'High Intent'
    },
    {
        id: '6',
        name: 'Tier 2 Salaried',
        description: 'Salaried, CIBIL 650-750, Tier 2 cities',
        query: 'Show me salaried users with CIBIL score between 650 and 750 living in Tier 2 cities',
        estimatedSize: 95000,
        icon: <LocationCity />,
        category: 'Emerging'
    },
    {
        id: '7',
        name: 'Android WhatsApp Users',
        description: 'Android, WhatsApp installed, high engagement',
        query: 'Find Android users who have WhatsApp installed and have opened the app more than 10 times this month',
        estimatedSize: 185000,
        icon: <Smartphone />,
        category: 'Channel Optimization'
    }
];

export default function SegmentBuilder() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [audienceSize, setAudienceSize] = useState<number | null>(null);
    const [lookalike, setLookalike] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'High Intent', 'Re-engagement', 'Cross-sell', 'Emerging', 'Channel Optimization'];

    const filteredTemplates = selectedCategory === 'All'
        ? SEGMENT_TEMPLATES
        : SEGMENT_TEMPLATES.filter(t => t.category === selectedCategory);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setShowSuggestions(false);
        // Simulate AI processing
        setTimeout(() => {
            setIsAnalyzing(false);
            // Generate random audience size based on query complexity
            const baseSize = 10000 + Math.floor(Math.random() * 50000);
            setAudienceSize(baseSize);
        }, 1500);
    };

    const handleUseTemplate = (template: SegmentTemplate) => {
        setQuery(template.query);
        setAudienceSize(template.estimatedSize);
        setShowSuggestions(false);
    };

    const handleReset = () => {
        setQuery('');
        setAudienceSize(null);
        setShowSuggestions(true);
        setLookalike(false);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    Audience Creator
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Describe your target audience in plain English, and let AI build the segment.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left: Input Area */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="600">
                                    Define Audience
                                </Typography>
                                {query && (
                                    <Button size="small" onClick={handleReset} startIcon={<Delete />}>
                                        Clear
                                    </Button>
                                )}
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    placeholder="e.g., Show me users with CIBIL > 750 who visited the Gold Loan page in the last 2 days but haven't applied yet."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    sx={{ mb: 2 }}
                                    variant="outlined"
                                />
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={isAnalyzing ? <AutoAwesome sx={{ animation: 'spin 2s linear infinite' }} /> : <AutoAwesome />}
                                    onClick={handleAnalyze}
                                    disabled={!query || isAnalyzing}
                                >
                                    {isAnalyzing ? 'AI is Analyzing...' : 'Generate Segment'}
                                </Button>
                            </Box>

                            {audienceSize !== null && (
                                <>
                                    <Divider sx={{ my: 3 }} />

                                    <Alert severity="success" icon={<Info />} sx={{ mb: 3 }}>
                                        <Typography variant="body2" fontWeight="600">
                                            Segment Created Successfully!
                                        </Typography>
                                        <Typography variant="caption">
                                            AI has analyzed your query and found {audienceSize.toLocaleString()} matching users.
                                        </Typography>
                                    </Alert>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            AI Optimization Options
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={lookalike}
                                                    onChange={(e) => setLookalike(e.target.checked)}
                                                />
                                            }
                                            label={
                                                <Box>
                                                    <Typography variant="body2">Expand with Lookalikes</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Find similar users based on behavioral patterns (+{Math.floor(audienceSize * 0.4).toLocaleString()} potential)
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button variant="outlined" fullWidth>
                                            Save as Draft
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="large"
                                            fullWidth
                                            startIcon={<GroupAdd />}
                                            onClick={() => navigate('/campaigns/create', {
                                                state: {
                                                    segmentName: query ? `AI Generated Segment` : 'Custom Segment',
                                                    query: query,
                                                    audienceSize: audienceSize,
                                                    category: selectedCategory
                                                }
                                            })}
                                        >
                                            Create Campaign
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Suggested Segments Below */}
                    {showSuggestions && (
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" fontWeight="600">
                                        💡 Suggested Segments
                                    </Typography>
                                    <Chip label={`${filteredTemplates.length} Templates`} size="small" color="primary" />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Quick-start with pre-built segments optimized for common use cases
                                </Typography>

                                {/* Category Filter */}
                                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                    {categories.map((category) => (
                                        <Chip
                                            key={category}
                                            label={category}
                                            onClick={() => setSelectedCategory(category)}
                                            color={selectedCategory === category ? 'primary' : 'default'}
                                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                                        />
                                    ))}
                                </Stack>

                                {/* Template List */}
                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {filteredTemplates.map((template) => (
                                        <Paper
                                            key={template.id}
                                            elevation={0}
                                            sx={{
                                                mb: 1.5,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: 1
                                                }
                                            }}
                                        >
                                            <ListItemButton onClick={() => handleUseTemplate(template)}>
                                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                                    {template.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="subtitle2" fontWeight="600">
                                                                {template.name}
                                                            </Typography>
                                                            <Chip label={template.category} size="small" variant="outlined" />
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box sx={{ mt: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary" display="block">
                                                                {template.description}
                                                            </Typography>
                                                            <Typography variant="caption" color="primary.main" fontWeight="600" sx={{ mt: 0.5, display: 'block' }}>
                                                                ~{(template.estimatedSize / 1000).toFixed(0)}K users
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                                <Tooltip title="Use this template">
                                                    <IconButton edge="end" color="primary">
                                                        <ContentCopy />
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemButton>
                                        </Paper>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                {/* Right: Audience Estimate */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ height: showSuggestions ? 400 : '100%', bgcolor: 'primary.main', color: 'white', position: 'sticky', top: 24 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            {audienceSize !== null ? (
                                <>
                                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                                        Estimated Audience Size
                                    </Typography>
                                    <Typography variant="h1" fontWeight="700" sx={{ my: 2 }}>
                                        {(audienceSize + (lookalike ? Math.floor(audienceSize * 0.4) : 0)).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                                        Users found
                                    </Typography>

                                    <Paper sx={{ p: 2.5, bgcolor: 'rgba(255,255,255,0.15)', color: 'white', width: '100%', backdropFilter: 'blur(10px)' }}>
                                        <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                            Segment Breakdown
                                        </Typography>
                                        <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.2)' }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">High Intent</Typography>
                                            <Typography variant="body2" fontWeight="700">65%</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">WhatsApp Preferred</Typography>
                                            <Typography variant="body2" fontWeight="700">80%</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Android Users</Typography>
                                            <Typography variant="body2" fontWeight="700">92%</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Metro Cities</Typography>
                                            <Typography variant="body2" fontWeight="700">58%</Typography>
                                        </Box>
                                    </Paper>

                                    <Alert
                                        severity="info"
                                        sx={{
                                            mt: 2,
                                            width: '100%',
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            '& .MuiAlert-icon': { color: 'white' }
                                        }}
                                    >
                                        <Typography variant="caption">
                                            💡 <strong>AI Recommendation:</strong> WhatsApp yields 2.3x higher engagement for this segment. Projected AIP: 42%
                                        </Typography>
                                    </Alert>
                                </>
                            ) : (
                                <Box sx={{ textAlign: 'center', opacity: 0.8 }}>
                                    <Search sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Enter a query to see audience estimates
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                        Or select from suggested segments below
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Tips */}
                    {!audienceSize && (
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                    ✨ Pro Tips
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="Be Specific"
                                            secondary="Include CIBIL scores, timeframes, behaviors"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                            secondaryTypographyProps={{ variant: 'caption' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Use Natural Language"
                                            secondary="Write like you're explaining to a colleague"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                            secondaryTypographyProps={{ variant: 'caption' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Combine Conditions"
                                            secondary="'Users who X AND Y BUT NOT Z'"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                            secondaryTypographyProps={{ variant: 'caption' }}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>

            {/* AI Analytics Chat Section */}
            <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <AutoAwesome />
                        <Typography variant="h6" fontWeight="600">
                            Ask AI for Analytics Insights
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                        Get instant answers about your segments, performance metrics, and optimization opportunities
                    </Typography>

                    {/* Suggestion Chips */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        {[
                            'What\'s the best channel for this segment?',
                            'Show me conversion rates by device',
                            'Which time slot has highest engagement?',
                            'Compare this segment to last month',
                            'What partner has best approval rate?',
                            'Suggest campaign optimizations'
                        ].map((suggestion, idx) => (
                            <Chip
                                key={idx}
                                label={suggestion}
                                onClick={() => {/* Handle suggestion click */ }}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                    }
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Chat Input */}
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <TextField
                            fullWidth
                            placeholder="Ask me anything about analytics, segments, or performance..."
                            variant="outlined"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.15)',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255,255,255,0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgba(255,255,255,0.7)',
                                    },
                                },
                                '& .MuiOutlinedInput-input::placeholder': {
                                    color: 'rgba(255,255,255,0.7)',
                                    opacity: 1,
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                minWidth: 120,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.9)',
                                }
                            }}
                        >
                            Ask AI
                        </Button>
                    </Box>

                    {/* Quick Stats Preview */}
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            p: 2,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', mb: 1 }}>
                            💡 Quick Insights for Current Segment:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="h6" fontWeight="700">42%</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Avg AIP Rate</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="h6" fontWeight="700">WhatsApp</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Best Channel</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="h6" fontWeight="700">10-11 AM</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Peak Time</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="h6" fontWeight="700">₹285</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Cost per AIP</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </CardContent>
            </Card>
        </Box>
    );
}
