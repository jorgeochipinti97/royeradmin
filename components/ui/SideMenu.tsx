import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, SearchOutlined, DashboardOutlined, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"
import GradeIcon from '@mui/icons-material/Grade';
import { useRouter } from 'next/router';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import QuizIcon from '@mui/icons-material/Quiz';
import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import NotListedLocationSharpIcon from '@mui/icons-material/NotListedLocationSharp';
import Cookie from 'js-cookie';
export const SideMenu = () => {

    const router = useRouter();

    // TODO: HACER QUE LA BUSQUEDA SEA POR LOCALSTORAGE Y NO POR QUERY
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        navigateTo('/search');
    }


    const navigateTo = (url: string) => {
        router.push(url);
    }


    return (

        <Box sx={{ width: 250, paddingTop: 5 }}>

            <List>






                <ListItem
                    button
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/products')}
                >
                    <ListItemIcon>
                        <StorefrontOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Products'} />
                </ListItem>
                <ListItem
                    button
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/find')}
                >
                    <ListItemIcon>
                        <ContentPasteSearchSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Find My Order'} />
                </ListItem>

                <ListItem
                    sx={{ display: { xs: '', sm: 'none' } }}
                    button
                    onClick={() => navigateTo('/contact')}>
                    <ListItemIcon>
                        <ConnectWithoutContactIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Contact Us'} />
                </ListItem>
                <ListItem
                    sx={{ display: { xs: '', sm: 'none' } }}
                    button
                    onClick={() => navigateTo('/faqs')}>
                    <ListItemIcon>
                        <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary={'FAQS'} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigateTo('/favorites')}>
                    <ListItemIcon>
                        <GradeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Favorites'} />
                </ListItem>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>
                <ListItem
                    button
                    onClick={() => navigateTo('/admin/')}>
                    <ListItemIcon>
                        <DashboardOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>

                <ListItem button
                    onClick={() => navigateTo('/admin/crypto')}>

                    <ListItemIcon>
                        <CurrencyBitcoinIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Crypto Orders'} />
                </ListItem>
                <ListItem button
                    onClick={() => navigateTo('/admin/products')}>
                    <ListItemIcon>
                        <CategoryOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Products'} />
                </ListItem>
                <ListItem button
                    onClick={() => navigateTo('/admin/orders')}
                >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Orders'} />
                </ListItem>

                <ListItem button
                    onClick={() => navigateTo('/admin/users')}>

                    <ListItemIcon>
                        <AdminPanelSettings />
                    </ListItemIcon>
                    <ListItemText primary={'Users'} />
                </ListItem>
                <ListItem button
                    onClick={() => navigateTo('/admin/queries')}>

                    <ListItemIcon>
                        <NotListedLocationSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Queries'} />
                </ListItem>





            </List>
        </Box>

    )
}