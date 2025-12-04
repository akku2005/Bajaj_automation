import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Chip,
    IconButton,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment
} from '@mui/material';
import { Edit, ArrowBack, CalendarToday, Send } from '@mui/icons-material';
import { useUseCaseStore } from '../../stores/useCaseStore';

export default function UseCaseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const useCase = useUseCaseStore((state) => state.getUseCaseById(id || ''));
    const updateUseCase = useUseCaseStore((state) => state.updateUseCase);

    // Form States
    const [overrideDuration, setOverrideDuration] = useState('today');
    const [customDate, setCustomDate] = useState('');
    const [showCustomDialog, setShowCustomDialog] = useState(false);
    const [channelBoost, setChannelBoost] = useState('sms');
    const [focus, setFocus] = useState('monitored');
    const [todayGroupValue, setTodayGroupValue] = useState('5');
    const [budgetIncrease, setBudgetIncrease] = useState('10000');

    // UI States
    const [showSuccess, setShowSuccess] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Initialize form with use case data
    useEffect(() => {
        if (useCase) {
            setOverrideDuration(useCase.overrides.overrideDuration);
            setChannelBoost(useCase.overrides.channelBoost || 'sms');
            setFocus(useCase.overrides.focus);
            setTodayGroupValue(useCase.todayGroup?.improveAppBy.toString() || '5');
            setBudgetIncrease(useCase.budgetAdjustment?.increaseSpendBy.toString() || '10000');
            setHasChanges(false);
        }
    }, [useCase]);

    // Track changes
    useEffect(() => {
        if (useCase) {
            const changed =
                overrideDuration !== useCase.overrides.overrideDuration ||
                channelBoost !== (useCase.overrides.channelBoost || 'sms') ||
                focus !== useCase.overrides.focus ||
                todayGroupValue !== (useCase.todayGroup?.improveAppBy.toString() || '5') ||
                budgetIncrease !== (useCase.budgetAdjustment?.increaseSpendBy.toString() || '10000');
            setHasChanges(changed);
        }
    }, [overrideDuration, channelBoost, focus, todayGroupValue, budgetIncrease, useCase]);

    if (!useCase) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Use case not found</Typography>
                <Button variant="contained" onClick={() => navigate('/use-cases')} sx={{ mt: 2 }}>
                    Back to Use Cases
                </Button>
            </Box>
        );
    }

    const handleOverrideDurationChange = (value: string) => {
        if (value === 'custom') {
            setShowCustomDialog(true);
        } else {
            setOverrideDuration(value);
        }
    };

    const handleCustomDateSubmit = () => {
        if (customDate) {
            setOverrideDuration('custom');
            setShowCustomDialog(false);
        }
    };

    const handleApplyChanges = () => {
        if (!useCase) return;

        // Update the use case in the store
        updateUseCase(useCase.id, {
            overrides: {
                overrideDuration: overrideDuration as 'today' | '1week' | 'custom',
                channelBoost: channelBoost as 'sms' | 'rcs' | 'whatsapp' | null,
                focus: focus as 'monitored' | 'aggressive' | 'conservative'
            },
            todayGroup: {
                improveAppBy: parseInt(todayGroupValue) || 0,
                percentage: parseInt(todayGroupValue) || 0
            },
            budgetAdjustment: {
                increaseSpendBy: parseInt(budgetIncrease) || 0
            }
        });

        setShowSuccess(true);
        setHasChanges(false);

        // Simulate real-time update
        console.log('Applied changes:', {
            overrideDuration,
            channelBoost,
            focus,
            todayGroup: todayGroupValue,
            budgetAdjustment: budgetIncrease
        });
    };

    const handleResetChanges = () => {
        if (useCase) {
            setOverrideDuration(useCase.overrides.overrideDuration);
            setChannelBoost(useCase.overrides.channelBoost || 'sms');
            setFocus(useCase.overrides.focus);
            setTodayGroupValue(useCase.todayGroup?.improveAppBy.toString() || '5');
            setBudgetIncrease(useCase.budgetAdjustment?.increaseSpendBy.toString() || '10000');
            setHasChanges(false);
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/use-cases')} size="small">
                    <ArrowBack />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" fontWeight="600">
                            Use Case: {useCase.name}
                        </Typography>
                        {useCase.status === 'active' && (
                            <Chip
                                label="Active"
                                size="small"
                                sx={{
                                    bgcolor: '#E8F5E9',
                                    color: '#2E7D32',
                                    fontWeight: 500
                                }}
                            />
                        )}
                        <IconButton
                            size="small"
                            sx={{ ml: 'auto' }}
                            onClick={() => navigate(`/use-cases/${useCase.id}/configure`)}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {useCase.description}
                    </Typography>
                </Box>
                {useCase.averageTicketSize && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Average Ticket Size:
                        </Typography>
                        <Typography variant="body1" fontWeight="600">
                            {useCase.averageTicketSize}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* Quarterly Goal & Budget */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 6 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                        Quarterly Goal
                                    </Typography>
                                    <Typography variant="h3" fontWeight="700" color="primary">
                                        {useCase.quarterlyGoal}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                        Budget
                                    </Typography>
                                    <Typography variant="h3" fontWeight="700">
                                        {useCase.budget}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Current Performance Snapshot */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Current Performance Snapshot
                            </Typography>
                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 3 }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Actual
                                    </Typography>
                                    <Typography variant="h4" fontWeight="700" color="success.main">
                                        {useCase.currentPerformance.actual}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        vs target
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Expected Progress
                                    </Typography>
                                    <Typography variant="h4" fontWeight="700">
                                        {useCase.currentPerformance.expectedProgress}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        vs target
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Conversion Forecast
                                    </Typography>
                                    <Typography variant="h4" fontWeight="700">
                                        {useCase.currentPerformance.conversionForecast}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Cap
                                    </Typography>
                                    <Typography variant="h4" fontWeight="700" color="error.main">
                                        {useCase.currentPerformance.cap}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Today Group */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Today Group
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                <Typography variant="body2">
                                    Improve App by
                                </Typography>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={todayGroupValue}
                                    onChange={(e) => setTodayGroupValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    sx={{ width: 120 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Budget Adjustment */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Budget Adjustment
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                <Typography variant="body2">
                                    Increase Spend by
                                </Typography>
                                <TextField
                                    size="small"
                                    type="number"
                                    placeholder="INR e.g., 10000"
                                    value={budgetIncrease}
                                    onChange={(e) => setBudgetIncrease(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    sx={{ width: 200 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Overrides */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Overrides
                            </Typography>

                            {/* Override Durations */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" fontWeight="600" gutterBottom>
                                    Override Durations
                                </Typography>
                                <RadioGroup
                                    value={overrideDuration}
                                    onChange={(e) => handleOverrideDurationChange(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="today"
                                        control={<Radio size="small" />}
                                        label="Today only"
                                    />
                                    <FormControlLabel
                                        value="1week"
                                        control={<Radio size="small" />}
                                        label="1 week"
                                    />
                                    <FormControlLabel
                                        value="custom"
                                        control={<Radio size="small" />}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>Custom</span>
                                                {overrideDuration === 'custom' && customDate && (
                                                    <Chip label={customDate} size="small" />
                                                )}
                                            </Box>
                                        }
                                    />
                                </RadioGroup>
                            </Box>

                            {/* Channel Boost */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" fontWeight="600" gutterBottom>
                                    Channel Boost
                                </Typography>
                                <RadioGroup
                                    value={channelBoost}
                                    onChange={(e) => setChannelBoost(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="sms"
                                        control={<Radio size="small" />}
                                        label="SMS"
                                    />
                                    <FormControlLabel
                                        value="whatsapp"
                                        control={<Radio size="small" />}
                                        label="WhatsApp"
                                    />
                                    <FormControlLabel
                                        value="rcs"
                                        control={<Radio size="small" />}
                                        label="RCS"
                                    />
                                </RadioGroup>
                            </Box>

                            {/* Focus */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" fontWeight="600" gutterBottom>
                                    Focus
                                </Typography>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={focus}
                                        onChange={(e) => setFocus(e.target.value)}
                                    >
                                        <MenuItem value="monitored">Monitored</MenuItem>
                                        <MenuItem value="aggressive">Aggressive</MenuItem>
                                        <MenuItem value="conservative">Conservative</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={handleApplyChanges}
                                    disabled={!hasChanges}
                                    sx={{
                                        bgcolor: hasChanges ? 'primary.main' : 'action.disabledBackground',
                                        '&:hover': {
                                            bgcolor: hasChanges ? 'primary.dark' : 'action.disabledBackground'
                                        }
                                    }}
                                >
                                    Apply Changes
                                    {hasChanges && (
                                        <Chip
                                            label="Unsaved"
                                            size="small"
                                            sx={{
                                                ml: 2,
                                                bgcolor: 'warning.main',
                                                color: 'white',
                                                height: 20
                                            }}
                                        />
                                    )}
                                </Button>
                                {hasChanges && (
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onClick={handleResetChanges}
                                    >
                                        Reset Changes
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Custom Date Dialog */}
            <Dialog open={showCustomDialog} onClose={() => setShowCustomDialog(false)}>
                <DialogTitle>Set Custom Duration</DialogTitle>
                <DialogContent>
                    <TextField
                        label="End Date"
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarToday fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowCustomDialog(false);
                        setOverrideDuration('today');
                    }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCustomDateSubmit}
                        variant="contained"
                        disabled={!customDate}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Notification */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    onChange={(e) => setBudgetIncrease(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ width: 200 }}
                                />
                </Box>
            </CardContent>
        </Card>
                </Grid >

        {/* Right Column - Overrides */ }
        < Grid size = {{ xs: 12, md: 4 }
}>
    <Card>
        <CardContent>
            <Typography variant="h6" fontWeight="600" gutterBottom>
                Overrides
            </Typography>

            {/* Override Durations */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" fontWeight="600" gutterBottom>
                    Override Durations
                </Typography>
                <RadioGroup
                    value={overrideDuration}
                    onChange={(e) => handleOverrideDurationChange(e.target.value)}
                >
                    <FormControlLabel
                        value="today"
                        control={<Radio size="small" />}
                        label="Today only"
                    />
                    <FormControlLabel
                        value="1week"
                        control={<Radio size="small" />}
                        label="1 week"
                    />
                    <FormControlLabel
                        value="custom"
                        control={<Radio size="small" />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <span>Custom</span>
                                {overrideDuration === 'custom' && customDate && (
                                    <Chip label={customDate} size="small" />
                                )}
                            </Box>
                        }
                    />
                </RadioGroup>
            </Box>

            {/* Channel Boost */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" fontWeight="600" gutterBottom>
                    Channel Boost
                </Typography>
                <RadioGroup
                    value={channelBoost}
                    onChange={(e) => setChannelBoost(e.target.value)}
                >
                    <FormControlLabel
                        value="sms"
                        control={<Radio size="small" />}
                        label="SMS"
                    />
                    <FormControlLabel
                        value="whatsapp"
                        control={<Radio size="small" />}
                        label="WhatsApp"
                    />
                    <FormControlLabel
                        value="rcs"
                        control={<Radio size="small" />}
                        label="RCS"
                    />
                </RadioGroup>
            </Box>

            {/* Focus */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" fontWeight="600" gutterBottom>
                    Focus
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                    >
                        <MenuItem value="monitored">Monitored</MenuItem>
                        <MenuItem value="aggressive">Aggressive</MenuItem>
                        <MenuItem value="conservative">Conservative</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleApplyChanges}
                    disabled={!hasChanges}
                    sx={{
                        bgcolor: hasChanges ? 'primary.main' : 'action.disabledBackground',
                        '&:hover': {
                            bgcolor: hasChanges ? 'primary.dark' : 'action.disabledBackground'
                        }
                    }}
                >
                    Apply Changes
                    {hasChanges && (
                        <Chip
                            label="Unsaved"
                            size="small"
                            sx={{
                                ml: 2,
                                bgcolor: 'warning.main',
                                color: 'white',
                                height: 20
                            }}
                        />
                    )}
                </Button>
                {hasChanges && (
                    <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        onClick={handleResetChanges}
                    >
                        Reset Changes
                    </Button>
                )}
            </Box>
        </CardContent>
    </Card>
                </Grid >
            </Grid >

    {/* Custom Date Dialog */ }
    < Dialog open = { showCustomDialog } onClose = {() => setShowCustomDialog(false)}>
                <DialogTitle>Set Custom Duration</DialogTitle>
                <DialogContent>
                    <TextField
                        label="End Date"
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarToday fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowCustomDialog(false);
                        setOverrideDuration('today');
                    }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCustomDateSubmit}
                        variant="contained"
                        disabled={!customDate}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog >

    {/* Success Notification */ }
    < Snackbar
open = { showSuccess }
autoHideDuration = { 3000}
onClose = {() => setShowSuccess(false)}
anchorOrigin = {{ vertical: 'bottom', horizontal: 'right' }}
            >
    <Alert
        onClose={() => setShowSuccess(false)}
        severity="success"
        sx={{ width: '100%' }}
        variant="filled"
    >
        Changes applied successfully! Your updates are now live.
    </Alert>
            </Snackbar >

    {/* AI Chat Assistant */ }
    < Card sx = {{
    mt: 4,
        border: '2px solid',
            borderColor: 'primary.main',
                boxShadow: 3
}}>
    <CardContent sx={{ bgcolor: '#F8F9FA' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#4CAF50',
                boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)'
            }} />
            <Typography variant="h6" fontWeight="600">
                💬 AI Assistant
            </Typography>
            <Chip label="Beta" size="small" color="primary" sx={{ ml: 1, height: 22 }} />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
            🤖 Ask me anything about this use case - performance analysis, optimization suggestions, or configuration help
        </Typography>

        <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="e.g., Why is my conversion rate at 12%? How can I improve it?"
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                    boxShadow: 1
                }
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{ alignSelf: 'flex-end', mb: 1 }}>
                        <IconButton size="medium" color="primary" sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}>
                            <Send />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />

        <Box sx={{ mt: 3 }}>
            <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                💡 Quick Suggestions:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                    label="📊 Analyze Performance"
                    size="medium"
                    variant="outlined"
                    clickable
                    color="primary"
                />
                <Chip
                    label="⚡ Suggest Optimizations"
                    size="medium"
                    variant="outlined"
                    clickable
                    color="primary"
                />
                <Chip
                    label="🎯 Compare to Target"
                    size="medium"
                    variant="outlined"
                    clickable
                    color="primary"
                />
                <Chip
                    label="💰 Budget Recommendations"
                    size="medium"
                    variant="outlined"
                    clickable
                    color="primary"
                />
            </Box>
        </Box>
    </CardContent>
            </Card >
        </Box >
    );
}
