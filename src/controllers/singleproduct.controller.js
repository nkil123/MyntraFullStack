
const Product = require ('../models/singleproduct.model');



const storeSingleProduct=async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.send(product);

    }catch(e){
        return res.status(400).json({status:"failed", message: e.message});

    }

   
}

module.exports = storeSingleProduct;