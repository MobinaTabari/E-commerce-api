import { CustomError } from "../utils/customError.util.js";
import { prisma } from "../utils/prisma.util.js";

export const createProduct = async (req,res) => {
    const {name,price, stock, category_id} = req.body;

    const category = await prisma.category.findUnique({
        where : {
            id: category_id
        }
    });
    if (!category){
        throw new CustomError("Category not found", 404)
    }

    const product = await prisma.product.create({
        data : {
            name,
            price,
            stock,
            category_id
        }
    });

    return res.status(201).json({
        success : true,
        data : product,
        message : "Product created successfully"
    })
};

export const getProducts = async (req,res) => {

    const {name, category, minPrice, maxPrice, inStock } = req.query;

    const where = {};

    if (name) {
        where.name = {
            contains: name
        };
    }

    if (category) {
        where.category = {
            name: {
                contains: category
            }
        };
    }

    if (minPrice){
        where.price = {
            gte : Number(minPrice)
        }
    }

    if (maxPrice){
        where.price = {
            ...where.price,
            lte : Number(maxPrice)
        }
    }

    if(inStock === "true"){
        where.stock = {
            gte : 1
        }
    }
    
    if(inStock === "false"){
        where.stock = {
            equals : 0
        }
    }

    const products = await prisma.product.findMany({
        where
    });

    if (products.length === 0){
        throw new CustomError("No products found", 404);
    }

    return res.status(200).json({
        success : true,
        data: products,
        message: "Products fetched successfully"
    })
};

export const getProductById = async (req, res) => {
    const {id} = req.params;

    const product = await prisma.product.findUnique({
        where : {
            id
        }
    });

    if(!product){
        throw new CustomError("Product not found",404)
    }
    
    return res.status(200).json({
        success : true,
        data: product,
        message : "Product fetched successfully"
    })
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, stock, category_id} = req.body;

    const data = {};
    if (name !== undefined){
        data.name = name;
    }
    if (price !== undefined){
        data.price = price;
    }
    if (stock !== undefined){
        data.stock = stock;
    }
    if (category_id !== undefined){
        const category = await prisma.category.findUnique({
            where : {
                id : category_id
            }
        })
        if(!category){
            throw new CustomError("Category not found",404)
        }
        data.category_id = category_id;
    }

    const product = await prisma.product.findUnique({
        where : {
            id
        }
    })

    if (!product){
        throw new CustomError("Product not found",404)
    }

    if(Object.keys(data).length === 0){
        throw new CustomError("No fields to update", 400);
    }
    
    const updatedProduct = await prisma.product.update({
        where : {
            id
        },
        data
    })

    res.status(200).json({
        success : true,
        data : updatedProduct,
        message : "Product updated successfully"
    })
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;

    const product = await prisma.product.findUnique({
        where : {
            id
        }
    });

    if(!product){
        throw new CustomError("Product not found", 404);
    }

    const deletedProduct = await prisma.product.delete({
        where: {
            id
        }
    });

    return res.status(200).json({
        success: true,
        data: deletedProduct,
        message: "Product deleted successfully"
    });
}