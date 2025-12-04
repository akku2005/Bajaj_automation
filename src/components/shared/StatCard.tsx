import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    subtitle?: string;
    icon: React.ReactNode;
    color: 'primary' | 'success' | 'warning' | 'error' | 'info';
    invertTrend?: boolean;
}

export default function StatCard({
    title,
    value,
    trend,
    subtitle,
    icon,
    color,
    invertTrend = false
}: StatCardProps) {
    const isPositive = invertTrend ? (trend || 0) < 0 : (trend || 0) > 0;

    // Map color names to hex for gradient
    const colorMap = {
        primary: '#1976d2',
        success: '#2e7d32',
        warning: '#ed6c02',
        error: '#d32f2f',
        info: '#0288d1'
    };

    const mainColor = colorMap[color];

    return (
        <Card
            sx={{
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    bgcolor: mainColor
                }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                        {title}
                    </Typography>
                    <Box sx={{ color: mainColor }}>
                        {icon}
                    </Box>
                </Box>

                <Typography variant="h4" fontWeight="700" sx={{ mb: 1 }}>
                    {value}
                </Typography>

                {trend !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {isPositive ? (
                            <TrendingUp fontSize="small" color="success" />
                        ) : (
                            <TrendingDown fontSize="small" color="error" />
                        )}
                        <Typography
                            variant="body2"
                            color={isPositive ? 'success.main' : 'error.main'}
                            fontWeight="500"
                        >
                            {Math.abs(trend)}% vs last period
                        </Typography>
                    </Box>
                )}

                {subtitle && (
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 1 }}>
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
