import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, WhatsApp, Message, Android, CheckCircle, AccessTime } from '@mui/icons-material';

interface UserAction {
    id: string;
    userId: string;
    segment: string;
    prediction: string;
    channel: 'WhatsApp' | 'SMS' | 'RCS' | 'Push';
    status: 'Sent' | 'Delivered' | 'Read' | 'Converted';
    timestamp: string;
}

const segments = ['S1 - High CIBIL', 'S2 - Metro', 'S3 - Tier 2', 'S4 - New to Credit'];
const predictions = ['High Propensity (95%)', 'Medium Propensity (75%)', 'Churn Risk', 'Upsell Opportunity'];
const channels = ['WhatsApp', 'SMS', 'RCS', 'Push'];

export default function LiveUserFeed() {
    const [actions, setActions] = useState<UserAction[]>([]);

    useEffect(() => {
        // Initial population
        const initialData = Array.from({ length: 5 }).map((_, i) => generateMockAction(i));
        setActions(initialData);

        // Live feed simulation
        const interval = setInterval(() => {
            setActions(prev => {
                const newAction = generateMockAction(Date.now());
                return [newAction, ...prev.slice(0, 6)]; // Keep last 7 items
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const generateMockAction = (_seed: number): UserAction => {
        const id = Math.random().toString(36).substr(2, 9);
        const userId = `U-${Math.floor(100000 + Math.random() * 900000)}`;
        const segment = segments[Math.floor(Math.random() * segments.length)];
        const prediction = predictions[Math.floor(Math.random() * predictions.length)];
        const channel = channels[Math.floor(Math.random() * channels.length)] as UserAction['channel'];

        return {
            id,
            userId,
            segment,
            prediction,
            channel,
            status: 'Sent',
            timestamp: 'Just now'
        };
    };

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case 'WhatsApp': return <WhatsApp fontSize="small" color="success" />;
            case 'SMS': return <Message fontSize="small" color="info" />;
            case 'RCS': return <Android fontSize="small" color="error" />;
            default: return <Message fontSize="small" />;
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 0, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="600">
                    Live Decision Feed
                </Typography>
                <Chip label="Live" color="error" size="small" icon={<AccessTime />} sx={{ animation: 'pulse 2s infinite' }} />
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Segment</TableCell>
                            <TableCell>AI Prediction</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody component={motion.tbody}>
                        <AnimatePresence initial={false}>
                            {actions.map((action) => (
                                <Box
                                    component={motion.tr}
                                    key={action.id}
                                    initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(33, 150, 243, 0.1)' }}
                                    animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                    layout
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{action.userId[2]}</Avatar>
                                            <Typography variant="body2" fontFamily="monospace">{action.userId}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
                                            {action.segment}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="primary.main" fontWeight="500">
                                            {action.prediction}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getChannelIcon(action.channel)}
                                            label={action.channel}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderColor: 'divider' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                            <CheckCircle fontSize="small" color="disabled" sx={{ width: 16 }} />
                                            <Typography variant="caption" color="text.secondary">{action.status}</Typography>
                                        </Box>
                                    </TableCell>
                                </Box>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </TableContainer>
            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                `}
            </style>
        </Paper>
    );
}
