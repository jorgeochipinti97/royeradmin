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
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Unique', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
        type: String,
        default: 'shirts'
    },
    talles: [{
        size: { type: String },
        stock: { type: Number }
    }]
    ,
    gender: {
        type: String,
        default: 'women'
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