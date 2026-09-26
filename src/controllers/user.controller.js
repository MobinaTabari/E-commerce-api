import { CustomError } from "../utils/customError.util.js";
import { prisma } from "../utils/prisma.util.js";
import fs from "fs";
import { unlink } from "fs/promises";

export const uploadUserImages = async (req, res) => {
    const userId = req.user.id;

    const images = req.files.map((file) => ({
        path: file.path,
        user_id: userId
    }));

    await prisma.userImage.createMany({
        data: images
    });

    return res.status(201).json({
        success: true,
        data: images,
        message: "User images uploaded successfully"
    });
};

export const getUserImages = async (req, res) => {
    const user_id = req.user.id;

    const userImage = await prisma.userImage.findMany({
        where : {
            user_id
        }
    })

    return res.status(200).json({
        success: true,
        data : userImage,
        message: "User images fetched successfully"
    });
}

export const deleteUserImage = async (req,res) => {
    const userId = req.user.id; 
    const imageId = req.params.imageId;

    const image = await prisma.userImage.findFirst({
        where : {
            id : imageId,
            user_id : userId
        }
    })

    if(!image){
        throw new CustomError("Image not found", 404)
    }

    await unlink(image.path);

    const deletedImage = await prisma.userImage.delete({
        where : {
            id : imageId
        }
    });

    return res.status(200).json({
        success : true,
        data : deletedImage,
        message : "image deleted successfully"
    })
}