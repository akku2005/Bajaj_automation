import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Storage,
    Analytics,
    Psychology,
    NextPlan,
    AutoFixHigh,
    Campaign,
    Person,
    Flag,
    Security,
    Loop,
    Image
} from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

interface FlowNodeProps {
    icon: SvgIconComponent;
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    delay?: number;
    width?: number;
}

const FlowNode = ({ icon: Icon, label, color = 'primary', delay = 0, width = 120 }: FlowNodeProps) => {
    const theme = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: 2, position: 'relative' }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: width,
                    minHeight: 80,
                    justifyContent: 'center',
                    textAlign: 'center',
                    border: `1px solid ${theme.palette[color].main}`,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'white',
                }}
            >
                <Icon sx={{ fontSize: 30, color: `${color}.main`, mb: 1 }} />
                <Typography variant="caption" fontWeight="600" lineHeight={1.2}>
                    {label}
                </Typography>
            </Paper>
        </motion.div>
    );
};

const AnimatedLine = ({ delay = 0, vertical = false, length = 50 }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: vertical ? 2 : length,
                height: vertical ? length : 2,
                bgcolor: 'divider',
                mx: vertical ? 0 : 1,
                my: vertical ? 1 : 0,
            }}
        >
            <motion.div
                initial={{ x: vertical ? 0 : -length, y: vertical ? -length : 0 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: vertical
                        ? 'linear-gradient(to bottom, transparent, #2196f3, transparent)'
                        : 'linear-gradient(to right, transparent, #2196f3, transparent)',
                }}
            />
        </Box>
    );
};

export default function UserJourneyFlow() {
    return (
        <Box sx={{ p: 4, overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>

                {/* Data Layer */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 300, justifyContent: 'center' }}>
                    <FlowNode icon={Storage} label="Data" color="info" delay={0} />
                </Box>

                <AnimatedLine length={40} />

                {/* Query / Analytics */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FlowNode icon={Analytics} label="Query / Analytics" color="success" delay={0.1} />
                </Box>

                <AnimatedLine length={40} />

                {/* Prediction & Decisioning */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: -100 }}>
                        <FlowNode icon={Flag} label="Goals" color="warning" delay={0.2} />
                        <Box sx={{ height: 20, borderLeft: '2px dashed #ccc', ml: 'auto', mr: 'auto', width: 2 }} />
                    </Box>
                    <FlowNode icon={Psychology} label="Prediction and AI decisioning" color="primary" delay={0.2} width={140} />
                </Box>

                <AnimatedLine length={40} />

                {/* Branching Logic */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

                    {/* Top Branch: Campaign Flow */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <Box sx={{ position: 'absolute', top: -100 }}>
                                <FlowNode icon={Security} label="Guardrails" color="error" delay={0.3} />
                                <Box sx={{ height: 20, borderLeft: '2px dashed #ccc', ml: 'auto', mr: 'auto', width: 2 }} />
                            </Box>
                            <FlowNode icon={NextPlan} label="Plan for next best offer - campaign" color="secondary" delay={0.3} width={140} />
                        </Box>

                        <AnimatedLine length={40} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <Box sx={{ position: 'absolute', top: -100 }}>
                                <FlowNode icon={Image} label="DAM" color="info" delay={0.4} />
                                <Box sx={{ height: 20, borderLeft: '2px dashed #ccc', ml: 'auto', mr: 'auto', width: 2 }} />
                                <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, right: -60, bgcolor: 'background.paper', px: 0.5 }}>Creatives</Typography>
                            </Box>
                            <FlowNode icon={AutoFixHigh} label="Brief Automation" color="info" delay={0.4} />
                        </Box>

                        <AnimatedLine length={40} />
                    </Box>

                    {/* Bottom Branch: Individual Action */}
                    {/* We need to connect Prediction to Individual Action. 
                        Since we are using flexbox, we'll simulate the connection visually or structure it differently.
                        Actually, the diagram splits AFTER Prediction. 
                        So "Plan" and "Individual Action" should be parallel.
                    */}
                </Box>

                {/* Re-structuring for the split */}
                {/* The previous structure was linear. Let's fix the split. */}
            </Box>

            {/* Corrected Layout Implementation */}
            <Box sx={{ position: 'relative', minWidth: 1000, height: 500 }}>

                {/* 1. Data */}
                <Box sx={{ position: 'absolute', left: 0, top: 150 }}>
                    <FlowNode icon={Storage} label="Data" color="info" delay={0} />
                </Box>

                {/* Connector: Data -> Query */}
                <Box sx={{ position: 'absolute', left: 120, top: 190 }}>
                    <AnimatedLine length={60} />
                </Box>

                {/* 2. Query / Analytics */}
                <Box sx={{ position: 'absolute', left: 180, top: 150 }}>
                    <FlowNode icon={Analytics} label="Query / Analytics" color="success" delay={0.1} />
                </Box>

                {/* Connector: Query -> Prediction */}
                <Box sx={{ position: 'absolute', left: 300, top: 190 }}>
                    <AnimatedLine length={60} />
                </Box>

                {/* 3. Prediction */}
                <Box sx={{ position: 'absolute', left: 360, top: 150 }}>
                    <FlowNode icon={Psychology} label="Prediction and AI decisioning" color="primary" delay={0.2} width={140} />
                </Box>

                {/* Goals (Above Prediction) */}
                <Box sx={{ position: 'absolute', left: 360, top: 30 }}>
                    <FlowNode icon={Flag} label="Goals" color="warning" delay={0.2} width={140} />
                    <Box sx={{ position: 'absolute', bottom: -20, left: 70, height: 20, borderLeft: '2px dashed #ccc' }} />
                </Box>

                {/* Split Lines */}
                {/* Path A: To Plan */}
                <Box sx={{ position: 'absolute', left: 500, top: 190 }}>
                    <AnimatedLine length={60} />
                </Box>
                {/* Path B: To Individual Action (Down and Right) */}
                <svg style={{ position: 'absolute', left: 430, top: 230, width: 200, height: 100, pointerEvents: 'none', zIndex: 0 }}>
                    <path d="M 70 0 L 70 80 L 190 80" fill="none" stroke="#e0e0e0" strokeWidth="2" />
                    <motion.path
                        d="M 70 0 L 70 80 L 190 80"
                        fill="none"
                        stroke="#2196f3"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </svg>

                {/* 4A. Plan for next best offer */}
                <Box sx={{ position: 'absolute', left: 560, top: 150 }}>
                    <FlowNode icon={NextPlan} label="Plan for next best offer - campaign" color="secondary" delay={0.3} width={150} />
                </Box>

                {/* Guardrails (Above Plan) */}
                <Box sx={{ position: 'absolute', left: 560, top: 30 }}>
                    <FlowNode icon={Security} label="Guardrails" color="error" delay={0.3} width={150} />
                    <Box sx={{ position: 'absolute', bottom: -20, left: 75, height: 20, borderLeft: '2px dashed #ccc' }} />
                </Box>

                {/* Connector: Plan -> Brief */}
                <Box sx={{ position: 'absolute', left: 710, top: 190 }}>
                    <AnimatedLine length={60} />
                </Box>

                {/* 5. Brief Automation */}
                <Box sx={{ position: 'absolute', left: 770, top: 150 }}>
                    <FlowNode icon={AutoFixHigh} label="Brief Automation" color="info" delay={0.4} />
                </Box>

                {/* DAM (Above Brief) */}
                <Box sx={{ position: 'absolute', left: 770, top: 30 }}>
                    <FlowNode icon={Image} label="DAM" color="info" delay={0.4} />
                    <Box sx={{ position: 'absolute', bottom: -20, left: 60, height: 20, borderLeft: '2px dashed #ccc' }} />
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: -15, right: -20, bgcolor: 'background.paper', px: 0.5, fontSize: 10 }}>Creatives</Typography>
                </Box>

                {/* Connector: Brief -> Orchestration */}
                <Box sx={{ position: 'absolute', left: 890, top: 190 }}>
                    <AnimatedLine length={60} />
                </Box>

                {/* 4B. Individual Action */}
                <Box sx={{ position: 'absolute', left: 560, top: 270 }}>
                    <FlowNode icon={Person} label="Individual Action per user" color="warning" delay={0.4} width={150} />
                </Box>

                {/* Connector: Individual -> Orchestration */}
                <Box sx={{ position: 'absolute', left: 710, top: 310 }}>
                    <AnimatedLine length={240} />
                </Box>
                {/* Vertical connector up to Orchestration */}
                <Box sx={{ position: 'absolute', left: 950, top: 230, height: 80, borderLeft: '2px solid #e0e0e0' }} />


                {/* 6. Campaign / Journey Orchestration */}
                <Box sx={{ position: 'absolute', left: 950, top: 150 }}>
                    <FlowNode icon={Campaign} label="Campaign / Journey Orchestration" color="success" delay={0.5} width={160} />
                </Box>

                {/* Feedback Loop */}
                <Box sx={{ position: 'absolute', left: 60, top: 380, width: 970, height: 60 }}>
                    {/* Line from Orchestration down */}
                    <Box sx={{ position: 'absolute', right: 0, top: -150, height: 150, borderRight: '2px solid #e0e0e0' }} />
                    {/* Line across bottom */}
                    <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderBottom: '2px solid #e0e0e0' }} />
                    {/* Line up to Data */}
                    <Box sx={{ position: 'absolute', left: 0, bottom: 0, height: 150, borderLeft: '2px solid #e0e0e0' }} />

                    {/* Feedback Node */}
                    <Box sx={{ position: 'absolute', left: '45%', bottom: -20 }}>
                        <Paper elevation={1} sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', border: '1px solid #ccc' }}>
                            <Loop fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="caption">Feedback Loop</Typography>
                        </Paper>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}
