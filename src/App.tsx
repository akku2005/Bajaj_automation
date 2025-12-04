import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './components/layouts/MainLayout';

// Dashboard Pages
import CampaignStrategyDashboard from './pages/Dashboard/CampaignStrategyDashboard';
// import DecisionMonitor from './pages/AIDecisionMonitor/DecisionMonitor';
import SegmentBuilder from './pages/SegmentBuilder/SegmentBuilder';
import PerformanceDashboard from './pages/Analytics/PerformanceDashboard';
import GovernanceDashboard from './pages/Governance/GovernanceDashboard';
import CampaignOverview from './pages/CampaignGovernance/CampaignOverview';
import CampaignStats from './pages/CampaignGovernance/CampaignStats';
import CreateCampaign from './pages/CampaignGovernance/CreateCampaign';
import SystemReportingDashboard from './pages/Reporting/SystemReportingDashboard';
import RevenueOptimization from './pages/Revenue/RevenueOptimization';
import BudgetGoalsSettings from './pages/Settings/BudgetGoalsSettings';

// New User-Level Decisioning Pages
import UserExplorerPage from './pages/UserExplorer/UserExplorerPage';
import DecisionStreamPage from './pages/DecisionStream/DecisionStreamPage';
import RLDashboard from './pages/ReinforcementLearning/RLDashboard';

// Use Cases Pages
import UseCasesPage from './pages/UseCases/UseCasesPage';
import UseCaseDetail from './pages/UseCases/UseCaseDetail';
import UseCaseConfiguration from './pages/UseCases/UseCaseConfiguration';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#005dac', // Bajaj blue
            light: '#3383c4',
            dark: '#003f75',
            contrastText: '#fff',
        },
        secondary: {
            main: '#EC4899', // Pink accent
            light: '#F9A8D4',
            dark: '#DB2777',
        },
        background: {
            default: '#FAFAFA', // Very light gray background
            paper: '#FFFFFF', // Pure white for cards
        },
        text: {
            primary: '#1F2937', // Dark gray
            secondary: '#6B7280', // Medium gray
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 6,
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    borderRadius: 8,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Navigate to="/use-cases" replace />} />
                        <Route path="dashboard" element={<CampaignStrategyDashboard />} />
                        <Route path="campaigns" element={<CampaignOverview />} />
                        <Route path="campaigns/stats" element={<CampaignStats />} />
                        <Route path="campaigns/create" element={<CreateCampaign />} />
                        <Route path="reporting" element={<SystemReportingDashboard />} />
                        <Route path="revenue" element={<RevenueOptimization />} />

                        <Route path="segments" element={<SegmentBuilder />} />
                        <Route path="analytics" element={<PerformanceDashboard />} />
                        <Route path="governance" element={<GovernanceDashboard />} />
                        <Route path="settings/budget-goals" element={<BudgetGoalsSettings />} />

                        {/* New User-Level Decisioning Routes */}
                        <Route path="users" element={<UserExplorerPage />} />
                        <Route path="users/:userId" element={<UserExplorerPage />} />
                        <Route path="decisions/stream" element={<DecisionStreamPage />} />
                        <Route path="rl" element={<RLDashboard />} />

                        {/* Use Cases Routes */}
                        <Route path="use-cases" element={<UseCasesPage />} />
                        <Route path="use-cases/:id" element={<UseCaseDetail />} />
                        <Route path="use-cases/:id/configure" element={<UseCaseConfiguration />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
