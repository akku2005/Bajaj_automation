import React, { useState, useEffect, useCallback } from 'react';
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
    InputAdornment,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Paper
} from '@mui/material';
import { Edit, ArrowBack, CalendarToday, Send, Close, SmartToy, Person } from '@mui/icons-material';
import { useUseCaseStore } from '../../stores/useCaseStore';
import type { UseCaseOverrides } from '../../types/useCase';
import ProgressCards from '../../components/ProgressCards';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function UseCaseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useCases, updateUseCase, getUseCaseById } = useUseCaseStore();
    const useCase = getUseCaseById(id || '');

    // Local state for form inputs
    const [targetGroup, setTargetGroup] = useState('5');
    const [budgetIncrease, setBudgetIncrease] = useState('10000');
    const [overrideDuration, setOverrideDuration] = useState<UseCaseOverrides['overrideDuration']>('today');
    const [channelBoost, setChannelBoost] = useState<UseCaseOverrides['channelBoost']>('sms');
    const [focus, setFocus] = useState<UseCaseOverrides['focus']>('monitored');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCustomDialog, setShowCustomDialog] = useState(false);
    const [customDate, setCustomDate] = useState('');

    // Chat State
    const [chatInput, setChatInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isAiTyping, setIsAiTyping] = useState(false);

    const simulateAIResponse = (userText: string) => {
        setIsAiTyping(true);
        setTimeout(() => {
            const aiMsg: ChatMessage = {
                id: Date.now().toString(),
                text: `I've analyzed "${userText}". Based on current trends, I recommend increasing the budget by 15% to maximize AIP.`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsAiTyping(false);
        }, 1500);
    };

    const handleChatSend = () => {
        if (!chatInput.trim()) return;

        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            text: chatInput,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setChatInput('');
        setIsChatOpen(true);
        simulateAIResponse(chatInput);
    };

    // Drawer Resize Logic
    const [drawerWidth, setDrawerWidth] = useState(400);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = document.body.clientWidth - mouseMoveEvent.clientX;
                if (newWidth > 300 && newWidth < 800) {
                    setDrawerWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    const [drawerInput, setDrawerInput] = useState('');

    const handleDrawerSend = () => {
        if (!drawerInput.trim()) return;

        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            text: drawerInput,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setDrawerInput('');
        simulateAIResponse(drawerInput);
    };

    // Track if there are unsaved changes
    const [hasChanges, setHasChanges] = useState(false);

    // Track initial values to detect changes
    const [initialValues, setInitialValues] = useState<{
        targetGroup: string;
        budgetIncrease: string;
        overrideDuration: UseCaseOverrides['overrideDuration'];
        channelBoost: UseCaseOverrides['channelBoost'];
        focus: UseCaseOverrides['focus'];
    }>({
        targetGroup: '5',
        budgetIncrease: '10000',
        overrideDuration: 'today',
        channelBoost: 'sms',
        focus: 'monitored'
    });

    useEffect(() => {
        const changed =
            targetGroup !== initialValues.targetGroup ||
            budgetIncrease !== initialValues.budgetIncrease ||
            overrideDuration !== initialValues.overrideDuration ||
            channelBoost !== initialValues.channelBoost ||
            focus !== initialValues.focus;
        setHasChanges(changed);
    }, [targetGroup, budgetIncrease, overrideDuration, channelBoost, focus, initialValues]);

    const handleOverrideDurationChange = (value: string) => {
        if (value === 'custom') {
            setShowCustomDialog(true);
        } else {
            setOverrideDuration(value as UseCaseOverrides['overrideDuration']);
        }
    };

    const handleCustomDateSubmit = () => {
        if (customDate) {
            setOverrideDuration('custom');
            setShowCustomDialog(false);
        }
    };

    const handleApplyChanges = () => {
        if (useCase) {
            // Update the use case in the store
            updateUseCase(useCase.id, {
                todayGroup: {
                    improveAppBy: parseInt(targetGroup),
                    percentage: parseInt(targetGroup)
                },
                budgetAdjustment: {
                    increaseSpendBy: parseInt(budgetIncrease)
                },
                overrides: {
                    overrideDuration,
                    channelBoost,
                    focus
                }
            });

            // Update initial values to new current values
            setInitialValues({
                targetGroup,
                budgetIncrease,
                overrideDuration,
                channelBoost,
                focus
            });

            setShowSuccess(true);
            setHasChanges(false);
        }
    };

    const handleResetChanges = () => {
        setTargetGroup(initialValues.targetGroup);
        setBudgetIncrease(initialValues.budgetIncrease);
        setOverrideDuration(initialValues.overrideDuration);
        setChannelBoost(initialValues.channelBoost);
        setFocus(initialValues.focus);
        setHasChanges(false);
    };

    const suggestions = [
        { label: "📊 Analyze Performance", text: "Analyze the performance of this use case." },
        { label: "⚡ Suggest Optimizations", text: "Suggest optimizations for this use case." },
        { label: "🎯 Compare to Target", text: "Compare the current performance to the target." },
        { label: "💰 Budget Recommendations", text: "What are your budget recommendations?" },
        { label: "👥 Audience Insights", text: "Provide insights on the target audience." },
        { label: "📝 Content Strategy", text: "Suggest a content strategy for this campaign." },
        { label: "🔍 Competitor Analysis", text: "Perform a competitor analysis." },
        { label: "📅 Schedule Review", text: "Review the current schedule." }
    ];

    const handleSuggestionClick = (text: string) => {
        setChatInput(text);
    };

    if (!useCase) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography>Use case not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', minHeight: 'calc(100vh - 100px)' }}>
            <Box sx={{ flex: 1, p: 4, minWidth: 0 }}>
                {/* Header */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/use-cases')}>
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" fontWeight="700">
                            {useCase.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Goal: {useCase.goal}
                        </Typography>
                    </Box>
                    <Chip
                        label={useCase.status === 'active' ? 'Active' : 'Inactive'}
                        color={useCase.status === 'active' ? 'success' : 'default'}
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Left Column - Metrics */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Quarterly Goal & Budget */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="h6" fontWeight="600" gutterBottom>
                                            Quarterly Goal
                                        </Typography>
                                        <Typography variant="h3" fontWeight="700" color="primary.main">
                                            {useCase.goal}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="h6" fontWeight="600" gutterBottom>
                                            Budget
                                        </Typography>
                                        <Typography variant="h3" fontWeight="700">
                                            {useCase.budget}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Progress Tracking Cards */}
                        <Box sx={{ mb: 3 }}>
                            <ProgressCards
                                quarterlyGoal={useCase.goal}
                                actual={useCase.currentPerformance.actual}
                                expectedProgress={useCase.currentPerformance.expectedProgress}
                                conversionForecast={useCase.currentPerformance.conversionForecast}
                                startDate="2025-10-01"
                                endDate="2025-12-31"
                            />
                        </Box>

                        {/* Today Group */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="600" gutterBottom>
                                    Today Group
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                    <Typography variant="body2">Improve Aip by</Typography>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={targetGroup}
                                        onChange={(e) => setTargetGroup(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        sx={{ width: 100 }}
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
                                    <Typography variant="body2">Increase Spend by</Typography>
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
                                        onChange={(e) => setChannelBoost(e.target.value as UseCaseOverrides['channelBoost'])}
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
                                            onChange={(e) => setFocus(e.target.value as UseCaseOverrides['focus'])}
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
                        Changes applied successfully! Your updates are now live.
                    </Alert>
                </Snackbar>

                {/* AI Chat Assistant */}
                {!isChatOpen && (
                    <Card sx={{
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
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleChatSend();
                                    }
                                }}
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
                                            <IconButton
                                                size="medium"
                                                color="primary"
                                                onClick={handleChatSend}
                                                disabled={!chatInput.trim()}
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    '&:hover': { bgcolor: 'primary.dark' },
                                                    '&.Mui-disabled': { bgcolor: 'action.disabledBackground' }
                                                }}
                                            >
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
                                    {suggestions.map((suggestion, index) => (
                                        <Chip
                                            key={index}
                                            label={suggestion.label}
                                            size="medium"
                                            variant="outlined"
                                            clickable
                                            color="primary"
                                            onClick={() => handleSuggestionClick(suggestion.text)}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                )}

            </Box >

            {/* AI Chat Panel */}
            {
                isChatOpen && (
                    <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)', position: 'sticky', top: 20 }}>
                        {/* Resize Handle */}
                        <Box
                            onMouseDown={startResizing}
                            sx={{
                                width: 10,
                                cursor: 'ew-resize',
                                bgcolor: isResizing ? 'primary.main' : 'transparent',
                                '&:hover': { bgcolor: 'primary.light' },
                                height: '100%',
                                zIndex: 1201
                            }}
                        />

                        {/* Main Content */}
                        <Paper elevation={3} sx={{ width: drawerWidth, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                            {/* Header */}
                            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SmartToy />
                                    <Typography variant="h6">AI Assistant</Typography>
                                </Box>
                                <IconButton onClick={() => setIsChatOpen(false)} sx={{ color: 'white' }}>
                                    <Close />
                                </IconButton>
                            </Box>

                            {/* Messages Area */}
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {messages.map((msg) => (
                                    <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                        <Box sx={{ display: 'flex', gap: 1, maxWidth: '80%', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main' }}>
                                                {msg.sender === 'user' ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
                                            </Avatar>
                                            <Paper sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? 'primary.light' : 'white', color: msg.sender === 'user' ? 'white' : 'text.primary', borderRadius: 2 }}>
                                                <Typography variant="body2">{msg.text}</Typography>
                                                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontSize: '0.7rem', textAlign: 'right' }}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    </Box>
                                ))}
                                {isAiTyping && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Box sx={{ display: 'flex', gap: 1, maxWidth: '80%' }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                                <SmartToy fontSize="small" />
                                            </Avatar>
                                            <Paper sx={{ p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
                                                <Typography variant="body2" color="text.secondary">AI is typing...</Typography>
                                            </Paper>
                                        </Box>
                                    </Box>
                                )}
                            </Box>

                            {/* Drawer Input Area */}
                            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'white' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    placeholder="Type a message..."
                                    value={drawerInput}
                                    onChange={(e) => setDrawerInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleDrawerSend();
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleDrawerSend} disabled={!drawerInput.trim()} color="primary">
                                                    <Send />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    size="small"
                                />
                            </Box>
                        </Paper>
                    </Box>
                )
            }
        </Box >
    );
}
