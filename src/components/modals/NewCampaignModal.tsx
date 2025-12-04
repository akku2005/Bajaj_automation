import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Typography,
    Slider,
    FormControlLabel,
    Switch,
    Chip
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

interface NewCampaignModalProps {
    open: boolean;
    onClose: () => void;
}

export default function NewCampaignModal({ open, onClose }: NewCampaignModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleLaunch = () => {
        setLoading(true);
        // Simulate AI processing
        setTimeout(() => {
            setLoading(false);
            onClose();
            setStep(1);
            alert('Campaign "Diwali Personal Loan Push" launched successfully! AI is now optimizing delivery.');
        }, 2000);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {step === 1 ? 'Define Campaign Goal' : 'AI Strategy Review'}
            </DialogTitle>

            <DialogContent>
                {step === 1 ? (
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Campaign Name"
                            fullWidth
                            variant="outlined"
                            defaultValue="Diwali Personal Loan Push"
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            select
                            label="Primary Objective"
                            fullWidth
                            defaultValue="disbursal"
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="disbursal">Increase Disbursals (Revenue)</MenuItem>
                            <MenuItem value="leads">Generate High-Intent Leads</MenuItem>
                            <MenuItem value="app_install">Boost App Installs</MenuItem>
                            <MenuItem value="engagement">Re-engage Dormant Users</MenuItem>
                        </TextField>

                        <Typography gutterBottom>
                            Monthly Budget Cap (₹ Lakhs)
                        </Typography>
                        <Slider
                            defaultValue={5}
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks
                            min={1}
                            max={20}
                            sx={{ mb: 3 }}
                        />

                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label={
                                <Box>
                                    <Typography variant="body2">Enable Autonomous Optimization</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Allow AI to shift budget between Channels & Partners automatically
                                    </Typography>
                                </Box>
                            }
                        />
                    </Box>
                ) : (
                    <Box sx={{ pt: 1 }}>
                        <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'primary.contrastText' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <AutoAwesome />
                                <Typography variant="subtitle1" fontWeight="bold">AI Strategy Generated</Typography>
                            </Box>
                            <Typography variant="body2">
                                Based on your goal "Increase Disbursals", the AI has formulated the following strategy:
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>Target Audience</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label="CIBIL > 750" size="small" />
                                <Chip label="Salaried" size="small" />
                                <Chip label="Visited PL Page > 2 times" size="small" />
                                <Chip label="No Active Loans" size="small" />
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>Channel Mix</Typography>
                            <Typography variant="body2" color="text.secondary">
                                • <strong>WhatsApp (60%):</strong> Primary channel for high-intent users.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • <strong>RCS (30%):</strong> Rich media fallback for Android users.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • <strong>SMS (10%):</strong> Low-cost reminders only.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>Projected Outcome</Typography>
                            <Typography variant="h5" color="success.main" fontWeight="bold">
                                ~1,200 Disbursals
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Estimated ROI: 4.5x
                            </Typography>
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                {step === 1 ? (
                    <Button variant="contained" onClick={() => setStep(2)}>
                        Generate Strategy
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleLaunch}
                        startIcon={loading ? <AutoAwesome sx={{ animation: 'spin 2s linear infinite' }} /> : <AutoAwesome />}
                        disabled={loading}
                    >
                        {loading ? 'Launching...' : 'Approve & Launch'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
