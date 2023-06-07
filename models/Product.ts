import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    description: { type: String, required: true, default: '' },
    personalization: { type: String },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    sizes: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'jacket', 'pants', 'hoodies', 'hats', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag', 'espadrilles', 'footwear'],
            message: '{VALUE} no es un tipo válido'
        },
        default: 'shirts'
    }
    ,
    gender: {
        type: String,
        enum: {
            values: ['football', 'regional',],
            message: '{VALUE} no es un genero válido'
        },
        default: 'football'
    },
    popular: {

        type: Boolean,
        default: false,

    },
    productosRelacionados: [{
        title: { type: String },
        image: { type: String },
        description: { type: String }
    }]
}, {
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);


export default Product;