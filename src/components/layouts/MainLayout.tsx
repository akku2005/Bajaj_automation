import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AIChatAssistant from '../chat/AIChatAssistant';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import {
    Target,
    Send,
    IndianRupee,
    Users,
    BarChart3,
    BrainCircuit
} from 'lucide-react';

const drawerWidth = 260;

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // User-Level AI Decisioning (New Paradigm - Priority)
    const userLevelItems = [
        { text: 'Use Cases', icon: <BrainCircuit className="w-5 h-5" />, path: '/use-cases' },
    ];

    // Campaign Management & Analytics
    const campaignItems = [
        { text: 'Campaign', icon: <Send className="w-5 h-5" />, path: '/campaigns' },
        { text: 'Daily Budget', icon: <IndianRupee className="w-5 h-5" />, path: '/settings/budget-goals' },
        { text: 'Ad-Hoc', icon: <Users className="w-5 h-5" />, path: '/segments' },
        { text: 'Reporting', icon: <BarChart3 className="w-5 h-5" />, path: '/reporting' },
    ];

    const drawer = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 2, minHeight: '80px !important', bgcolor: '#005dac' }}>
                <img
                    src="/bajaj-finserv.png"
                    alt="Bajaj Finserv"
                    style={{
                        height: 40,
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)'
                    }}
                />
            </Toolbar>
            <Divider />

            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {/* User-Level AI Decisioning Section */}
                <div className="px-4 pt-4 pb-2">
                    <p className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                        AI Decisioning
                    </p>
                </div>
                <List sx={{ px: 2, py: 0 }}>
                    {userLevelItems.map((item) => {
                        const isSelected = location.pathname.startsWith('/use-cases');
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    className={`rounded-lg transition-all duration-200 group ${isSelected
                                        ? '!bg-[#005dac] !text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    sx={{
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent' // Let Tailwind handle hover
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                        {React.cloneElement(item.icon as React.ReactElement<any>, {
                                            className: `w-5 h-5 transition-colors ${isSelected ? '!text-white' : 'text-gray-400 group-hover:text-gray-600'}`
                                        })}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            className: `text-sm font-medium ${isSelected ? '!text-white' : 'text-gray-600 group-hover:text-gray-900'}`
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                <Divider sx={{ mx: 2, my: 2 }} />

                {/* Campaign Management Section */}
                <div className="px-4 pb-2">
                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Campaign Management
                    </p>
                </div>
                <List sx={{ px: 2, py: 0 }}>
                    {campaignItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    className={`rounded-lg transition-all duration-200 group ${isSelected
                                        ? '!bg-[#005dac] !text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    sx={{
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent' // Let Tailwind handle hover
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                        {React.cloneElement(item.icon as React.ReactElement<any>, {
                                            className: `w-5 h-5 transition-colors ${isSelected ? '!text-white' : 'text-gray-400 group-hover:text-gray-600'}`
                                        })}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            className: `text-sm font-medium ${isSelected ? '!text-white' : 'text-gray-600 group-hover:text-gray-900'}`
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Attributics Logo Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 1 }}>
                    POWERED BY
                </Typography>
                <img
                    src="/attributics_logo.jpeg"
                    alt="Attributics"
                    style={{
                        height: 30,
                        width: 'auto',
                        objectFit: 'contain',
                        maxWidth: '100%'
                    }}
                />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" color="inherit" sx={{ ml: 1 }}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton sx={{ ml: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>A</Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(0,0,0,0.08)' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', bgcolor: '#f8f9fa' }}
            >
                <Toolbar />
                <Outlet />
            </Box>

            {/* AI Chat Assistant - Available on all pages */}
            <AIChatAssistant />
        </Box>
    );
}
