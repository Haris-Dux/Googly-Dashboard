import mongoose from "mongoose";

const imageSchema = {
  downloadURL: { type: String, required: [true, "Image link required"] },
  name: { type: String },
  type: { type: String },
};

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    description: {
      type: String,
      required: [true, "Description required"],
    },
    product_code: {
      type: String,
      required: [true, "product_code required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    sale_price: {
      type: Number,
      default:0
    },
    stock: {
      type: Number,
      required: [true, "stock required"],
    },
    images: {
      primary: imageSchema,
      image2: imageSchema,
      image3: imageSchema,
      image4: imageSchema,
    },
    category:{
        type: String,
        required: [true, "category required"],
        enum:["Men","Women"]
    },
    latest:{
        type: Boolean,
        default:false,
    }
  },
  { timestamps: true }
);

export const ProductsModel = mongoose.model("Products", productsSchema);
