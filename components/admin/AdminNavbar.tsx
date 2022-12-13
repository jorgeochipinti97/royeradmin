import { useContext } from 'react';
import NextLink from 'next/link';


import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';



export const AdminNavbar = () => {

    

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Royer |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Store</Typography>
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Button >
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}