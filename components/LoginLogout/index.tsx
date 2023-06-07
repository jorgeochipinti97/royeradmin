import React, { useEffect } from 'react'
import NextLink from 'next/link';
import { Link, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';

export const LoginLogout = () => {
    const { error, isLoading, user } = useUser()
    useEffect(() => {
        console.log(user)

    }, [])

    return (
        <>
            {!user ? (
                <NextLink href='/api/auth/login' passHref>
                    <Link>
                        <Button color={'primary'}>Login</Button>
                    </Link>
                </NextLink>
            )
                : (
                    <NextLink href='/api/auth/logout' passHref>
                        <Link>
                            <Button color={'primary'}>Logout</Button>
                        </Link>
                    </NextLink>
                )
            }
        </>
    )
}
