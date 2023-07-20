import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
        maxLength: 50,
        default: 1,
    },
    price : {
        type: Number,
        required: true,
        maxLength: 8,
    },
    category : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true
    },
    supplier : {
        type: String,
        required : true
    },
    available: {
        type: Boolean,
        default: true,
    },
    suppliers: {
      adminUsername: {
        type: String,
        required: true,
      },
      adminEmail: {
        type: String,
        required: true,
      },
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
