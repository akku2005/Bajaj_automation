import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemButton
} from '@mui/material';
import AffinityRadarChart from '../../components/charts/AffinityRadarChart';

// Types
interface Decision {
    decision_id: string;
    user_id: string;
    timestamp: string;
    action: 'send_campaign' | 'suppress' | 'defer';
    recommended_offer: string;
    recommended_channel: string;
    recommended_partner: string;
    confidence_score: number;
    reasoning: {
        product_affinity: number;
        partner_approval_likelihood: number;
        channel_responsiveness: number;
    };
}

// Mock Data Generator
const generateMockDecision = (id: number): Decision => ({
    decision_id: `DEC_${id}`,
    user_id: `User_${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    action: Math.random() > 0.2 ? 'send_campaign' : 'suppress',
    recommended_offer: ['Personal Loan', 'Credit Card', 'Gold Loan'][Math.floor(Math.random() * 3)],
    recommended_channel: ['WhatsApp', 'SMS', 'RCS'][Math.floor(Math.random() * 3)],
    recommended_partner: ['Bajaj Finserv', 'Federal Bank', 'RBL'][Math.floor(Math.random() * 3)],
    confidence_score: 0.85 + Math.random() * 0.14,
    reasoning: {
        product_affinity: 0.7 + Math.random() * 0.3,
        partner_approval_likelihood: 0.6 + Math.random() * 0.4,
        channel_responsiveness: 0.5 + Math.random() * 0.5,
    }
});

export default function DecisionMonitor() {
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);

    // Simulate real-time stream
    useEffect(() => {
        const interval = setInterval(() => {
            const newDecision = generateMockDecision(Date.now());
            setDecisions(prev => [newDecision, ...prev].slice(0, 50));
        }, 3000); // New decision every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Typography variant="h4" fontWeight="600" gutterBottom>
                AI Decision Monitor
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Real-time view of AI decisioning engine actions
            </Typography>

            <Grid container spacing={3}>
                {/* Decision Stream */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" gutterBottom>
                                Decision Stream (Live)
                            </Typography>
                            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                                {decisions.map((decision) => (
                                    <React.Fragment key={decision.decision_id}>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={() => setSelectedDecision(decision)}
                                                selected={selectedDecision?.decision_id === decision.decision_id}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {decision.user_id}
                                                            </Typography>
                                                            <Chip
                                                                label={decision.action === 'send_campaign' ? 'Action' : 'Suppress'}
                                                                size="small"
                                                                color={decision.action === 'send_campaign' ? 'success' : 'warning'}
                                                                variant={decision.action === 'send_campaign' ? 'filled' : 'outlined'}
                                                            />
                                                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                                                {new Date(decision.timestamp).toLocaleTimeString()}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box>
                                                            <Typography variant="body2" color="text.primary">
                                                                {decision.action === 'send_campaign'
                                                                    ? `Send ${decision.recommended_offer} via ${decision.recommended_channel}`
                                                                    : 'Suppressed due to low confidence'}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Confidence: {(decision.confidence_score * 100).toFixed(1)}%
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider component="li" />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Decision Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                    {selectedDecision ? (
                        <Card sx={{ height: '80vh', overflow: 'auto' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Decision Explainability
                                </Typography>

                                <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Decision ID
                                    </Typography>
                                    <Typography variant="body2" fontFamily="monospace">
                                        {selectedDecision.decision_id}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 6 }}>
                                        <InfoField label="Offer" value={selectedDecision.recommended_offer} />
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <InfoField label="Channel" value={selectedDecision.recommended_channel} />
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <InfoField label="Partner" value={selectedDecision.recommended_partner} />
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <InfoField
                                            label="Confidence"
                                            value={`${(selectedDecision.confidence_score * 100).toFixed(1)}%`}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" gutterBottom>
                                    Affinity Scores (The "Why")
                                </Typography>
                                <Box sx={{ height: 300, width: '100%' }}>
                                    <AffinityRadarChart data={selectedDecision.reasoning} />
                                </Box>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        • <strong>Product Affinity:</strong> User has shown high intent for {selectedDecision.recommended_offer} based on recent browsing.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        • <strong>Partner Match:</strong> {selectedDecision.recommended_partner} has a high approval rate for users with this credit profile.
                                    </Typography>
                                </Box>

                            </CardContent>
                        </Card>
                    ) : (
                        <Card sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="text.secondary">
                                Select a decision from the stream to view details
                            </Typography>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

function InfoField({ label, value }: { label: string; value: string }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary" display="block">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight="500">
                {value}
            </Typography>
        </Box>
    );
}
