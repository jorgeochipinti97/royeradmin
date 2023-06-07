import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { useEffect } from 'react';
import Image from 'next/image';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    useEffect(() => {
        console.log(order.orderItems)
    })


    const { shippingAddress } = order;


    return (
        <AdminLayout
            title='Resumen de la orden'
            subTitle={`OrdenId: ${order._id}`}
            icon={<AirplaneTicketOutlined />}
        >

            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label="Orden paga"
                            variant='outlined'
                            color="success"
                            icon={<CreditScoreOutlined />}
                        />
                    ) :
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label="Pendiente de pago"
                            variant='outlined'
                            color="error"
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }



            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            </Box>


                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>
                            <Typography>{shippingAddress.email}</Typography>
                            <Typography>{shippingAddress.taxId}</Typography>
                            <Typography>{order.transactionId}</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Grid container>

                                {
                                    order.orderItems.map(e => (
                                        <Grid item xs={12} key={e.title}>

                                            <Card>
                                                <Box display='flex' justifyContent='center'>
                                                    <Image src={e.image} width={200} height={200} />
                                                </Box>
                                                <Box display='flex' justifyContent='center'>
                                                    <Typography variant='subtitle1'>{e.title}</Typography>
                                                </Box>
                                                <Box display='flex' justifyContent='center'>
                                                    <Typography variant='subtitle1'>Size: {e.size}</Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>


                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    total: order.total,
                                    precioFinal: order.total,
                                    codigoDeDescuento: order.discountCode

                                }}
                            />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                                {/* TODO */}


                                <Box display='flex' flexDirection='column'>
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label="Orden Paga"
                                                    variant='outlined'
                                                    color="success"
                                                    icon={<CreditScoreOutlined />}
                                                />

                                            ) : (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label="Pendiente de pago"
                                                    variant='outlined'
                                                    color="error"
                                                    icon={<CreditCardOffOutlined />}
                                                />
                                            )
                                    }
                                </Box>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </AdminLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;