import mongoose from 'mongoose';

const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    phone: { type: String, match: /^\d{10}$/, required: true },
    address: [{ type: Schema.Types.ObjectId, ref: 'Address', required: true }],
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, min: 1, required: true },
      },
    ],
    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        availability: { type: Boolean },
        price: { type: Number },
      },
    ],
    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

CustomerSchema.index({ email: 1 });

export default mongoose.model('Customer', CustomerSchema);
