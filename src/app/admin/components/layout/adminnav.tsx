'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import Link from 'next/link';
import Image from 'next/image'

const drawerWidth = 240;

export default function AdminNavHeader({ children }: any) {

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuList = [
        {
            icon: <DashboardCustomizeTwoToneIcon />,
            title: 'Dashbaord',
            link: '/admin/dashboard'
        },
        {
            icon: <SendTwoToneIcon />,
            title: 'Transactions',
            link: '/admin/transactions',
        },
        {
            icon: <AccountCircleTwoToneIcon />,
            title: 'Accounts',
            link: '/admin/accounts'
        },
        {
            icon: <SettingsSuggestTwoToneIcon />,
            title: 'Users',
            link: '/admin/users'
        }
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuList.map((item, index) => (
                    <ListItem key={index}>
                        <Link href={item.link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{
            display:
                { xs: 'block', sm: 'flex' }, backgroundColor: 'white'
        }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#4f0d56'
                }}
            >
                <Toolbar className='flex justify-between'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuOpenTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Image src="/wp-content/themes/chelseagroton-2023/public/images/logo_transparent.png" width="100" height="10" alt="Bank logo" className='rounded' />

                    <Button variant="outlined" size="medium" style={{
                        borderRadius: 100,
                        backgroundColor: "#4f0d56",
                        color: 'white',
                        borderColor: 'whitesmoke'

                    }} className='text-xs'>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer

                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>


            <Box
                component="main"
                sx={{ flexGrow: 1 }}
            >
                <Toolbar />
                <Box className="h-16 shadow w-full bg-gray-50 flex items-center pl-2 text-sm">
                    Good Afternoon, Kelvin
                </Box>

                <Box component="section" sx={{ flexGrow: 1, p: 2 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
