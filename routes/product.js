import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import { isAuth, isAdmin } from '../middleware.js';


const productRouter = express.Router();

//getall
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//them
productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);
   try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
    res.send({ message: 'Đã thêm sản phẩm', product });
  })
);

//sua
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: 'Cập nhật thành công' });
    } else {
      res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Sản phẩm đã được xoá...");
    } catch (err) {
      return res.status(500).json(err);
    }
  })
);



export default productRouter;