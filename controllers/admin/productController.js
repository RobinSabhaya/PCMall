const productModel = require('../../db/models/productSchema');
const productController = () =>{
    return {
    async  postProduct(req,res){
            const {name,price,link,img} = req.body;
            const productData = new productModel({
                name,
                price,
                link,
                img
            });
           await  productData.save();
           return res.status(201).json({msg : 'Product saved successfully'});
        }
    }
};
module.exports = productController;