import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Tabs,
    Tab,
    Stack,
    Paper,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Alert,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    TrendingUp,
    Savings,
    Edit,
    Add,
    Delete,
    Check,
    CalendarMonth,
    MonetizationOn,
    Campaign
} from '@mui/icons-material';
import StatCard from '../../components/shared/StatCard';

interface BudgetAllocation {
    id: string;
    team: string;
    dailyBudget: number;
    monthlyBudget: number;
    quarterlyBudget: number;
    spent: number;
}

interface Goal {
    id: string;
    metric: string;
    current: number;
    target: number;
    period: 'daily' | 'monthly' | 'quarterly';
    unit: string;
}

export default function BudgetGoalsSettings() {
    const [tabValue, setTabValue] = useState(0);
    const [editMode, setEditMode] = useState(false);

    // Budget state
    const [budgets, setBudgets] = useState<BudgetAllocation[]>([
        { id: '1', team: 'WhatsApp', dailyBudget: 19000, monthlyBudget: 570000, quarterlyBudget: 1710000, spent: 418000 },
        { id: '2', team: 'SMS', dailyBudget: 11000, monthlyBudget: 330000, quarterlyBudget: 990000, spent: 235000 },
        { id: '3', team: 'RCS', dailyBudget: 14000, monthlyBudget: 420000, quarterlyBudget: 1260000, spent: 275000 }
    ]);

    // Goals state
    const [goals, setGoals] = useState<Goal[]>([
        { id: '1', metric: 'AIP Conversion', current: 42, target: 50, period: 'monthly', unit: '%' },
        { id: '2', metric: 'Revenue', current: 115, target: 150, period: 'monthly', unit: '₹Cr' },
        { id: '3', metric: 'Cost per AIP', current: 383, target: 300, period: 'monthly', unit: '₹' },
        { id: '4', metric: 'Campaign Overlap', current: 51, target: 5, period: 'monthly', unit: '%' }
    ]);

    // New budget allocation
    const [newBudget, setNewBudget] = useState({
        team: '',
        dailyBudget: 0,
        monthlyBudget: 0,
        quarterlyBudget: 0
    });

    // New goal
    const [newGoal, setNewGoal] = useState({
        metric: '',
        target: 0,
        period: 'monthly' as 'daily' | 'monthly' | 'quarterly',
        unit: ''
    });

    const handleAddBudget = () => {
        if (newBudget.team && newBudget.dailyBudget > 0) {
            const budget: BudgetAllocation = {
                id: Date.now().toString(),
                team: newBudget.team,
                dailyBudget: newBudget.dailyBudget,
                monthlyBudget: newBudget.monthlyBudget,
                quarterlyBudget: newBudget.quarterlyBudget,
                spent: 0
            };
            setBudgets([...budgets, budget]);
            setNewBudget({ team: '', dailyBudget: 0, monthlyBudget: 0, quarterlyBudget: 0 });
        }
    };

    const handleAddGoal = () => {
        if (newGoal.metric && newGoal.target > 0) {
            const goal: Goal = {
                id: Date.now().toString(),
                metric: newGoal.metric,
                current: 0,
                target: newGoal.target,
                period: newGoal.period,
                unit: newGoal.unit
            };
            setGoals([...goals, goal]);
            setNewGoal({ metric: '', target: 0, period: 'monthly', unit: '' });
        }
    };

    const handleDeleteBudget = (id: string) => {
        setBudgets(budgets.filter(b => b.id !== id));
    };

    const handleDeleteGoal = (id: string) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const totalDailyBudget = budgets.reduce((sum, b) => sum + b.dailyBudget, 0);
    const totalMonthlyBudget = budgets.reduce((sum, b) => sum + b.monthlyBudget, 0);
    const totalQuarterlyBudget = budgets.reduce((sum, b) => sum + b.quarterlyBudget, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    Budget & Goals Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Set daily, monthly, and quarterly budgets. Define performance goals and track progress.
                </Typography>
            </Box>

            {/* Summary Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Daily Budget"
                        value={`₹${(totalDailyBudget / 1000).toFixed(0)}K`}
                        icon={<CalendarMonth />}
                        color="primary"
                        subtitle="Per day allocation"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Monthly Budget"
                        value={`₹${(totalMonthlyBudget / 1000).toFixed(0)}K`}
                        icon={<MonetizationOn />}
                        color="info"
                        subtitle={`${((totalSpent / totalMonthlyBudget) * 100).toFixed(0)}% utilized`}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Quarterly Budget"
                        value={`₹${(totalQuarterlyBudget / 100000).toFixed(1)}L`}
                        icon={<Savings />}
                        color="success"
                        subtitle="3-month allocation"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Goals on Track"
                        value={`${goals.filter(g => g.current >= g.target * 0.8).length}/${goals.length}`}
                        icon={<TrendingUp />}
                        color="warning"
                        subtitle="Achievement rate"
                    />
                </Grid>
            </Grid>

            {/* Tabs */}
            <Card sx={{ mb: 4 }}>
                <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Budget Allocation" />
                    <Tab label="Performance Goals" />
                    <Tab label="Budget History" />
                </Tabs>

                <CardContent sx={{ p: 3 }}>
                    {/* Tab 1: Budget Allocation */}
                    {tabValue === 0 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="600">
                                    Team Budget Allocations
                                </Typography>
                                <Button
                                    variant={editMode ? 'outlined' : 'contained'}
                                    startIcon={editMode ? <Check /> : <Edit />}
                                    onClick={() => setEditMode(!editMode)}
                                >
                                    {editMode ? 'Save Changes' : 'Edit Budgets'}
                                </Button>
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                                        <TableRow>
                                            <TableCell><strong>Team/Channel</strong></TableCell>
                                            <TableCell><strong>Daily Budget</strong></TableCell>
                                            <TableCell><strong>Monthly Budget</strong></TableCell>
                                            <TableCell><strong>Quarterly Budget</strong></TableCell>
                                            <TableCell><strong>Spent (MTD)</strong></TableCell>
                                            <TableCell><strong>Status</strong></TableCell>
                                            {editMode && <TableCell><strong>Actions</strong></TableCell>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {budgets.map((budget) => (
                                            <TableRow key={budget.id}>
                                                <TableCell>
                                                    <Chip label={budget.team} color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell>
                                                    {editMode ? (
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            value={budget.dailyBudget}
                                                            onChange={(e) => {
                                                                const newBudgets = budgets.map(b =>
                                                                    b.id === budget.id
                                                                        ? { ...b, dailyBudget: parseInt(e.target.value) || 0 }
                                                                        : b
                                                                );
                                                                setBudgets(newBudgets);
                                                            }}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                            }}
                                                        />
                                                    ) : (
                                                        `₹${(budget.dailyBudget / 1000).toFixed(0)}K`
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editMode ? (
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            value={budget.monthlyBudget}
                                                            onChange={(e) => {
                                                                const newBudgets = budgets.map(b =>
                                                                    b.id === budget.id
                                                                        ? { ...b, monthlyBudget: parseInt(e.target.value) || 0 }
                                                                        : b
                                                                );
                                                                setBudgets(newBudgets);
                                                            }}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                            }}
                                                        />
                                                    ) : (
                                                        `₹${(budget.monthlyBudget / 1000).toFixed(0)}K`
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editMode ? (
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            value={budget.quarterlyBudget}
                                                            onChange={(e) => {
                                                                const newBudgets = budgets.map(b =>
                                                                    b.id === budget.id
                                                                        ? { ...b, quarterlyBudget: parseInt(e.target.value) || 0 }
                                                                        : b
                                                                );
                                                                setBudgets(newBudgets);
                                                            }}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                            }}
                                                        />
                                                    ) : (
                                                        `₹${(budget.quarterlyBudget / 100000).toFixed(1)}L`
                                                    )}
                                                </TableCell>
                                                <TableCell>₹{(budget.spent / 1000).toFixed(0)}K</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={`${((budget.spent / budget.monthlyBudget) * 100).toFixed(0)}%`}
                                                        size="small"
                                                        color={(budget.spent / budget.monthlyBudget) < 0.8 ? 'success' : 'warning'}
                                                    />
                                                </TableCell>
                                                {editMode && (
                                                    <TableCell>
                                                        <IconButton size="small" color="error" onClick={() => handleDeleteBudget(budget.id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {editMode && (
                                <Paper elevation={0} sx={{ mt: 3, p: 2, border: '2px dashed', borderColor: 'primary.main' }}>
                                    <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                        Add New Budget Allocation
                                    </Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, sm: 3 }}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Team/Channel</InputLabel>
                                                <Select
                                                    value={newBudget.team}
                                                    label="Team/Channel"
                                                    onChange={(e) => setNewBudget({ ...newBudget, team: e.target.value })}
                                                >
                                                    <MenuItem value="Email">Email</MenuItem>
                                                    <MenuItem value="Push">Push Notification</MenuItem>
                                                    <MenuItem value="In-App">In-App</MenuItem>
                                                    <MenuItem value="Social">Social Media</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 2 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Daily"
                                                type="number"
                                                value={newBudget.dailyBudget || ''}
                                                onChange={(e) => setNewBudget({ ...newBudget, dailyBudget: parseInt(e.target.value) || 0 })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 2 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Monthly"
                                                type="number"
                                                value={newBudget.monthlyBudget || ''}
                                                onChange={(e) => setNewBudget({ ...newBudget, monthlyBudget: parseInt(e.target.value) || 0 })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 3 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Quarterly"
                                                type="number"
                                                value={newBudget.quarterlyBudget || ''}
                                                onChange={(e) => setNewBudget({ ...newBudget, quarterlyBudget: parseInt(e.target.value) || 0 })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<Add />}
                                                onClick={handleAddBudget}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )}

                            <Alert severity="info" sx={{ mt: 3 }}>
                                <Typography variant="body2">
                                    <strong>Auto-calculation:</strong> Changes to monthly budgets will automatically adjust daily (÷30) and quarterly (×3) allocations unless manually overridden.
                                </Typography>
                            </Alert>
                        </Box>
                    )}

                    {/* Tab 2: Performance Goals */}
                    {tabValue === 1 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="600">
                                    Performance Goals & Targets
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {goals.map((goal) => {
                                    const progress = (goal.current / goal.target) * 100;
                                    const isOnTrack = progress >= 80;

                                    return (
                                        <Grid size={{ xs: 12, md: 6 }} key={goal.id}>
                                            <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="600">
                                                            {goal.metric}
                                                        </Typography>
                                                        <Chip
                                                            label={goal.period.toUpperCase()}
                                                            size="small"
                                                            sx={{ mt: 0.5 }}
                                                        />
                                                    </Box>
                                                    <IconButton size="small" color="error" onClick={() => handleDeleteGoal(goal.id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>

                                                <Box sx={{ mb: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Current
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="600">
                                                            {goal.current}{goal.unit}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Target
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="600">
                                                            {goal.target}{goal.unit}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ height: 8, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                                                        <Box
                                                            sx={{
                                                                width: `${Math.min(progress, 100)}%`,
                                                                height: '100%',
                                                                bgcolor: isOnTrack ? 'success.main' : 'warning.main',
                                                                transition: 'width 0.3s'
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Chip
                                                    label={`${progress.toFixed(0)}% ${isOnTrack ? 'On Track' : 'Needs Attention'}`}
                                                    size="small"
                                                    color={isOnTrack ? 'success' : 'warning'}
                                                    sx={{ mt: 1 }}
                                                />
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <Paper elevation={0} sx={{ mt: 3, p: 2, border: '2px dashed', borderColor: 'primary.main' }}>
                                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                    Add New Goal
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Metric Name"
                                            value={newGoal.metric}
                                            onChange={(e) => setNewGoal({ ...newGoal, metric: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Target"
                                            type="number"
                                            value={newGoal.target || ''}
                                            onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) || 0 })}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Unit"
                                            value={newGoal.unit}
                                            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                                            placeholder="%, ₹, K"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Period</InputLabel>
                                            <Select
                                                value={newGoal.period}
                                                label="Period"
                                                onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value as any })}
                                            >
                                                <MenuItem value="daily">Daily</MenuItem>
                                                <MenuItem value="monthly">Monthly</MenuItem>
                                                <MenuItem value="quarterly">Quarterly</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<Add />}
                                            onClick={handleAddGoal}
                                        >
                                            Add Goal
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    )}

                    {/* Tab 3: Budget History */}
                    {tabValue === 2 && (
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Budget Allocation History
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Track how your budget allocations have changed over time
                            </Typography>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                                        <TableRow>
                                            <TableCell><strong>Date</strong></TableCell>
                                            <TableCell><strong>Change Type</strong></TableCell>
                                            <TableCell><strong>Team</strong></TableCell>
                                            <TableCell><strong>Previous</strong></TableCell>
                                            <TableCell><strong>New</strong></TableCell>
                                            <TableCell><strong>Changed By</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>2024-11-29</TableCell>
                                            <TableCell><Chip label="Budget Increase" size="small" color="success" /></TableCell>
                                            <TableCell>WhatsApp</TableCell>
                                            <TableCell>₹500K/month</TableCell>
                                            <TableCell>₹570K/month</TableCell>
                                            <TableCell>AI Auto-optimization</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2024-11-25</TableCell>
                                            <TableCell><Chip label="Budget Decrease" size="small" color="warning" /></TableCell>
                                            <TableCell>SMS</TableCell>
                                            <TableCell>₹400K/month</TableCell>
                                            <TableCell>₹330K/month</TableCell>
                                            <TableCell>Manual (admin@bajaj.com)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2024-11-20</TableCell>
                                            <TableCell><Chip label="New Allocation" size="small" color="info" /></TableCell>
                                            <TableCell>RCS</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>₹420K/month</TableCell>
                                            <TableCell>Manual (admin@bajaj.com)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
