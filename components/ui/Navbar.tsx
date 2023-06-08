import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { LoginLogout } from '../LoginLogout';


export const Navbar = () => {

    const { asPath, push } = useRouter();


    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push('/search');
    }



    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Admin - Royer |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Store</Typography>
                    </Link>
                </NextLink>
       
                <Box flex={1} />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">
                    <NextLink href='/' passHref>
                        <Link>
                            <Button color={asPath === '/' ? 'primary' : 'info'}>Home</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/admin/orders' passHref>
                        <Link>
                            <Button color={asPath === '/admin/orders' ? 'primary' : 'info'}>Orders</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/admin/products' passHref>
                        <Link>
                            <Button color={asPath === '/admin/products' ? 'primary' : 'info'}>Products</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/admin/products/new' passHref>
                        <Link>
                            <Button color={asPath === '/admin/products/new' ? 'primary' : 'info'}>Create New Product</Button>
                        </Link>
                    </NextLink>
                </Box>



                <Box flex={1} />

                <LoginLogout />


            </Toolbar>
        </AppBar>
    )
}
