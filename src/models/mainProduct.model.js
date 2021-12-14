const {Schema, model} = require ('mongoose');

const mainProductSchema = Schema ({
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
