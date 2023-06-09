import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';
import { isValidObjectId } from 'mongoose';


type Data =
    | { message: string }
    | IOrder
    | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
        case 'PUT':
            return updateOrder(req, res);
        case 'GET':
            return getOrders(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body as IOrder;

    await db.connect();

    try {
            const newOrder = new Order({ ...req.body, isPaid: false, });
            newOrder.total = Math.round(newOrder.total * 100) / 100;
            await newOrder.save();
            await db.disconnect();

            return res.status(201).json(newOrder);         

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '' } = req.body as IOrder;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }

    try {
        console.log(req.body)
        await db.connect();
        const order = await Order.findById(_id);
        if (!order) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }
        await order.update(req.body);
        await db.disconnect();


        return res.status(200).json(order);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }


}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const orders = await Order.find()      
    .sort({ createdAt: 'desc' })
    .lean()
    await db.disconnect();
    return res.status(200).json(orders)

}