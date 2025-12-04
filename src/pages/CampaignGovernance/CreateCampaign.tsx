import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Stack,
    Avatar
} from '@mui/material';
import {
    Send,
    Add,
    Close,
    Refresh,
    Lightbulb,
    Person,
    Message,
    Schedule,
    SmartToy
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// --- Types ---
interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

interface LocationState {
    segmentName?: string;
    query?: string;
    audienceSize?: number;
    category?: string;
}

// --- Components ---

const SectionHeader = ({ icon, title, subtitle, color }: { icon: React.ReactNode, title: string, subtitle?: string, color: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{
            bgcolor: color,
            color: 'white',
            p: 0.5,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24
        }}>
            {icon}
        </Box>
        <Typography variant="subtitle2" fontWeight="700">
            {title}
        </Typography>
        {subtitle && (
            <Typography variant="caption" color="text.secondary">
                {subtitle}
            </Typography>
        )}
    </Box>
);

const CanvasSection = ({ children, color, title, icon, subtitle }: { children: React.ReactNode, color: string, title: string, icon: React.ReactNode, subtitle?: string }) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            mb: 2,
            bgcolor: `${color}08`, // Very light opacity
            border: '1px solid',
            borderColor: `${color}30`,
            borderRadius: 2
        }}
    >
        <SectionHeader icon={icon} title={title} subtitle={subtitle} color={color} />
        {children}
    </Paper>
);

export default function CreateCampaign() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    // Form State
    const [channel, setChannel] = useState('WhatsApp');
    const [campaignName, setCampaignName] = useState('');
    const [title, setTitle] = useState('');

    // Start Here
    const [qualification, setQualification] = useState('live_behavior');
    const [provider, setProvider] = useState('Infobip');
    const [conversionTracking, setConversionTracking] = useState(false);

    // Who
    const [segment, setSegment] = useState('');
    const [controlGroup, setControlGroup] = useState(false);

    // What
    const [messageType, setMessageType] = useState('single');
    const [templateName, setTemplateName] = useState('');

    // When
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('09:00');
    const [throttle, setThrottle] = useState('global');

    // Initialize from state
    useEffect(() => {
        if (state?.segmentName) {
            // Pre-fill segment and campaign name
            setSegment(state.segmentName);
            setCampaignName(`${state.segmentName} Campaign`);

            // Auto-fill schedule to tomorrow at 10:00 AM
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setScheduleDate(tomorrow.toISOString().split('T')[0]);
            setScheduleTime('10:00');

            // Set a default title
            setTitle(`Campaign for ${state.segmentName}`);

            // Add initial AI message
            setMessages([{
                id: 'init',
                sender: 'ai',
                text: `✅ Campaign initialized with:\n• Segment: "${state.segmentName}" (${state.audienceSize?.toLocaleString()} users)\n• Schedule: Tomorrow at 10:00 AM\n• Channel: WhatsApp\n\nYou can modify these settings or ask me to update anything!`,
                timestamp: new Date()
            }]);
        } else {
            setMessages([{
                id: 'init',
                sender: 'ai',
                text: `Hello! I can help you configure your campaign. Start by telling me your goals or selecting a channel.`,
                timestamp: new Date()
            }]);
        }
    }, [state]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputMessage,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');

        // Simulate AI processing and updating form
        setTimeout(() => {
            const lowerMsg = inputMessage.toLowerCase();
            let updates: string[] = [];

            // Channel updates
            if (lowerMsg.includes('whatsapp')) {
                setChannel('WhatsApp');
                updates.push("Channel → WhatsApp");
            } else if (lowerMsg.includes('sms')) {
                setChannel('SMS');
                updates.push("Channel → SMS");
            } else if (lowerMsg.includes('email')) {
                setChannel('Email');
                updates.push("Channel → Email");
            }

            // Schedule updates
            if (lowerMsg.includes('tomorrow')) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setScheduleDate(tomorrow.toISOString().split('T')[0]);
                updates.push("Schedule Date → Tomorrow");
            } else if (lowerMsg.includes('today')) {
                const today = new Date();
                setScheduleDate(today.toISOString().split('T')[0]);
                updates.push("Schedule Date → Today");
            } else if (lowerMsg.includes('next week')) {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                setScheduleDate(nextWeek.toISOString().split('T')[0]);
                updates.push("Schedule Date → Next Week");
            }

            // Time updates
            if (lowerMsg.includes('morning') || lowerMsg.includes('10 am') || lowerMsg.includes('10am')) {
                setScheduleTime('10:00');
                updates.push("Time → 10:00 AM");
            } else if (lowerMsg.includes('afternoon') || lowerMsg.includes('2 pm') || lowerMsg.includes('2pm')) {
                setScheduleTime('14:00');
                updates.push("Time → 2:00 PM");
            } else if (lowerMsg.includes('evening') || lowerMsg.includes('6 pm') || lowerMsg.includes('6pm')) {
                setScheduleTime('18:00');
                updates.push("Time → 6:00 PM");
            }

            // Campaign name/title updates
            if (lowerMsg.includes('name') && lowerMsg.includes('change')) {
                setCampaignName("Updated Campaign Name");
                updates.push("Campaign Name → Updated");
            }

            if (lowerMsg.includes('title')) {
                setTitle("Exclusive Offer for You");
                updates.push("Title → Updated");
            }

            // Create response
            let responseText;
            if (updates.length > 0) {
                responseText = `✅ Updated:\n${updates.map(u => `• ${u}`).join('\n')}`;
            } else {
                responseText = "I understood your request. Could you be more specific? For example:\n• 'Change channel to SMS'\n• 'Schedule for tomorrow morning'\n• 'Update the title'";
            }

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'ai',
                text: responseText,
                timestamp: new Date()
            }]);
        }, 800);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 64, // AppBar height
                left: 260, // Drawer width
                right: 0,
                bottom: 0,
                display: 'flex',
                bgcolor: '#f8f9fa',
                '@media (max-width: 600px)': {
                    left: 0,
                }
            }}
        >

            {/* Left: Chat Interface */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {/* Chat Area */}
                <Box sx={{ flex: 1, p: 4, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: messages.length === 0 ? 'center' : 'flex-start' }}>
                    {messages.length === 0 ? (
                        <Box sx={{ textAlign: 'center', opacity: 0.6 }}>
                            <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                                <SmartToy sx={{ fontSize: 30 }} />
                            </Avatar>
                            <Typography variant="h5" gutterBottom fontWeight="600">
                                Campaign Assistant
                            </Typography>
                            <Typography variant="body1">
                                Describe your campaign goals, and I'll help you configure the settings.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 2, pb: 10 }}>
                            {messages.map((msg) => (
                                <Paper
                                    key={msg.id}
                                    elevation={msg.sender === 'user' ? 0 : 1}
                                    sx={{
                                        p: 2,
                                        maxWidth: '70%',
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                                        color: msg.sender === 'user' ? 'white' : 'text.primary',
                                        borderRadius: 2,
                                        borderTopRightRadius: msg.sender === 'user' ? 0 : 2,
                                        borderTopLeftRadius: msg.sender === 'ai' ? 0 : 2
                                    }}
                                >
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{msg.text}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 3, width: '100%', maxWidth: 900, mx: 'auto', bgcolor: '#f8f9fa' }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 4,
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        <IconButton sx={{ p: '10px', color: 'orange' }} aria-label="add">
                            <Add />
                        </IconButton>
                        <TextField
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Type here..."
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <IconButton type="button" sx={{ p: '10px', color: 'orange' }} aria-label="send" onClick={handleSendMessage}>
                            <Send />
                        </IconButton>
                    </Paper>
                </Box>
            </Box>

            {/* Right: Campaign Canvas */}
            <Box sx={{
                width: 450,
                bgcolor: 'white',
                borderLeft: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <Typography variant="h6" fontWeight="700">
                        Campaign Canvas
                    </Typography>
                    <IconButton size="small" onClick={() => navigate(-1)}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Scrollable Form */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>

                    {/* Top Fields */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Channel</Typography>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
                                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                                <MenuItem value="SMS">SMS</MenuItem>
                                <MenuItem value="Email">Email</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Campaign Name</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter campaign name"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Title</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter campaign title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>

                    {/* Orange Section: Start Here */}
                    <CanvasSection
                        color="#ed6c02"
                        title="Start here"
                        icon={<Lightbulb sx={{ fontSize: 16 }} />}
                    >
                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Qualification Criteria</Typography>
                        <RadioGroup value={qualification} onChange={(e) => setQualification(e.target.value)}>
                            <FormControlLabel value="past_behavior" control={<Radio size="small" />} label={<Typography variant="body2">Past behavior/Custom list</Typography>} />
                            <FormControlLabel value="live_behavior" control={<Radio size="small" />} label={<Typography variant="body2">Live behavior</Typography>} />
                            <FormControlLabel value="external_trigger" control={<Radio size="small" />} label={<Typography variant="body2">External Trigger</Typography>} />
                        </RadioGroup>

                        {channel === 'WhatsApp' && (
                            <>
                                <Typography variant="caption" fontWeight="600" sx={{ mt: 2, mb: 1, display: 'block' }}>WhatsApp Service Provider</Typography>
                                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                    <Select value={provider} onChange={(e) => setProvider(e.target.value)}>
                                        <MenuItem value="Infobip">Infobip</MenuItem>
                                        <MenuItem value="Twilio">Twilio</MenuItem>
                                        <MenuItem value="Gupshup">Gupshup</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )}

                        <Typography variant="caption" fontWeight="600" sx={{ mt: 1, mb: 0.5, display: 'block' }}>Set a Goal</Typography>
                        <FormControlLabel
                            control={<Checkbox size="small" checked={conversionTracking} onChange={(e) => setConversionTracking(e.target.checked)} />}
                            label={<Typography variant="body2">Conversion Tracking</Typography>}
                        />
                    </CanvasSection>

                    {/* Purple Section: Who */}
                    <CanvasSection
                        color="#9c27b0"
                        title="Who"
                        subtitle="Select target segment"
                        icon={<Person sx={{ fontSize: 16 }} />}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="caption" fontWeight="600">Target Segment</Typography>
                            <Refresh sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
                        </Box>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <Select
                                value={segment}
                                onChange={(e) => setSegment(e.target.value)}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <Typography variant="body2" color="text.secondary">Select a segment</Typography>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="High-Value Prospects">High-Value Prospects</MenuItem>
                                <MenuItem value="Dormant Users">Dormant Users</MenuItem>
                                <MenuItem value="AI Generated Segment">AI Generated Segment</MenuItem>
                                {state?.segmentName && <MenuItem value={state.segmentName}>{state.segmentName}</MenuItem>}
                            </Select>
                        </FormControl>

                        <Typography variant="caption" fontWeight="600" sx={{ mb: 0.5, display: 'block' }}>Control Group and Target Segment Cap</Typography>
                        <FormControlLabel
                            control={<Checkbox size="small" checked={controlGroup} onChange={(e) => setControlGroup(e.target.checked)} />}
                            label={<Typography variant="body2">System control group: 5%</Typography>}
                        />
                    </CanvasSection>

                    {/* Pink Section: What */}
                    <CanvasSection
                        color="#e91e63"
                        title="What"
                        subtitle="Create message"
                        icon={<Message sx={{ fontSize: 16 }} />}
                    >
                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Message Type</Typography>
                        <RadioGroup row value={messageType} onChange={(e) => setMessageType(e.target.value)}>
                            <FormControlLabel value="single" control={<Radio size="small" />} label={<Typography variant="body2">Single Message</Typography>} />
                            <FormControlLabel value="carousel" control={<Radio size="small" />} label={<Typography variant="body2">Carousel</Typography>} />
                        </RadioGroup>

                        <Typography variant="caption" fontWeight="600" sx={{ mt: 2, mb: 1, display: 'block' }}>Template Name <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter template name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                        />
                    </CanvasSection>

                    {/* Yellow Section: When */}
                    <CanvasSection
                        color="#fbc02d"
                        title="When"
                        subtitle="Set delivery preferences"
                        icon={<Schedule sx={{ fontSize: 16 }} />}
                    >
                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Date and time</Typography>
                        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Schedule Date <span style={{ color: 'red' }}>*</span></Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Schedule Time <span style={{ color: 'red' }}>*</span></Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="time"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </Stack>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Cannot select past dates</Typography>

                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Delivery Preferences</Typography>
                        <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: 'block' }}>Throttle Limits</Typography>

                        <RadioGroup value={throttle} onChange={(e) => setThrottle(e.target.value)}>
                            <FormControlLabel value="global" control={<Radio size="small" />} label={<Typography variant="body2">Global limit</Typography>} />
                            <FormControlLabel value="adhoc" control={<Radio size="small" />} label={<Typography variant="body2">Ad Hoc limit</Typography>} />
                        </RadioGroup>

                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label={<Typography variant="body2">Do Not Disturb (DND)</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label={<Typography variant="body2">Cut-off</Typography>}
                        />
                    </CanvasSection>

                </Box>

                {/* Footer Buttons */}
                <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 2, flexShrink: 0 }}>
                    <Button variant="contained" color="inherit" fullWidth sx={{ bgcolor: '#e0e0e0', color: 'text.primary' }}>
                        Save Draft
                    </Button>
                    <Button variant="contained" color="warning" fullWidth sx={{ color: 'white' }}>
                        Save & Deploy
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
