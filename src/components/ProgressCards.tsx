import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

interface ProgressCardsProps {
    quarterlyGoal: string;
    actual: string;
    expectedProgress: string;
    conversionForecast: string;
    startDate?: string;
    endDate?: string;
}

export default function ProgressCards({
    quarterlyGoal,
    actual,
    expectedProgress,
    conversionForecast,
    startDate = '2025-10-01',
    endDate = '2025-12-31'
}: ProgressCardsProps) {
    // Parse percentages for calculations
    const actualValue = parseFloat(actual.replace('%', ''));
    const expectedValue = parseFloat(expectedProgress.replace('%', ''));
    const goalValue = parseFloat(quarterlyGoal.replace('%', '').replace(' AIP', ''));

    // Calculate progress percentages
    const actualProgress = (actualValue / goalValue) * 100;
    const expectedProgressPercent = (expectedValue / goalValue) * 100;

    // Calculate dates for timeline
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const timeProgress = (daysPassed / totalDays) * 100;

    // Format dates
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <Box>
            {/* Three Cards Row */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                {/* Card 1: Target */}
                <Card sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Target
                        </Typography>
                        <Typography variant="h4" fontWeight="700">
                            {quarterlyGoal.replace(' AIP', '')}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Card 2: Achieved */}
                <Card sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Achieved
                        </Typography>
                        <Typography variant="h4" fontWeight="700">
                            {((goalValue * actualValue) / 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ({actual} of target)
                        </Typography>
                    </CardContent>
                </Card>

                {/* Card 3: Expected */}
                <Card sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Expected
                        </Typography>
                        <Typography variant="h4" fontWeight="700">
                            {((goalValue * expectedValue) / 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ({expectedProgress} of target)
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Timeline Progress Bar Card */}
            <Card>
                <CardContent>
                    <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block', mb: 1 }}>
                        Timeline Progress
                    </Typography>

                    <Box sx={{ position: 'relative' }}>
                        {/* Background track */}
                        <LinearProgress
                            variant="determinate"
                            value={100}
                            sx={{
                                height: 8,
                                bgcolor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: '#e0e0e0'
                                }
                            }}
                        />

                        {/* Actual progress */}
                        <LinearProgress
                            variant="determinate"
                            value={timeProgress}
                            sx={{
                                height: 8,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bgcolor: 'transparent',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: '#005dac'
                                }
                            }}
                        />
                    </Box>

                    {/* Timeline labels */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            {formatDate(start)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Today (Day {daysPassed}/{totalDays})
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDate(end)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
