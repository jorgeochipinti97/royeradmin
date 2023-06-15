import NextLink from 'next/link';
import useSWR from 'swr';

import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts'
import { IProduct } from '../../interfaces';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({ row }: any) => {
            return (
                <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={row.img}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        renderCell: ({ row }: any) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

];




const ProductsPage = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    const { isLoading, user } = useUser()

    const [searchTerm, setSearchTerm] = useState('')
    const [products, setProducts] = useState(data)

    const filterData = () => {

        const newData = data && data.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
        console.log(newData)
        setProducts(newData)
    }


    if (!data && !error) return (<></>);



    // TODO : poder ver que usuario compro que cosa




    const rows = products && products.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));


    return (

        <AdminLayout
            title={'Productos'}
            subTitle={'Mantenimiento de Productos'}
            icon={<CategoryOutlined />}
        >
      {user?.email?.toLowerCase() == 'jorgeochipinti97@gmail.com' || 'felanese1996@gmail.com' || 'Maurobelli22@gmail.com ' || 'sabrinagerzovich@hotmail.com' || 'sabrina.gerzovich@dhl.com' ? (
                <>

                    <Box>
                        <TextField onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button onClick={() => filterData()} variant='outlined' color='secondary' sx={{ m: 2 }}>Filtrar</Button>
                        <Button onClick={() => setProducts(data)} variant='outlined' color='secondary' sx={{ m: 2 }}>Todos los productos</Button>
                    </Box>

                    <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
                        <Button
                            startIcon={<AddOutlined />}
                            color="secondary"
                            href="/admin/products/new"
                        >
                            Crear producto
                        </Button>
                    </Box>

                    <Grid container className='fadeIn'>

                        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                            <DataGrid
                                rows={rows ? rows : []}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                            />
                        </Grid>
                    </Grid>
                </>
            )
                : <>no estas autorizado</>}
        </AdminLayout>

    )
}

export default ProductsPage