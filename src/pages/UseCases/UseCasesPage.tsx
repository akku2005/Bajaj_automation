import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    IconButton,
    Button,
    TextField
} from '@mui/material';
import { Edit, Settings } from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useUseCaseStore } from '../../stores/useCaseStore';
import type { UseCase } from '../../types/useCase';

const UseCaseCard: React.FC<{ useCase: UseCase }> = ({ useCase }) => {
    const navigate = useNavigate();
    const updateUseCase = useUseCaseStore((state) => state.updateUseCase);
    const isActive = useCase.status === 'active';
    const isPaused = useCase.status === 'paused';

    return (
        <Card sx={{
            height: '100%',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
                boxShadow: 3
            }
        }}>
            <CardContent>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                            {useCase.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {useCase.description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {isActive && (
                            <Chip
                                label="Active"
                                size="small"
                                sx={{
                                    bgcolor: '#E8F5E9',
                                    color: '#2E7D32',
                                    fontWeight: 500
                                }}
                            />
                        )}
                        {isPaused && (
                            <Chip
                                label="Paused"
                                size="small"
                                sx={{
                                    bgcolor: '#FFF3E0',
                                    color: '#EF6C00',
                                    fontWeight: 500
                                }}
                            />
                        )}

                        {isActive ? (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => navigate(`/use-cases/${useCase.id}`)}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    onClick={() => {
                                        updateUseCase(useCase.id, { status: 'paused' });
                                    }}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Pause
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<Settings />}
                                onClick={() => navigate(`/use-cases/${useCase.id}/configure`)}
                                sx={{ textTransform: 'none' }}
                            >
                                Configure
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Metrics Grid */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                                LEAD
                            </Typography>
                            <Typography variant="h6" fontWeight="600">
                                {useCase.metrics.lead.toLocaleString()}
                            </Typography>
                            {useCase.metrics.trendData && (
                                <Box sx={{ height: 30, mt: 0.5 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={useCase.metrics.trendData.map(v => ({ value: v }))}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#9E9E9E"
                                                strokeWidth={1.5}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                                AIP
                            </Typography>
                            <Typography variant="h6" fontWeight="600">
                                {useCase.metrics.aip}
                            </Typography>
                            {useCase.metrics.trendData && (
                                <Box sx={{ height: 30, mt: 0.5 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={useCase.metrics.trendData.map(v => ({ value: v }))}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#9E9E9E"
                                                strokeWidth={1.5}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                                COA
                            </Typography>
                            <Typography variant="h6" fontWeight="600">
                                {useCase.metrics.coa}
                            </Typography>
                            {useCase.metrics.trendData && (
                                <Box sx={{ height: 30, mt: 0.5 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={useCase.metrics.trendData.map((_v, i) => ({ value: 100 - i * 2 }))}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#FF9800"
                                                strokeWidth={1.5}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                                TARGET ACHIEVED
                            </Typography>
                            <Typography variant="h6" fontWeight="600">
                                {useCase.metrics.targetAchieved}%
                            </Typography>
                            <Box sx={{
                                mt: 0.5,
                                height: 8,
                                bgcolor: '#E0E0E0',
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    height: '100%',
                                    width: `${useCase.metrics.targetAchieved}%`,
                                    bgcolor: '#005dac',
                                    transition: 'width 0.3s ease'
                                }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default function UseCasesPage() {
    const useCases = useUseCaseStore((state) => state.useCases);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    Use Case
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage active use cases and KPIs for your campaign.
                </Typography>
            </Box>

            {/* Use Cases Grid */}
            <Grid container spacing={3}>
                {useCases.map((useCase) => (
                    <Grid size={{ xs: 12 }} key={useCase.id}>
                        <UseCaseCard useCase={useCase} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
