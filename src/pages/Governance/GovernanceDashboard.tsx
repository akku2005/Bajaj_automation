import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Alert,
    LinearProgress,
    Divider,
    Chip
} from '@mui/material';
import {
    Security,
    Block,
    Warning,
    CheckCircle,
    PauseCircleFilled
} from '@mui/icons-material';

export default function GovernanceDashboard() {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="600">
                    Governance & Safety
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<PauseCircleFilled />}
                    sx={{ boxShadow: 4 }}
                >
                    EMERGENCY PAUSE (KILL SWITCH)
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%', borderTop: '4px solid #2e7d32' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CheckCircle color="success" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Frequency Caps</Typography>
                                    <Typography variant="body2" color="text.secondary">Global System Status</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                                0
                            </Typography>
                            <Typography variant="body1" color="success.main" fontWeight="500">
                                Violations Today
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Policy: Max 3 messages / user / week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%', borderTop: '4px solid #ed6c02' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Block color="warning" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">DNC Blocker</Typography>
                                    <Typography variant="body2" color="text.secondary">Do Not Call Registry</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                                1,200
                            </Typography>
                            <Typography variant="body1" color="warning.main" fontWeight="500">
                                Blocked Attempts Today
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                100% Compliance Rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%', borderTop: '4px solid #1976d2' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Security color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Budget Guardrails</Typography>
                                    <Typography variant="body2" color="text.secondary">Spend Velocity Control</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Daily Limit Usage</Typography>
                                    <Typography variant="body2" fontWeight="bold">45%</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                    ₹4.5L / ₹10.0L Daily Cap
                                </Typography>
                            </Box>
                            <Alert severity="success" sx={{ mt: 3 }}>
                                System operating within safe velocity limits.
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Governance Actions
                            </Typography>
                            <List>
                                {[1, 2, 3].map((i) => (
                                    <React.Fragment key={i}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Block color="error" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Blocked SMS Campaign to 'High Churn Risk' Segment"
                                                secondary="Reason: Frequency Cap Reached for 45% of users in segment"
                                            />
                                            <Chip label="Auto-Blocked" color="error" size="small" />
                                        </ListItem>
                                        {i < 3 && <Divider variant="inset" component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
