import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    description: { type: String, required: true, default: '' },
    personalization: { type: String },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
        type: String,

    },
    talles: [{
        size: { type: String },
        stock: { type: Number }
    }]
    ,
    gender: {
        type: String,

    },
    popular: {

        type: Boolean,
        default: false,

    },
    destacados: {

        type: Boolean,
        default: false,

    }
    // agregar productos relacionados 
}, {
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);


export default Product;