import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Fab,
    Paper,
    TextField,
    Typography,
    IconButton,
    Avatar,
    Chip,
    Collapse,
    Button,
    Stack,
    Divider,
    CircularProgress
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    Send as SendIcon,
    Psychology as AIIcon,
    TrendingUp,
    Campaign,
    AttachMoney,
    CheckCircle,
    Info,
    Warning
} from '@mui/icons-material';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    suggestions?: string[];
    data?: any;
}

export default function AIChatAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hi! I\'m your AI Campaign Assistant. I can help you check campaign status, modify budgets, analyze performance, and answer questions about your campaigns. What would you like to know?',
            sender: 'ai',
            timestamp: new Date(),
            suggestions: [
                'Show me overlapping campaigns',
                'What\'s my total budget?',
                'Increase budget for C001 to ₹300K',
                'Which campaign has highest AIP?'
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulated AI response generator
    const generateAIResponse = (userMessage: string): Message => {
        const lowerMessage = userMessage.toLowerCase();

        // Budget queries
        if (lowerMessage.includes('budget') && (lowerMessage.includes('total') || lowerMessage.includes('overall'))) {
            return {
                id: Date.now().toString(),
                text: '💰 **Budget Overview:**\n\n• Total Budget: ₹1,310,000\n• Total Spent: ₹928,000 (71%)\n• Remaining: ₹382,000\n\n**Breakdown by Team:**\n• WhatsApp: ₹418K / ₹570K (73%)\n• SMS: ₹235K / ₹330K (71%)\n• RCS: ₹275K / ₹420K (65%)\n\nWould you like to adjust any budgets?',
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Increase budget for top performers',
                    'Reduce budget for low ROI campaigns',
                    'Show budget by campaign'
                ]
            };
        }

        // Overlapping campaigns
        if (lowerMessage.includes('overlap')) {
            return {
                id: Date.now().toString(),
                text: '⚠️ **Campaign Overlap Alert:**\n\n**5 campaigns** have overlapping audiences:\n\n🔴 **High Overlap (70%+):**\n• C001 ↔ C002 (78% overlap) - Same S1 segment\n• C001 ↔ C005 (85% overlap) - Same S1 segment\n• C002 ↔ C005 (78% overlap) - Same S1 segment\n\n🟠 **Medium Overlap (40-70%):**\n• C004 ↔ C006 (45% overlap) - Insurance customers\n\n**Wasted Spend:** ₹240K (28% of total budget)\n\nShall I suggest a resolution strategy?',
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Suggest resolution',
                    'Merge similar campaigns',
                    'Auto-deduplicate audiences'
                ]
            };
        }

        // Budget modification
        if (lowerMessage.includes('increase') && lowerMessage.includes('budget')) {
            const campaignMatch = lowerMessage.match(/c\d{3}/i);
            const amountMatch = lowerMessage.match(/₹?(\d+)k?/i);

            if (campaignMatch && amountMatch) {
                const campaign = campaignMatch[0].toUpperCase();
                const amount = amountMatch[1];

                return {
                    id: Date.now().toString(),
                    text: `✅ **Budget Updated Successfully!**\n\n**Campaign:** ${campaign} - Personal Loan High CIBIL Push\n\n**Changes:**\n• Previous Budget: ₹250,000\n• New Budget: ₹${amount},000\n• Increase: ₹${parseInt(amount) - 250},000 (+${Math.round(((parseInt(amount) - 250) / 250) * 100)}%)\n\n**Impact Forecast:**\n• Additional Reach: ~${Math.round((parseInt(amount) - 250) * 0.5)}K users\n• Projected AIP Increase: +${Math.round((parseInt(amount) - 250) * 0.12)}\n\n**Budget Status:**\n• Total Budget Used: ${Math.round(((928 + (parseInt(amount) - 250)) / 1310) * 100)}%\n• Remaining: ₹${382 - (parseInt(amount) - 250)}K\n\nWould you like me to reallocate from lower-performing campaigns?`,
                    sender: 'ai',
                    timestamp: new Date(),
                    suggestions: [
                        'Show updated forecast',
                        'Reallocate from low performers',
                        'Approve changes'
                    ]
                };
            }
        }

        // Performance queries
        if (lowerMessage.includes('performance') || lowerMessage.includes('aip') || lowerMessage.includes('highest')) {
            return {
                id: Date.now().toString(),
                text: '📊 **Top Performing Campaigns:**\n\n🥇 **C005 - RCS Rich Media** (WhatsApp)\n• AIP: 48% (+215% vs control)\n• Revenue: ₹42.5Cr\n• ROI: 412%\n\n🥈 **C001 - High CIBIL Push** (WhatsApp)\n• AIP: 45% (+200% vs control)\n• Revenue: ₹38.2Cr\n• ROI: 385%\n\n🥉 **C003 - Credit Card Metro** (RCS)\n• AIP: 35% (+140% vs control)\n• Revenue: ₹28.5Cr\n• ROI: 298%\n\n**Key Insight:** WhatsApp campaigns are outperforming SMS by 2.3x on AIP conversion.\n\nWant to shift more budget to WhatsApp?',
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Shift budget to WhatsApp',
                    'Show channel comparison',
                    'Optimize underperformers'
                ]
            };
        }

        // AI recommendations
        if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('optimize')) {
            return {
                id: Date.now().toString(),
                text: '🤖 **AI Recommendations:**\n\n**1. Consolidate Overlapping Campaigns** 🎯\n• Merge C001, C002, C005 → Single S1 segment campaign\n• Potential Savings: ₹180K/month\n• Improved User Experience: -60% message fatigue\n\n**2. Shift Budget to High Performers** 💰\n• Increase C005 (RCS) budget by ₹150K\n• Reduce C004 (Insurance) budget by ₹150K\n• Projected Impact: +45 AIP, +₹8.2Cr revenue\n\n**3. Channel Optimization** 📱\n• Route 65% of users to WhatsApp (highest engagement)\n• Use SMS for Tier 2 cities (lower cost, similar conversion)\n• Reserve RCS for high-value segments\n\n**4. Partner Mix Optimization** 🏦\n• Increase Federal Bank allocation (+18% margin)\n• Reduce Axis Bank allocation (-14% margin)\n• Impact: +₹4.5Cr profit margin\n\nShall I implement these changes?',
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Implement all recommendations',
                    'Show detailed impact',
                    'Apply selectively'
                ]
            };
        }

        // Campaign details
        if (lowerMessage.match(/c\d{3}/i)) {
            const campaign = lowerMessage.match(/c\d{3}/i)?.[0].toUpperCase();
            return {
                id: Date.now().toString(),
                text: `📋 **Campaign Details: ${campaign}**\n\n**Name:** Personal Loan - High CIBIL Push\n**Team:** WhatsApp\n**Status:** 🟢 Active\n\n**Performance:**\n• Target Users: 125,000\n• AIP: 45% (+200% vs control)\n• Budget: ₹180K / ₹250K (72% used)\n• Spent per AIP: ₹320 (vs ₹665 benchmark)\n\n**Segment:** S1 (CIBIL > 750)\n**Product:** Personal Loan\n**Channel:** WhatsApp\n\n⚠️ **Alert:** 78% overlap with C002, C005\n**Impact:** ~₹140K wasted on duplicate targeting\n\n**Top Partners:**\n1. Federal Bank (94% approval, 18% margin)\n2. ICICI (89% approval, 16% margin)\n\nWhat would you like to modify?`,
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Resolve overlap',
                    'Change budget',
                    'Adjust target segment',
                    'View detailed metrics'
                ]
            };
        }

        // Channel comparison
        if (lowerMessage.includes('channel') && (lowerMessage.includes('compare') || lowerMessage.includes('which'))) {
            return {
                id: Date.now().toString(),
                text: '📱 **Channel Performance Comparison:**\n\n**WhatsApp:**\n• AIP Conversion: 45% ⭐\n• Cost per AIP: ₹285\n• Engagement Rate: 78%\n• Best for: High-value users, S1 segment\n\n**SMS:**\n• AIP Conversion: 28%\n• Cost per AIP: ₹320\n• Engagement Rate: 42%\n• Best for: Tier 2 cities, cost optimization\n\n**RCS:**\n• AIP Conversion: 35%\n• Cost per AIP: ₹380\n• Engagement Rate: 58%\n• Best for: Rich media, metro cities\n\n**Recommendation:** WhatsApp has 61% higher AIP than SMS and 18% lower cost. Shift high-value segments to WhatsApp for maximum ROI.',
                sender: 'ai',
                timestamp: new Date(),
                suggestions: [
                    'Optimize channel mix',
                    'Show user preferences',
                    'Apply AI routing'
                ]
            };
        }

        // Default helpful response
        return {
            id: Date.now().toString(),
            text: 'I can help you with:\n\n• **Campaign Insights** - "Show me overlapping campaigns"\n• **Budget Management** - "Increase budget for C001 to ₹300K"\n• **Performance Analysis** - "Which campaign has highest AIP?"\n• **AI Recommendations** - "Suggest optimizations"\n• **Channel Optimization** - "Compare channel performance"\n• **Segment Details** - "Show C001 details"\n\nWhat would you like to explore?',
            sender: 'ai',
            timestamp: new Date(),
            suggestions: [
                'Show overall budget',
                'Find overlapping campaigns',
                'Performance insights',
                'AI recommendations'
            ]
        };
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = generateAIResponse(input);
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => handleSend(), 100);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                }}
                onClick={() => setOpen(!open)}
            >
                {open ? <CloseIcon /> : <ChatIcon />}
            </Fab>

            {/* Chat Window */}
            <Collapse in={open}>
                <Paper
                    elevation={8}
                    sx={{
                        position: 'fixed',
                        bottom: 100,
                        right: 24,
                        width: 420,
                        maxHeight: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 999,
                        borderRadius: 3,
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                                <AIIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight="600">
                                    AI Campaign Assistant
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Online • Powered by Gemini AI
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            bgcolor: '#f5f5f5',
                            maxHeight: 400
                        }}
                    >
                        {messages.map((message) => (
                            <Box
                                key={message.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 2
                                }}
                            >
                                {message.sender === 'ai' && (
                                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                        <AIIcon sx={{ fontSize: 20 }} />
                                    </Avatar>
                                )}
                                <Box sx={{ maxWidth: '75%' }}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 1.5,
                                            bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                                            color: message.sender === 'user' ? 'white' : 'text.primary',
                                            borderRadius: 2,
                                            whiteSpace: 'pre-line'
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {message.text}
                                        </Typography>
                                    </Paper>

                                    {message.suggestions && (
                                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                                            {message.suggestions.map((suggestion, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={suggestion}
                                                    size="small"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            bgcolor: 'primary.light',
                                                            color: 'white'
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    )}

                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        {isTyping && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                    <AIIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        AI is typing...
                                    </Typography>
                                </Paper>
                            </Box>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input */}
                    <Divider />
                    <Box sx={{ p: 2, bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Ask about campaigns, budgets, or request changes..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3
                                    }
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSend}
                                disabled={!input.trim()}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    },
                                    '&:disabled': {
                                        bgcolor: 'grey.300'
                                    }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            💡 Try: "Show overlapping campaigns" or "Increase budget for C001"
                        </Typography>
                    </Box>
                </Paper>
            </Collapse>
        </>
    );
}
