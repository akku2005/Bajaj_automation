import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Autocomplete,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    IconButton,
} from '@mui/material';
import {
    Search,
    ArrowBack,
} from '@mui/icons-material';
import { getUserById, searchUsers, getUserDecisions, getUserFeatures, mockUsers, User, Decision } from '../../services/mockData';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserExplorerPage() {
    const { userId: urlUserId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState<User | null>(urlUserId ? getUserById(urlUserId) || null : null);
    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const handleUserSelect = (user: User | null) => {
        setSelectedUser(user);
        if (user) {
            navigate(`/users/${user.userId}`);
        }
    };

    const userDecisions = selectedUser ? getUserDecisions(selectedUser.userId) : [];
    const userFeatures = selectedUser ? getUserFeatures(selectedUser.userId) : [];

    return (
        <Box>
            {/* Breadcrumb & Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    User Explorer
                </Typography>
                <Typography variant="h4" fontWeight="700" sx={{ mb: 1 }}>
                    {selectedUser ? `User: ${selectedUser.userId}` : 'Search Users'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {selectedUser ? `View individual user decisions, features, and AI learning metrics` : 'Search for any user by ID, mobile, email, or name'}
                </Typography>
            </Box>

            {/* Search Bar */}
            <Paper sx={{ p: 2.5, mb: 3, border: '1px solid #E5E7EB' }}>
                <Autocomplete
                    options={searchQuery.length > 0 ? searchUsers(searchQuery) : mockUsers.slice(0, 10)}
                    getOptionLabel={(option) => `${option.userId} - ${option.name} (${option.mobile})`}
                    value={selectedUser}
                    onChange={(_, newValue) => handleUserSelect(newValue)}
                    onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search by User ID, Mobile, Email, or Name..."
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <>
                                        <Search sx={{ mr: 1, color: 'text.secondary' }} />
                                        {params.InputProps.startAdornment}
                                    </>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#7C3AED',
                                    },
                                },
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} sx={{ py: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                            <Box>
                                <Typography variant="body2" fontWeight="600">
                                    {option.userId} - {option.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {option.mobile} • {option.segment} • CIBIL: {option.cibil}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                />
            </Paper>

            {/* User Profile & Tabs */}
            {selectedUser ? (
                <Box>
                    {/* User Summary Card */}
                    <Paper sx={{ p: 3, mb: 3, border: '1px solid #E5E7EB' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography variant="h6" fontWeight="700" gutterBottom>
                                    {selectedUser.name || 'User'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedUser.userId} • {selectedUser.mobile}
                                </Typography>
                            </Box>
                            <Chip label={selectedUser.currentStage.toUpperCase()} color="primary" />
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mt: 3 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    CIBIL Score
                                </Typography>
                                <Typography variant="h5" fontWeight="700" sx={{ mt: 0.5 }}>
                                    {selectedUser.cibil}
                                </Typography>
                                <Chip label={selectedUser.cibilBand} size="small" sx={{ mt: 1 }} />
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    Engagement
                                </Typography>
                                <Typography variant="h5" fontWeight="700" sx={{ mt: 0.5 }}>
                                    {Math.round(selectedUser.engagementScore * 100)}%
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    Churn Risk
                                </Typography>
                                <Typography variant="h5" fontWeight="700" sx={{ mt: 0.5 }}>
                                    {Math.round(selectedUser.churnRisk * 100)}%
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    Fatigue Score
                                </Typography>
                                <Typography variant="h5" fontWeight="700" sx={{ mt: 0.5 }}>
                                    {Math.round(selectedUser.fatigueScore * 100)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: '1px solid #E5E7EB', mb: 3 }}>
                        <Tabs
                            value={tabValue}
                            onChange={(_, v) => setTabValue(v)}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    minHeight: 48,
                                },
                                '& .Mui-selected': {
                                    color: 'primary.main',
                                },
                                '& .MuiTabs-indicator': {
                                    height: 3,
                                    backgroundColor: 'primary.main',
                                },
                            }}
                        >
                            <Tab label="Decision History" />
                            <Tab label="Affinity Scores" />
                            <Tab label="Features" />
                            <Tab label="RL Parameters" />
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    {/* Tab 1: Decision History */}
                    {tabValue === 0 && (
                        <TableContainer component={Paper} sx={{ border: '1px solid #E5E7EB' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Timestamp</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Offer</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Channel</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Partner</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Score</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Type</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Outcome</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userDecisions.slice(0, 20).map((decision) => (
                                        <TableRow key={decision.decisionId} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {new Date(decision.timestamp).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(decision.timestamp).toLocaleTimeString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="600">{decision.offer}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    ₹{(decision.offerAmount / 100000).toFixed(1)}L
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer' }}>
                                                    {decision.channel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{decision.partner}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="600">
                                                    {(decision.score * 100).toFixed(0)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={decision.exploration ? 'Explore' : 'Exploit'}
                                                    size="small"
                                                    color={decision.exploration ? 'secondary' : 'primary'}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {decision.outcome === 'converted' && <Chip label="Converted" size="small" color="success" />}
                                                {decision.outcome === 'pending' && <Chip label="Pending" size="small" variant="outlined" />}
                                                {decision.outcome === 'ignored' && <Typography variant="caption" color="text.secondary">Ignored</Typography>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* Tab 2: Affinity Scores */}
                    {tabValue === 1 && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                            <Paper sx={{ p: 3, border: '1px solid #E5E7EB' }}>
                                <Typography variant="subtitle2" fontWeight="700" gutterBottom>
                                    Product Affinity
                                </Typography>
                                <Table size="small">
                                    <TableBody>
                                        {Object.entries(selectedUser.affinityScores.product)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([product, score]) => (
                                                <TableRow key={product}>
                                                    <TableCell sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
                                                            {product}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" fontWeight="700" color="primary.main">
                                                            {(score * 100).toFixed(0)}%
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Paper sx={{ p: 3, border: '1px solid #E5E7EB' }}>
                                <Typography variant="subtitle2" fontWeight="700" gutterBottom>
                                    Channel Affinity
                                </Typography>
                                <Table size="small">
                                    <TableBody>
                                        {Object.entries(selectedUser.affinityScores.channel)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([channel, score]) => (
                                                <TableRow key={channel}>
                                                    <TableCell sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                            {channel}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" fontWeight="700" color="primary.main">
                                                            {(score * 100).toFixed(0)}%
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Paper sx={{ p: 3, border: '1px solid #E5E7EB' }}>
                                <Typography variant="subtitle2" fontWeight="700" gutterBottom>
                                    Partner Affinity
                                </Typography>
                                <Table size="small">
                                    <TableBody>
                                        {Object.entries(selectedUser.affinityScores.partner)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([partner, score]) => (
                                                <TableRow key={partner}>
                                                    <TableCell sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                            {partner}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ border: 'none', py: 1 }}>
                                                        <Typography variant="body2" fontWeight="700" color="primary.main">
                                                            {(score * 100).toFixed(0)}%
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Box>
                    )}

                    {/* Tab 3: Features */}
                    {tabValue === 2 && (
                        <TableContainer component={Paper} sx={{ border: '1px solid #E5E7EB' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Feature Name</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Value</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Type</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Category</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Updated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userFeatures.map((feature) => (
                                        <TableRow key={feature.name} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                                            <TableCell>
                                                <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer' }}>
                                                    {feature.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="600">
                                                    {typeof feature.value === 'number' && feature.value < 1 && feature.value > 0
                                                        ? (feature.value * 100).toFixed(1) + '%'
                                                        : String(feature.value)
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={feature.type} size="small" variant="outlined" />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                    {feature.category.replace('_', ' ')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(feature.computedAt).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* Tab 4: RL Parameters */}
                    {tabValue === 3 && (
                        <TableContainer component={Paper} sx={{ border: '1px solid #E5E7EB' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Action Pair</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>α (Successes)</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>β (Failures)</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Total Trials</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Success Rate</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}>Confidence</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(selectedUser.rlParams).map(([actionKey, params]) => {
                                        const totalTrials = params.alpha + params.beta;
                                        const successRate = params.alpha / totalTrials;

                                        return (
                                            <TableRow key={actionKey} sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}>
                                                <TableCell>
                                                    <Typography variant="body2" color="primary.main" sx={{ textTransform: 'uppercase' }}>
                                                        {actionKey.replace(/_/g, ' → ')}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="600">{params.alpha}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="600">{params.beta}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">{totalTrials}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="700" color="primary.main">
                                                        {(successRate * 100).toFixed(1)}%
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={totalTrials > 40 ? 'High' : totalTrials > 20 ? 'Medium' : 'Low'}
                                                        size="small"
                                                        color={totalTrials > 40 ? 'success' : totalTrials > 20 ? 'primary' : 'default'}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            ) : (
                <Paper sx={{ p: 6, textAlign: 'center', border: '1px solid #E5E7EB' }}>
                    <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Search for a User
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Use the search bar above to find any user by ID, mobile number, email, or name
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}
