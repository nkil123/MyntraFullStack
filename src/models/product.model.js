const {Schema, model} = require ('mongoose');

const productSchema = Schema (
  {
    title: {type: String, required: true},
    price: {type: Number, required: true},
    gender: {type: String, required: true},
    ageGroup: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    sizes: [{type: String, required: true}],
    discount: {type: String, required: true},
    off_price: {type: Number, required: true},
    images: [{type: String, required: true}],
    ratings: {type: Number, required: true},
    count: {type: Number, required: true},
  },
  {
    versionKeys: false,
    timestamps: true,
  }
);

module.exports = model ('product', productSchema);

/*
{
    id: 102,
    title: 'Women Black Solid Chunky Combat Boots',
    price: 2699,
    gender: 'women',
    description: 'Combat boots with chunky, patterned soles, lacing at the front, a zip in one side and a loop at the back.',
    category: "Women's Footwear",
    brand: 'H&M',
    color: 'black',
    discount: '20',
    off_price: 2899,
    images: {
      image1: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15674090/2021/9/30/afaff65c-4bb5-4f76-a15e-fad7ac12dcf61632997313239Chunkycombatboots3.jpg',
      image2: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15674090/2021/9/30/3027a850-cbd1-45f0-9246-7ddd20463da01632997313348Chunkycombatboots4.jpg',
      image3: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15674090/2021/9/30/1bda9625-d20a-4105-84d7-0a50cf6ddadd1632997313456Chunkycombatboots5.jpg',
    },
    ratings: 4.6,
    count: 135,
  },


*/
