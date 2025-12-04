import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Button,
    Collapse,
    Avatar,
    Chip,
    Stack,
    Divider
} from '@mui/material';
import {
    Send,
    Close,
    KeyboardArrowUp,
    KeyboardArrowDown,
    AutoAwesome,
    Insights,
    Speed,
    TrendingUp,
    Psychology,
    Bolt
} from '@mui/icons-material';
import { UseCase } from '../../types/useCase';

interface AIAssistantPanelProps {
    useCase: UseCase;
    onUpdateConfiguration: (updates: any) => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'insight' | 'action';
    actions?: { label: string; action: string }[];
}

export default function AIAssistantPanel({ useCase, onUpdateConfiguration }: AIAssistantPanelProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hi! I'm monitoring **${useCase.name}**. Performance is currently **${useCase.currentPerformance.actual}** against the ${useCase.quarterlyGoal} goal.`,
            type: 'insight'
        },
        {
            id: '2',
            role: 'assistant',
            content: 'I noticed the **SMS channel** is underperforming today. Would you like me to shift budget to WhatsApp?',
            type: 'action',
            actions: [
                { label: 'Shift Budget to WhatsApp', action: 'shift_budget' },
                { label: 'Analyze SMS Performance', action: 'analyze_sms' }
            ]
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            type: 'text'
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const response: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've analyzed the latest data. Increasing the daily budget by 15% could improve conversion volume by approx 8% based on current trends.",
                type: 'action',
                actions: [
                    { label: 'Increase Budget by 15%', action: 'increase_budget' }
                ]
            };
            setMessages(prev => [...prev, response]);
        }, 1000);
    };

    const handleAction = (action: string) => {
        if (action === 'increase_budget') {
            onUpdateConfiguration({ todayBudget: (useCase.todayBudget || 0) * 1.15 });
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: '✅ Budget updated. I will monitor the impact.',
                type: 'text'
            }]);
        } else if (action === 'shift_budget') {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: '✅ Budget shifted to WhatsApp. Expecting improved CTR within 2 hours.',
                type: 'text'
            }]);
        }
    };

    return (
        <Paper
            elevation={6}
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 24,
                width: isOpen ? 450 : 300,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                zIndex: 1200,
                transition: 'width 0.3s ease'
            }}
        >
            {/* Header */}
            <Box
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'white', color: 'primary.main', width: 28, height: 28 }}>
                        <AutoAwesome sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="600">
                        AI Campaign Manager
                    </Typography>
                    {useCase.status === 'active' && (
                        <Chip
                            label="Live"
                            size="small"
                            color="success"
                            sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#4caf50', color: 'white' }}
                        />
                    )}
                </Box>
                <IconButton size="small" sx={{ color: 'white' }}>
                    {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                </IconButton>
            </Box>

            {/* Content */}
            <Collapse in={isOpen}>
                <Box sx={{ height: 400, display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>

                    {/* Quick Stats Bar */}
                    <Box sx={{ p: 1.5, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 2, overflowX: 'auto' }}>
                        <Chip icon={<TrendingUp sx={{ fontSize: 16 }} />} label="Trend: +5%" size="small" color="success" variant="outlined" />
                        <Chip icon={<Speed sx={{ fontSize: 16 }} />} label="Pacing: On Track" size="small" color="primary" variant="outlined" />
                        <Chip icon={<Bolt sx={{ fontSize: 16 }} />} label="3 Opportunities" size="small" color="warning" variant="outlined" />
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%'
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        bgcolor: msg.role === 'user' ? 'primary.main' : 'white',
                                        color: msg.role === 'user' ? 'white' : 'text.primary',
                                        borderRadius: 2,
                                        borderTopRightRadius: msg.role === 'user' ? 0 : 2,
                                        borderTopLeftRadius: msg.role === 'assistant' ? 0 : 2,
                                        border: msg.role === 'assistant' ? '1px solid' : 'none',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                        {msg.content}
                                    </Typography>

                                    {/* Action Buttons */}
                                    {msg.actions && (
                                        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                                            {msg.actions.map((action, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<Bolt />}
                                                    onClick={() => handleAction(action.action)}
                                                    sx={{
                                                        bgcolor: 'primary.50',
                                                        borderColor: 'primary.200',
                                                        '&:hover': { bgcolor: 'primary.100' },
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    {action.label}
                                                </Button>
                                            ))}
                                        </Stack>
                                    )}
                                </Paper>
                                {msg.role === 'assistant' && (
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5, display: 'block' }}>
                                        AI Analyst • Just now
                                    </Typography>
                                )}
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={4}
                                size="small"
                                placeholder="Ask for insights or changes..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 4,
                                        bgcolor: '#f8fafc',
                                        padding: '8px 12px'
                                    }
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSend}
                                disabled={!input.trim()}
                                sx={{
                                    bgcolor: 'primary.50',
                                    '&:hover': { bgcolor: 'primary.100' },
                                    alignSelf: 'flex-end',
                                    mb: 0.5
                                }}
                            >
                                <Send fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
}
