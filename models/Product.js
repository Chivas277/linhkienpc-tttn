import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        slug: { type: String, require: true, unique: true },
        image: { type: String, require: true },
        images: { type: String },
        price:{type:Number,require:true,default:0},
        //danhmuc: [Category],
        category: {type: Array},
        brand:{type: String,default:""},
        description:{type: String,require:true, default:""},
        countInStock:{type: String,require:true, default:0},
    },
    {
        timestamps:true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
