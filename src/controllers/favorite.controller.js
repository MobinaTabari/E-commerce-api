import { CustomError } from "../utils/customError.util.js";
import { prisma } from "../utils/prisma.util.js";

export const addFavorite = async (req, res) => {
    const userId = req.user.id;
    const {product_id} = req.body;

    const product = await prisma.product.findUnique({
        where : {
            id : product_id
        }
    })

    if(!product){
        throw new CustomError("product not found", 404)
    }

    const existingFavorite = await prisma.favorite.findUnique({
        where : {
            user_id_product_id : {
                user_id : userId,
                product_id
            }
        }
    });

    if(existingFavorite){
        throw new CustomError("Product is already in favorites", 409)
    }

    const favorite = await prisma.favorite.create({
        data : {
            user_id : userId,
            product_id
        }
    })

    return res.status(201).json({
        success : true,
        data : favorite,
        message : "Product added to favorites successfully"
    })
}

export const getFavorites = async (req, res) => {
    const userId = req.user.id;

    const favorites = await prisma.favorite.findMany({
        where : {
            user_id : userId
        },
        include : {
            product : true
        }
    });

    return res.status(200).json({
        success : true,
        data : favorites,
        message : "Favorites fetched successfully"
    })

}

export const removeFavorite = async (req, res) => {
    const userId = req.user.id;
    const {product_id} = req.body;

    const favorite = await prisma.favorite.findUnique({
        where : {
            user_id_product_id : {
                user_id : userId,
                product_id
            }
        }
    });

    if (!favorite) {
        throw new CustomError("Favorite not found", 404);
    }

    const deletedFavorite  = await prisma.favorite.delete({
        where : {
            id : favorite.id
        }
    });

    return res.status(200).json({
        success: true,
        data: deletedFavorite,
        message: "Product removed from favorites successfully"
    });

}