import { CustomError } from "../utils/customError.util.js";
import { prisma } from "../utils/prisma.util.js";

export const createCategory = async(req, res) => {
    const { name } = req.body;

    const category = await prisma.category.create({
        data : {
            name
        }
    });

    return res.status(201).json({
        success : true,
        data : category,
        message : "Category created successfully"
    });
};

export const getCategories = async(req,res) => {
    const {name} = req.query;
    const categories = await prisma.category.findMany({
        where : 
            name ? {name} : undefined
    });

    if (categories.length === 0) {
        if (name) {
            throw new CustomError("Category not found", 404);
        }

        throw new CustomError("No categories found", 404);
    }

    return res.status(200).json({
        success : true,
        data : categories,
        message: "Categories fetched successfully"
    })
}

export const updateCategory = async(req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const existingCategory = await prisma.category.findUnique({
        where : {
            id
        }
    });
    if (!existingCategory){
        throw new CustomError("Category not found", 404);
    }
    const category  = await prisma.category.update ({
        where : {
            id
        },
        data : {
            name
        }
    })
    
    return res.status(200).json({
        success : true,
        data : category ,
        message :"Category updated successfully"
    })
}

export const deleteCategory = async(req, res) => {
    const {id} = req.params;

    const existingCategory = await prisma.category.findUnique({
        where : {
            id
        }
    });
    if (!existingCategory) {
        throw new CustomError("Category not found", 404);
    };

    const category = await prisma.category.delete({
        where : {
            id
        }
    })
    return res.status(200).json({
        success : true,
        data : category ,
        message :"Category deleted successfully"
    })

}