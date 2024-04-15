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
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import Link from 'next/link';
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import { Paper } from '@mui/material';
import { Close, DirectionsTwoTone, FastForwardTwoTone, LogoutTwoTone } from '@mui/icons-material';
import { useIdleTimer } from 'react-idle-timer'
import { ToastContainer, toast } from 'react-toastify';
import Script from 'next/script';

const drawerWidth = 240;

export default function Header({ props, user, children }: any) {
    const userInfo = user;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useIdleTimer({
        onIdle: () => {
            toast("Logged out, due to Inactivity")
            signOut()
        }
    })

    const date = new Date(Date.now());
    let hours = date.getHours();
    let status = (hours < 12) ? "Good Morning" :
        ((hours <= 18 && hours >= 12) ? "Good Afternoon" : "Good Evening");


    const menuList = [
        {
            icon: <DashboardCustomizeTwoToneIcon />,
            title: 'Dashbaord',
            link: '/clientarea/dashboard'
        },
        {
            icon: <SendTwoToneIcon />,
            title: 'Transfers',
            link: '/clientarea/transfer',
        },
        {
            icon: <DirectionsTwoTone />,
            title: 'Transactions',
            link: '/clientarea/transactions'
        },
        // {
        //     icon: <FastForwardTwoTone />,
        //     title: 'Insatnt Deposit',
        //     link: '/clientarea/withdrawals'
        // },
        {
            icon: <SettingsSuggestTwoToneIcon />,
            title: 'Settings',
            link: '/clientarea/settings'
        },
        {
            icon: <LogoutTwoTone />,
            title: 'Logout',
            link: '/clientarea/logout'
        }
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuList.map((item, index) => (
                    <ListItem key={index} onClick={handleDrawerToggle}>
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
        <>
            <Script
                defer
                id="show-livechat"
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `var _smartsupp = _smartsupp || {};
                    _smartsupp.key = 'f6dc823b901ba6913320391137b4222c9e6aa786';
                    window.smartsupp||(function(d) {
                      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                      c.type='text/javascript';c.charset='utf-8';c.async=true;
                      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                    })(document)` }}
                onLoad={() => {
                    console.log('Script has loaded')
                }}
            />

            {
                userInfo.status === "closed" ?
                    <div className="flex justify-center items-center h-screen">
                        <div className="px-5">
                            <div className="w-40 h-40 rounded-full bg-red-800 border border-gray-900 mx-auto flex justify-center items-center">
                                <Close className="w-1/2 h-1/2 text-gray-200" />
                            </div>

                            <div className="text-center text-2xl mt-10 font-thin">
                                Not Allowed
                            </div>

                            <div className="mt-10 text-sm text-center">
                                Apologies, it seems that your login attempt is originating from an unauthorized region. Please ensure that you are accessing our services from an approved location. If you believe this is an error, kindly contact our support team for assistance. Thank you for your understanding.
                            </div>
                        </div>
                    </div>
                    : userInfo.status === "blocked" ?
                        <div className="flex justify-center items-center h-screen">
                            <div className="px-5">
                                <div className="w-40 h-40 rounded-full bg-red-800 border border-gray-900 mx-auto flex justify-center items-center">
                                    <Close className="w-1/2 h-1/2 text-gray-200" />
                                </div>

                                <div className="text-center text-2xl mt-10 font-thin">
                                    Account Blocked
                                </div>

                                <div className="mt-10 text-sm text-center">
                                    Apologies, your account have been blocked, please walk into a branch close to you as soon as possible to reactivate your account.
                                </div>
                            </div>
                        </div>
                        :
                        <Box sx={{
                            display:
                                { xs: 'block', sm: 'flex' }, backgroundColor: 'white'
                        }}>
                            <CssBaseline />

                            <AppBar
                                sx={{
                                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                                    ml: { sm: `${drawerWidth}px` },
                                    backgroundColor: '#4f0d56',
                                    // top: user.status === "suspened" ? 60 : 0
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

                                    }} className='text-xs' onClick={() => signOut()}>
                                        Log Out
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <Box
                                component="nav"
                                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                                <Drawer

                                    variant="temporary"
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    ModalProps={{
                                        keepMounted: true,
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
                                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)`, backgroundColor: 'white' } }}
                            >
                                <Toolbar />
                                <Box className="h-16 shadow w-full bg-gray-50 flex items-center pl-2  capitalize md:text-3xl text-base font-thin">
                                    {status}, {userInfo.firstName}
                                </Box>



                                <Box component="section" sx={{ flexGrow: 1, p: 2 }}>
                                    {user.status === "suspened" ?
                                        <div className="from-red-700 rounded-md md:p-10 p-5 mb-5 bg-gradient-to-r to-red-600 text-gray-300 font-bold py-4 w-full top-0">
                                            For Your Security, access to this account has been suspended due to suspicious activities. For assistance please contact out customer service agent through the live chat button below.
                                        </div> : ''
                                    }
                                    {children}
                                </Box>

                                <footer>
                                    <Paper sx={{
                                        py: 2
                                    }}>

                                    </Paper>
                                </footer>
                            </Box>
                        </Box>

            }



                < ToastContainer />
        </>
    );
}
