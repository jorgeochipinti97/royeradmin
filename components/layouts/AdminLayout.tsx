import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Navbar } from '../ui';
import { useUser } from '@auth0/nextjs-auth0/client';




interface Props {
    children: any
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
    const { isLoading, user } = useUser()
    return (
        <>




            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {user && (
                    <Box>
                        <Typography variant='subtitle1' sx={{ color: 'black',textAlign:'center' }}>Hola! {user.name}</Typography>
                    </Box>
                )}

                <Box display="flex" flexDirection='column'>
                    <Typography variant='h1' component='h1'>
                        {icon}
                        {' '} {title}
                    </Typography>
                    <Typography variant='h2' sx={{ mb: 1 }}>{subTitle}</Typography>

                </Box>
                <Navbar />
                <Box className='fadeIn'>
                    {children}
                </Box>

            </main>


        </>
    )
}
