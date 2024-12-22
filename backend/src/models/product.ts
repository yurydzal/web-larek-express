import mongoose from 'mongoose';

enum Category {
    SoftSkill = 'софт-скил',
    HardSkill = 'хард-скил',
    Button = 'кнопка',
    Other = 'другое',
    Extra = 'дополнительное',
}

interface IProduct {
    title: string;
    image: {
        fileName: string;
        originalName: string;
    };
    category: string;
    description?: string;
    price?: null | number;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
