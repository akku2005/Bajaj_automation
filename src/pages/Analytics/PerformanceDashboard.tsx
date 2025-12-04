import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import { MonetizationOn, TrendingUp, Savings } from '@mui/icons-material';

const roiData = [
    { name: 'WhatsApp', costPerConv: 45, conversions: 1200 },
    { name: 'SMS', costPerConv: 120, conversions: 800 },
    { name: 'RCS', costPerConv: 35, conversions: 600 },
];

const partnerData = [
    { name: 'Bajaj Finserv', leads: 5000, approved: 1200, rate: '24%' },
    { name: 'Federal Bank', leads: 3000, approved: 450, rate: '15%' },
    { name: 'RBL Bank', leads: 2500, approved: 300, rate: '12%' },
    { name: 'KreditBee', leads: 4000, approved: 800, rate: '20%' },
];

export default function PerformanceDashboard() {
    return (
        <Box>
            <Typography variant="h4" fontWeight="600" gutterBottom>
                ROI & Performance Analytics
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        title="Total Cost Saved"
                        value="₹1.5 Lakhs"
                        subtitle="This week by suppressing low-intent SMS"
                        icon={<Savings />}
                        color="success"
                        trend={15}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        title="Revenue Generated"
                        value="₹45.2 Lakhs"
                        subtitle="Directly attributed to AI campaigns"
                        icon={<MonetizationOn />}
                        color="primary"
                        trend={8}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard
                        title="Avg. ROI"
                        value="4.2x"
                        subtitle="Return on Ad Spend"
                        icon={<TrendingUp />}
                        color="info"
                        trend={5}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Channel ROI Battle (Cost per Conversion)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Lower is better. WhatsApp is performing 3x better than SMS.
                            </Typography>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={roiData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="costPerConv" name="Cost per Conversion (₹)" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Partner Approval Matrix
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Partner</TableCell>
                                        <TableCell align="right">Leads Sent</TableCell>
                                        <TableCell align="right">Approved</TableCell>
                                        <TableCell align="right">Approval Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {partnerData.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.leads.toLocaleString()}</TableCell>
                                            <TableCell align="right">{row.approved.toLocaleString()}</TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={row.rate}
                                                    color={parseInt(row.rate) > 20 ? 'success' : parseInt(row.rate) > 15 ? 'warning' : 'default'}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
