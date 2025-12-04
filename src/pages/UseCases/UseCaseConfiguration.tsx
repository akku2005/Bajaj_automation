import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Snackbar,
    Alert,
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Switch,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Divider,
    Grid,
    ToggleButtonGroup,
    ToggleButton,
    Radio,
    RadioGroup,
    Stack
} from '@mui/material';
import {
    ArrowBack,
    Lock,
    DragIndicator,
    Delete,
    Add,
    Edit as EditIcon,
    BarChart,
    PieChart,
    Timeline,
    TrendingUp,
    Assessment,
    Insights,
    Download,
    ContentCopy,
    Code,
    DataObject,
    CalendarMonth,
    Settings,
    KeyboardArrowDown,
    ZoomIn,
    ZoomOut,
    Home,
    PanTool,
    Dashboard,
    HelpOutline,
    Storage,
    Info as InfoIcon,
    FilterList,
    LocalOffer
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper } from '@mui/material';
import { useUseCaseStore } from '../../stores/useCaseStore';
import type { PredictionDimension } from '../../types/useCase';
import CampaignRecommendations from './CampaignRecommendations';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const initialDimensions: PredictionDimension[] = [
    {
        id: 1,
        dimension: 'Frequency',
        description: 'How many times to communicate with the customer over a 7-day period',
        sendDecisionsTo: 'Days of Week, Channel, Offer, Time, Creative, Device',
        locked: true,
        order: 1
    },
    {
        id: 2,
        dimension: 'Days of Week',
        description: 'Which day(s) of the week to communicate with the customer',
        sendDecisionsTo: 'Channel, Offer, Time, Creative, Device',
        locked: true,
        order: 2
    },
    {
        id: 3,
        dimension: 'Channel',
        description: 'The channel to send the communication via',
        sendDecisionsTo: 'Offer, Time, Creative, Device',
        locked: false,
        order: 3
    },
    {
        id: 4,
        dimension: 'Offer',
        description: 'The incentive to include in the communication',
        sendDecisionsTo: 'Time, Creative, Device',
        locked: false,
        order: 4
    },
    {
        id: 5,
        dimension: 'Time',
        description: 'The time to send the communication',
        sendDecisionsTo: 'Creative, Device',
        locked: false,
        order: 5
    },
    {
        id: 6,
        dimension: 'Creative',
        description: 'The content of the communication',
        sendDecisionsTo: 'Device',
        locked: false,
        order: 6
    }
];

export default function UseCaseConfiguration() {
    const { id } = useParams();
    const navigate = useNavigate();
    const useCase = useUseCaseStore((state) => state.getUseCaseById(id || ''));

    const [activeTab, setActiveTab] = useState(2); // Start with Action Banks tab
    const [dimensions, setDimensions] = useState<PredictionDimension[]>(initialDimensions);
    const [draggedItem, setDraggedItem] = useState<PredictionDimension | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!useCase) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Use case not found</Typography>
                <Button variant="contained" onClick={() => navigate('/use-cases')} sx={{ mt: 2 }}>
                    Back to Use Cases
                </Button>
            </Box>
        );
    }

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const toggleLock = (dimensionId: number) => {
        setDimensions(prev =>
            prev.map(dim =>
                dim.id === dimensionId ? { ...dim, locked: !dim.locked } : dim
            )
        );
    };

    const handleDragStart = (dimension: PredictionDimension) => {
        if (!dimension.locked) {
            setDraggedItem(dimension);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (targetDimension: PredictionDimension) => {
        if (!draggedItem || draggedItem.locked || targetDimension.locked) return;

        const newDimensions = [...dimensions];
        const draggedIndex = newDimensions.findIndex(d => d.id === draggedItem.id);
        const targetIndex = newDimensions.findIndex(d => d.id === targetDimension.id);

        [newDimensions[draggedIndex], newDimensions[targetIndex]] =
            [newDimensions[targetIndex], newDimensions[draggedIndex]];

        newDimensions.forEach((dim, index) => {
            dim.order = index + 1;
        });

        setDimensions(newDimensions);
        setDraggedItem(null);
    };

    const deleteDimension = (dimensionId: number) => {
        setDimensions(prev => prev.filter(dim => dim.id !== dimensionId));
    };

    const handleSaveConfiguration = () => {
        setShowSuccess(true);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/use-cases')} size="small">
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight="600">
                            Use Case: {useCase.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Goal: {useCase.goal}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleSaveConfiguration}
                    size="large"
                >
                    Save Configuration
                </Button>
            </Box>

            {/* Tabs Navigation */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Customer groups" />
                        <Tab label="Decision Dimension " />
                        <Tab label="Action banks" />
                        <Tab label="Conversion" />
                        <Tab label="Guardrails" />
                        <Tab label="Features to use" />
                        <Tab label="Outputs" />
                        <Tab label="Custom Reporting" />
                    </Tabs>
                </Box>

                {/* Customer Groups Tab */}
                <TabPanel value={activeTab} index={0}>
                    <CardContent>
                        {/* Targeted Audience Section */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6" fontWeight="600">
                                        TARGETED AUDIENCE
                                    </Typography>
                                    <Box sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        border: '1.5px solid',
                                        borderColor: 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        color: 'text.secondary',
                                        fontWeight: 600
                                    }}>
                                        i
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h4" fontWeight="700" color="#005dac">
                                        832,679
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        AUDIENCE COUNT
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Segmented Bar */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    height: 32,
                                    borderRadius: 1,
                                    overflow: 'hidden'
                                }}>
                                    <Box sx={{
                                        width: '25%',
                                        bgcolor: '#005dac',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        25%
                                    </Box>
                                    <Box sx={{
                                        width: '10%',
                                        bgcolor: '#8CC63F',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        10%
                                    </Box>
                                    <Box sx={{
                                        width: '10%',
                                        bgcolor: '#FDB913',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        10%
                                    </Box>
                                    <Box sx={{
                                        width: '10%',
                                        bgcolor: '#E94B3C',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        10%
                                    </Box>
                                </Box>
                            </Box>

                            {/* Legend */}
                            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, bgcolor: '#005dac', borderRadius: 0.5 }} />
                                    <Typography variant="caption" fontWeight="500">25% CREDIT</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, bgcolor: '#8CC63F', borderRadius: 0.5 }} />
                                    <Typography variant="caption" fontWeight="500">10% CURRENT CREDIT: CB/CD, PL/COA</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, bgcolor: '#FDB913', borderRadius: 0.5 }} />
                                    <Typography variant="caption" fontWeight="500">10% CONTROL CHECK</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, bgcolor: '#E94B3C', borderRadius: 0.5 }} />
                                    <Typography variant="caption" fontWeight="500">10% PREVENT CHURN</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Audience Breakdown Section */}
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="600">
                                    Audience breakdown
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    size="small"
                                    sx={{
                                        bgcolor: '#005dac',
                                        '&:hover': { bgcolor: '#003f75' },
                                        textTransform: 'none'
                                    }}
                                >
                                    Add customer group
                                </Button>
                            </Box>

                            {/* Table Header */}
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: '180px 1fr 250px',
                                gap: 2,
                                mb: 2,
                                pb: 1,
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <Typography variant="caption" fontWeight="600" color="text.secondary">
                                    NAME
                                </Typography>
                                <Typography variant="caption" fontWeight="600" color="text.secondary">
                                    CONDITION
                                </Typography>
                                <Typography variant="caption" fontWeight="600" color="text.secondary">
                                    PREDICTION METHOD
                                </Typography>
                            </Box>

                            {/* Audience Groups */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Credit Group */}
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '180px 1fr 250px',
                                    gap: 2,
                                    pb: 3,
                                    borderBottom: '1px solid',
                                    borderColor: 'divider'
                                }}>
                                    <Box>
                                        <Chip
                                            label="Credit"
                                            size="small"
                                            sx={{
                                                bgcolor: '#005dac',
                                                color: 'white',
                                                fontWeight: 600,
                                                mb: 1
                                            }}
                                        />
                                        <Typography variant="caption" display="block" color="error.main">
                                            ⚠ Exclude at least 1 ML/AI Group
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        bgcolor: '#F5F5F5',
                                        p: 1.5,
                                        borderRadius: 1,
                                        fontFamily: 'monospace',
                                        fontSize: '0.75rem'
                                    }}>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', lineHeight: 1.6 }}>
                                            days_since_signup &gt;= 64 AND<br />
                                            is_excluded_LG = FALSE AND<br />
                                            is_unsubscribed_LE = FALSE
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                            Please select the prediction method
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Control Group */}
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '180px 1fr 250px',
                                    gap: 2,
                                    pb: 3,
                                    borderBottom: '1px solid',
                                    borderColor: 'divider'
                                }}>
                                    <Box>
                                        <Chip
                                            label="Control Group"
                                            size="small"
                                            sx={{
                                                bgcolor: '#FDB913',
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        bgcolor: '#F5F5F5',
                                        p: 1.5,
                                        borderRadius: 1,
                                        fontFamily: 'monospace',
                                        fontSize: '0.7rem'
                                    }}>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', lineHeight: 1.6 }}>
                                            WHERE customer_id ends WITH ("0", "a", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az", "b", "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "c")
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">
                                            Do not send recommendations
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Holdout Group */}
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '180px 1fr 250px',
                                    gap: 2
                                }}>
                                    <Box>
                                        <Chip
                                            label="Holdout Group"
                                            size="small"
                                            sx={{
                                                bgcolor: '#E94B3C',
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        bgcolor: '#F5F5F5',
                                        p: 1.5,
                                        borderRadius: 1,
                                        fontFamily: 'monospace',
                                        fontSize: '0.7rem'
                                    }}>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', lineHeight: 1.6 }}>
                                            WHERE customer_id ends WITH ("0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "c")
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">
                                            Do not send recommendations
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </TabPanel>

                {/* Prediction Dimensions & Fallback Tab */}
                <TabPanel value={activeTab} index={1}>
                    <CardContent>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Configure the decision hierarchy for your AI model. Drag unlocked rows to reorder. Locked dimensions cannot be moved.
                            </Typography>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="40"></TableCell>
                                        <TableCell width="40"></TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="text.secondary" fontWeight="600">
                                                DIMENSION
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="text.secondary" fontWeight="600">
                                                DESCRIPTION
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="text.secondary" fontWeight="600">
                                                SEND DECISIONS TO
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="40"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dimensions.map((dimension, index) => (
                                        <TableRow
                                            key={dimension.id}
                                            draggable={!dimension.locked}
                                            onDragStart={() => handleDragStart(dimension)}
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDrop(dimension)}
                                            sx={{
                                                '&:hover': { bgcolor: 'action.hover' },
                                                bgcolor: dimension.locked ? '#F3E5F5' : 'transparent',
                                                cursor: dimension.locked ? 'default' : 'move'
                                            }}
                                        >
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: '#005dac',
                                                    color: 'white',
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 1,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600
                                                }}>
                                                    {index + 1}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleLock(dimension.id)}
                                                >
                                                    {dimension.locked ? (
                                                        <Lock fontSize="small" />
                                                    ) : (
                                                        <DragIndicator fontSize="small" />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="500">
                                                    {dimension.dimension}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {dimension.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {dimension.sendDecisionsTo}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {!dimension.locked && (
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => deleteDimension(dimension.id)}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </TabPanel>

                {/* Action Banks Tab */}
                <TabPanel value={activeTab} index={2}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box>
                                <Typography variant="h6" fontWeight="600" gutterBottom>
                                    Product Action Banks
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Manage product offers and incentives for AI recommendations
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" size="small">
                                    Import from Excel
                                </Button>
                                <Button variant="outlined" size="small">
                                    Download Template
                                </Button>
                                <Button variant="outlined" size="small">
                                    Export Products
                                </Button>
                                <Button variant="contained" size="small" startIcon={<Add />}>
                                    Add Product
                                </Button>
                            </Box>
                        </Box>

                        {/* Filters */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Product Category</InputLabel>
                                <Select value="all" label="Product Category">
                                    <MenuItem value="all">All Products</MenuItem>
                                    <MenuItem value="personal-loan">Personal Loans</MenuItem>
                                    <MenuItem value="credit-card">Credit Cards</MenuItem>
                                    <MenuItem value="insurance">Insurance</MenuItem>
                                    <MenuItem value="investment">Investments</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="Active offers only"
                            />
                        </Box>

                        {/* Products Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                                        <TableCell><Typography variant="caption" fontWeight="600">PRODUCT_ID</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">STATUS</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">VALID_UNTIL</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">PRODUCT_NAME</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">INTEREST_RATE</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">CASHBACK_AMT</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">TENURE_MONTHS</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">CREATED_DATE</Typography></TableCell>
                                        <TableCell><Typography variant="caption" fontWeight="600">DESCRIPTION</Typography></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { id: 1, status: 'Active', validUntil: '2025-12-31', name: 'Premium Personal Loan', interestRate: '10.5%', cashback: '₹5,000', tenure: '12-60', created: '2024-01-15', description: 'Low interest personal loan for salaried...' },
                                        { id: 2, status: 'Active', validUntil: '2025-06-30', name: 'Gold Credit Card', interestRate: 'N/A', cashback: '₹2,000', tenure: 'Lifetime', created: '2024-02-01', description: 'Premium credit card with travel benefits...' },
                                        { id: 3, status: 'Active', validUntil: '2025-12-31', name: 'Instant Personal Loan', interestRate: '11.99%', cashback: '₹3,000', tenure: '6-36', created: '2024-03-10', description: 'Quick approval personal loan up to ₹5L...' },
                                        { id: 4, status: 'Active', validUntil: '2025-09-30', name: 'Health Insurance Plus', interestRate: 'N/A', cashback: '₹1,000', tenure: '12', created: '2024-04-05', description: 'Comprehensive health coverage for family...' },
                                        { id: 5, status: 'Active', validUntil: '2025-12-31', name: 'Flexi Personal Loan', interestRate: '12.5%', cashback: '₹0', tenure: '12-48', created: '2024-05-20', description: 'Flexible repayment options available...' },
                                        { id: 6, status: 'Active', validUntil: '2025-08-31', name: 'Platinum Credit Card', interestRate: 'N/A', cashback: '₹5,000', tenure: 'Lifetime', created: '2024-06-01', description: 'Elite card with airport lounge access...' },
                                        { id: 7, status: 'Active', validUntil: '2025-12-31', name: 'Business Loan', interestRate: '13.5%', cashback: '₹10,000', tenure: '24-60', created: '2024-07-15', description: 'Working capital for SMEs and MSMEs...' },
                                        { id: 8, status: 'Active', validUntil: '2025-10-31', name: 'Term Life Insurance', interestRate: 'N/A', cashback: '₹500', tenure: '120-360', created: '2024-08-01', description: 'Pure term plan with high coverage...' },
                                    ].map((product) => (
                                        <TableRow key={product.id} hover>
                                            <TableCell><Typography variant="body2">{product.id}</Typography></TableCell>
                                            <TableCell>
                                                <Chip label={product.status} size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 500 }} />
                                            </TableCell>
                                            <TableCell><Typography variant="body2">{product.validUntil}</Typography></TableCell>
                                            <TableCell><Typography variant="body2" fontWeight="500">{product.name}</Typography></TableCell>
                                            <TableCell><Typography variant="body2">{product.interestRate}</Typography></TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="500" color={product.cashback !== '₹0' ? 'success.main' : 'text.secondary'}>
                                                    {product.cashback}
                                                </Typography>
                                            </TableCell>
                                            <TableCell><Typography variant="body2">{product.tenure}</Typography></TableCell>
                                            <TableCell><Typography variant="body2" color="text.secondary">{product.created}</Typography></TableCell>
                                            <TableCell><Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>{product.description}</Typography></TableCell>
                                            <TableCell>
                                                <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </TabPanel>


                {/* Conversion Tab */}
                <TabPanel value={activeTab} index={3}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                            Conversion Tracking Settings
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Define how conversions are measured and attributed
                        </Typography>

                        {/* Top Section: Conversion Window and Attribution Model */}
                        <Box sx={{ mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                                        Conversion Window (days)
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select defaultValue="30" displayEmpty>
                                            <MenuItem value="7">7 days</MenuItem>
                                            <MenuItem value="14">14 days</MenuItem>
                                            <MenuItem value="30">30 days</MenuItem>
                                            <MenuItem value="60">60 days</MenuItem>
                                            <MenuItem value="90">90 days</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                                        Attribution Model
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select defaultValue="last-touch" displayEmpty>
                                            <MenuItem value="first-touch">First Touch</MenuItem>
                                            <MenuItem value="last-touch">Last Touch</MenuItem>
                                            <MenuItem value="linear">Linear</MenuItem>
                                            <MenuItem value="time-decay">Time Decay</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small" />}
                                    label={<Typography variant="body2">Require customer confirmation for conversion</Typography>}
                                />
                            </Box>
                        </Box>

                        {/* Conversion Events Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                Conversion Events
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small" />}
                                    label={<Typography variant="body2">Application Submitted</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small" />}
                                    label={<Typography variant="body2">Application Approved</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small" />}
                                    label={<Typography variant="body2">Loan Disbursed</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={<Typography variant="body2">Card Activated</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={<Typography variant="body2">First Transaction</Typography>}
                                />
                            </FormGroup>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Event Configuration Section */}
                        <Box sx={{ mb: 4, p: 3, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px solid #E0E0E0' }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                                        Event
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #E0E0E0' }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                                        <Typography variant="body2" fontWeight="500">Conversion</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                                        Data Asset
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select defaultValue="subscription_events" displayEmpty sx={{ bgcolor: 'white' }}>
                                            <MenuItem value="subscription_events">subscription_events</MenuItem>
                                            <MenuItem value="transaction_events">transaction_events</MenuItem>
                                            <MenuItem value="user_events">user_events</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                                        Event Timestamp
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            p: 1,
                                            bgcolor: '#005dac',
                                            borderRadius: 1,
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}>
                                            <FilterList sx={{ fontSize: 14 }} />
                                            Filter
                                        </Box>
                                        <FormControl fullWidth size="small">
                                            <Select defaultValue="event_date" displayEmpty sx={{ bgcolor: 'white' }}>
                                                <MenuItem value="event_date">event_date</MenuItem>
                                                <MenuItem value="created_at">created_at</MenuItem>
                                                <MenuItem value="timestamp">timestamp</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                                        Matching Event to Recommendation
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select defaultValue="action_params" displayEmpty sx={{ bgcolor: 'white' }}>
                                            <MenuItem value="action_params">Action Parameters (pretty exact)</MenuItem>
                                            <MenuItem value="user_id">User ID</MenuItem>
                                            <MenuItem value="session_id">Session ID</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Success Metric Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Define the success metric. The goal is to maximize:
                            </Typography>

                            <RadioGroup defaultValue="value-based" sx={{ mb: 3 }}>
                                <FormControlLabel
                                    value="count-based"
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">Number of conversions</Typography>}
                                />
                                <FormControlLabel
                                    value="value-based"
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">Value that is associated with conversions (e.g., revenue or incremental NPV)</Typography>}
                                />
                            </RadioGroup>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" fontWeight="500" gutterBottom>
                                    Select the column that represents the value of the conversion
                                </Typography>
                                <FormControl sx={{ maxWidth: 320 }} size="small">
                                    <Select defaultValue="incremental_value" displayEmpty>
                                        <MenuItem value="incremental_value">incremental_value</MenuItem>
                                        <MenuItem value="revenue">revenue</MenuItem>
                                        <MenuItem value="profit">profit</MenuItem>
                                        <MenuItem value="npv">npv</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" fontWeight="500" gutterBottom>
                                    Give a human-readable name for the success metric
                                </Typography>
                                <TextField
                                    defaultValue="Incremental Monthly Value"
                                    size="small"
                                    sx={{ maxWidth: 320 }}
                                />
                            </Box>
                        </Box>

                        {/* Attribution Section */}
                        <Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Choose how to attribute conversions
                            </Typography>

                            <RadioGroup defaultValue="last-touch">
                                <FormControlLabel
                                    value="last-touch"
                                    control={<Radio size="small" />}
                                    label={
                                        <Box>
                                            <Typography variant="body2" fontWeight="500">Last touch attribution</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ml: 0, mt: 0.5 }}>
                                                The most recent communication likely led to the conversion, so only the last communication should receive credit for the conversion.
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <FormControlLabel
                                    value="first-touch"
                                    control={<Radio size="small" />}
                                    label={
                                        <Box>
                                            <Typography variant="body2" fontWeight="500">First touch attribution</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ml: 0, mt: 0.5 }}>
                                                The first communication receives all credit for the conversion.
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Guardrails Tab */}
                <TabPanel value={activeTab} index={4}>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#005dac',
                                    '&:hover': { bgcolor: '#003f75' },
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                Create guardrail
                            </Button>
                        </Box>

                        <Card variant="outlined">
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#FAFAFA' }}>
                                        <TableRow>
                                            <TableCell sx={{ width: '20%' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}>
                                                    <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                        Name
                                                    </Typography>
                                                    <Typography sx={{ ml: 0.5, color: '#005dac', fontSize: 14 }}>↑</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ width: '8%' }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                    Dimension
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: '10%' }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                    Applied Groups
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: '22%' }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                    Description
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: '30%' }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                    Matching Conditions
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: '10%', textAlign: 'right' }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
                                                    Exclude When
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            {
                                                name: 'Do not send incentives in November',
                                                dimension: 'Offer',
                                                appliedGroups: ['Bajaj', 'Control'],
                                                description: "Don't send incentives in November, as there will have been an influx of new joiners during the peak month of October",
                                                conditions: 'where current_month = 11 AND (offer__action__dollars_off > 0 OR offer__action__percentage_off > 0)'
                                            },
                                            {
                                                name: 'Do not send incentives the week before ...',
                                                dimension: 'Offer',
                                                appliedGroups: ['Bajaj', 'Control'],
                                                description: "Don't send incentives during the peak week of the year",
                                                conditions: 'where days_until_halloween <= 7 AND (offer__action__dollars_off > 0 OR offer__action__percentage_off > 0)'
                                            },
                                            {
                                                name: 'Do not send incentives to customers who ...',
                                                dimension: 'Offer',
                                                appliedGroups: ['Bajaj', 'Control'],
                                                description: 'No incentives to customers who have redeemed an offer in the last 180 days',
                                                conditions: 'where (offer__action__percentage_off > 0 OR offer__action__dollars_off > 0)'
                                            }
                                        ].map((guardrail, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#005dac',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            '&:hover': { color: '#003f75' }
                                                        }}
                                                    >
                                                        {guardrail.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Typography variant="body2">
                                                        {guardrail.dimension}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                        {guardrail.appliedGroups.map((group, idx) => (
                                                            <Typography key={idx} variant="body2" color="text.secondary">
                                                                {group},
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {guardrail.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Box
                                                        sx={{
                                                            bgcolor: '#FAFAFA',
                                                            border: '1px solid #E0E0E0',
                                                            borderRadius: 1,
                                                            p: 1.5,
                                                            fontFamily: 'Consolas, monospace',
                                                            fontSize: '0.75rem',
                                                            lineHeight: 1.6,
                                                            color: '#212121'
                                                        }}
                                                    >
                                                        <Typography
                                                            component="div"
                                                            sx={{
                                                                fontFamily: 'inherit',
                                                                fontSize: 'inherit',
                                                                whiteSpace: 'pre-wrap',
                                                                wordBreak: 'break-word'
                                                            }}
                                                        >
                                                            {guardrail.conditions}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ verticalAlign: 'top', textAlign: 'right' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 1.5 }}>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            endIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} />}
                                                            sx={{
                                                                textTransform: 'none',
                                                                fontSize: '0.75rem',
                                                                py: 0.5,
                                                                px: 1.5,
                                                                minWidth: 'auto'
                                                            }}
                                                        >
                                                            Match
                                                        </Button>
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                color: 'text.disabled',
                                                                '&:hover': { color: 'error.main' }
                                                            }}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Box>
                </TabPanel>

                {/* Features to use Tab */}
                <TabPanel value={activeTab} index={5}>
                    <div className="p-6 bg-gray-50/50 min-h-[600px]">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Features Configuration
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Define offers, attributes, and signals for targeting
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Offers Section */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <LocalOffer className="text-blue-600" fontSize="small" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Offers</h3>
                                </div>

                                <div className="mb-6">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                        Group Offers
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['preapproved_personal_loan', 'low_emi_offer', 'zero_processing_fee', 'partner_colending_offer', 'salary_based_offer', 'festive_offer'].map((offer) => (
                                            <span
                                                key={offer}
                                                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-default"
                                            >
                                                {offer}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                        Personalized Offers
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['preapproved_limit_custom', 'topup_limit_custom', 'special_interest_rate_custom', 'salary_switch_benefit'].map((offer) => (
                                            <span
                                                key={offer}
                                                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                                            >
                                                {offer}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Profile Attributes Section */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-[10px] font-bold text-indigo-600">
                                            8
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Profile Attributes</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['age', 'gender', 'city', 'income', 'salary_credit_date', 'credit_score', 'employment_type', 'existing_loan_emi', 'risk_flag'].map((attr) => (
                                        <span
                                            key={attr}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-300 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default"
                                        >
                                            {attr}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Behaviour Signals Section */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-50 rounded-lg">
                                        <Insights className="text-emerald-600" fontSize="small" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Behaviour Signals</h3>
                                </div>

                                <ul className="space-y-3">
                                    {['app_opens', 'loan_page_visits', 'offer_page_visits', 'history_of_pl_activity', 'repayment_behavior', 'funnel_dropoff_step'].map((signal) => (
                                        <li key={signal} className="flex items-center group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3 group-hover:scale-125 transition-transform" />
                                            <span className="text-sm text-gray-600 font-mono group-hover:text-gray-900 transition-colors">
                                                {signal}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Engagement Signals Section */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-50 rounded-lg">
                                        <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Engagement Signals</h3>
                                </div>

                                <ul className="space-y-3">
                                    {['whatsapp_open', 'sms_click', 'push_click', 'call_center_interaction', 're_engagement_score', 'cold_user_score'].map((signal) => (
                                        <li key={signal} className="flex items-center group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 group-hover:scale-125 transition-transform" />
                                            <span className="text-sm text-gray-600 font-mono group-hover:text-gray-900 transition-colors">
                                                {signal}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* Outputs Tab */}
                <TabPanel value={activeTab} index={6}>
                    <CampaignRecommendations />
                </TabPanel>


                {/* Custom Reporting Tab */}
                < TabPanel value={activeTab} index={7} >
                    <Box sx={{ p: 3 }}>
                        {/* Header with Date Range */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'white',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    fontSize: '14px',
                                    color: 'text.secondary'
                                }}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>July 01, 2024</Typography>
                                    <Typography variant="body2" sx={{ mx: 1, color: 'text.disabled' }}>→</Typography>
                                    <Typography variant="body2" sx={{ mr: 1 }}>November 24, 2025</Typography>
                                    <CalendarMonth sx={{ fontSize: 18, color: 'text.disabled', ml: 1 }} />
                                </Box>
                                <IconButton size="small" color="default">
                                    <Settings fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Sub-Tabs */}
                        <Tabs value={0} sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                            <Tab label="Performance" />
                            <Tab label="Insights" />
                            <Tab label="Diagnostics" />
                            <Tab label="Timeline" />
                            <Tab label="Incremental Impact" />
                        </Tabs>

                        {/* Controls Row */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 3, mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                                {/* Comparison Groups */}
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                                        Comparison Groups
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Button variant="outlined" size="small" endIcon={<KeyboardArrowDown />} sx={{ textTransform: 'none' }}>
                                            Bajaj
                                        </Button>
                                        <Typography variant="body2" color="text.secondary">vs</Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            endIcon={<KeyboardArrowDown />}
                                            sx={{
                                                textTransform: 'none',
                                                borderColor: '#005dac',
                                                color: '#005dac',
                                                '&:hover': { borderColor: '#003f75', bgcolor: '#f5f9ff' }
                                            }}
                                        >
                                            Control Group
                                        </Button>
                                    </Box>
                                </Box>

                                {/* Aggregation */}
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                                        Aggregation
                                    </Typography>
                                    <Button variant="outlined" size="small" endIcon={<KeyboardArrowDown />} sx={{ textTransform: 'none' }}>
                                        7 days rolling
                                    </Button>
                                </Box>

                                {/* Segments */}
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                                        Segments
                                    </Typography>
                                    <Button variant="outlined" size="small" endIcon={<KeyboardArrowDown />} sx={{ textTransform: 'none' }}>
                                        All segments
                                    </Button>
                                </Box>

                                {/* Timeline Events Toggle */}
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                                        Timeline Events
                                    </Typography>
                                    <Switch size="small" />
                                </Box>
                            </Box>

                            {/* View Mode & Download */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <ToggleButtonGroup value="trending" exclusive size="small">
                                    <ToggleButton value="trending" sx={{ textTransform: 'none', px: 2 }}>
                                        <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> Trending
                                    </ToggleButton>
                                    <ToggleButton value="driver" sx={{ textTransform: 'none', px: 2 }}>
                                        <Dashboard fontSize="small" sx={{ mr: 0.5 }} /> Driver tree
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <IconButton size="small">
                                    <Download fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Main Content: Metrics + Charts */}
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {/* Left: Metrics Cards */}
                            <Box sx={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[
                                    { label: 'Incremental Monthly Value / Customer', value: '7.016', change: '42.81%', comparison: '4.912' },
                                    { label: 'Incremental Monthly Value / Upgrade', value: '4.389', change: '9.36%', comparison: '4.013' },
                                    { label: 'Upgrades / Customer', value: '1.598', change: '30.6%', comparison: '1.224' },
                                ].map((metric, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            cursor: 'pointer',
                                            borderColor: index === 0 ? '#005dac' : 'divider',
                                            bgcolor: index === 0 ? '#f5f9ff' : 'white',
                                            '&:hover': { boxShadow: 1 },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                                <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', lineHeight: 1.4 }}>
                                                    {metric.label}
                                                </Typography>
                                                <HelpOutline sx={{ fontSize: 14, color: 'text.disabled' }} />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
                                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                    {metric.value}
                                                </Typography>
                                                <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
                                            </Box>
                                            <Typography variant="caption" color="text.secondary">
                                                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                                                    {metric.change}
                                                </Typography>
                                                {' '}vs Control Group ({metric.comparison})
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>

                            {/* Right: Charts */}
                            <Card variant="outlined" sx={{ flex: 1 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                        <Typography variant="h6" fontWeight="600">
                                            Incremental Monthly Value / Customer
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <IconButton size="small"><ZoomIn fontSize="small" /></IconButton>
                                            <IconButton size="small"><ZoomOut fontSize="small" /></IconButton>
                                            <IconButton size="small"><PanTool fontSize="small" /></IconButton>
                                            <IconButton size="small"><Home fontSize="small" /></IconButton>
                                            <IconButton size="small"><Download fontSize="small" /></IconButton>
                                        </Box>
                                    </Box>

                                    {/* Charts Container */}
                                    <Box sx={{ display: 'flex', gap: 4 }}>
                                        {/* Main Chart */}
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#005dac' }} />
                                                    <Typography variant="body2" color="text.secondary">Bajaj</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#60a5fa' }} />
                                                    <Typography variant="body2" color="text.secondary">Control Group</Typography>
                                                </Box>
                                            </Box>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <LineChart data={[
                                                    { month: 'Jul', bajaj: 0.08, control: 0.09 },
                                                    { month: 'Aug', bajaj: 0.09, control: 0.08 },
                                                    { month: 'Sep', bajaj: 0.07, control: 0.09 },
                                                    { month: 'Oct', bajaj: 0.10, control: 0.08 },
                                                    { month: 'Nov', bajaj: 0.08, control: 0.09 },
                                                    { month: 'Dec', bajaj: 0.12, control: 0.08 },
                                                    { month: 'Jan', bajaj: 0.11, control: 0.09 },
                                                    { month: 'Feb', bajaj: 0.15, control: 0.07 },
                                                    { month: 'Mar', bajaj: 0.14, control: 0.08 },
                                                    { month: 'Apr', bajaj: 0.17, control: 0.06 },
                                                    { month: 'May', bajaj: 0.16, control: 0.08 }
                                                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
                                                    <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                                                    <Tooltip />
                                                    <Line type="monotone" dataKey="bajaj" stroke="#005dac" strokeWidth={2} dot={{ fill: '#005dac', r: 3 }} />
                                                    <Line type="monotone" dataKey="control" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa', r: 3 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        {/* Uplift Chart */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
                                                Uplift %
                                            </Typography>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <LineChart data={[
                                                    { month: 'Jul', uplift: -10 },
                                                    { month: 'Aug', uplift: -20 },
                                                    { month: 'Sep', uplift: 10 },
                                                    { month: 'Oct', uplift: 30 },
                                                    { month: 'Nov', uplift: 20 },
                                                    { month: 'Dec', uplift: 60 },
                                                    { month: 'Jan', uplift: 80 },
                                                    { month: 'Feb', uplift: 150 },
                                                    { month: 'Mar', uplift: 200 },
                                                    { month: 'Apr', uplift: 120 },
                                                    { month: 'May', uplift: 100 }
                                                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
                                                    <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                                                    <Tooltip formatter={(value) => `${value}%`} />
                                                    <Line type="monotone" dataKey="uplift" stroke="#4ade80" strokeWidth={2} dot={{ fill: '#4ade80', r: 3 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </TabPanel >
            </Card >

            {/* Success Notification */}
            < Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)
                }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }} variant="filled">
                    Configuration saved successfully!
                </Alert>
            </Snackbar >
        </Box >
    );
}
