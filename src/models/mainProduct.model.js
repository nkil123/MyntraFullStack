const {Schema, model} = require ('mongoose');

const mainProductSchema = Schema ({
  imageUrl: {type: String, required: true},
  BrandName: {type: String, required: true},
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
  ],
});

module.exports = model ('mainProduct', mainProductSchema);
