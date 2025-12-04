import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import { Flag, Security, MonetizationOn, Timer, Block, CheckCircle } from '@mui/icons-material';

export default function GuardrailsDisplay() {
    return (
        <Paper elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="600">
                    Active Controls
                </Typography>
            </Box>

            <Box sx={{ p: 0 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, pt: 2, pb: 1, fontWeight: 600 }}>
                    GOALS (Optimization Targets)
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Flag color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Maximize AIP Conversion"
                            secondary="Target: > 45%"
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <Chip label="Active" color="success" size="small" sx={{ height: 20, fontSize: 10 }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <MonetizationOn color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Minimize Cost per Acquisition"
                            secondary="Target: < ₹300"
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                    </ListItem>
                </List>

                <Divider />

                <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, pt: 2, pb: 1, fontWeight: 600 }}>
                    GUARDRAILS (Hard Limits)
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Security color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Global Frequency Cap"
                            secondary="Max 1 msg / 24hrs per user"
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <CheckCircle color="success" fontSize="small" sx={{ width: 16 }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Block color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="DNC List Enforcement"
                            secondary="Strict filtering active"
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <CheckCircle color="success" fontSize="small" sx={{ width: 16 }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Timer color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Quiet Hours"
                            secondary="10 PM - 8 AM IST"
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                    </ListItem>
                </List>
            </Box>
        </Paper>
    );
}
