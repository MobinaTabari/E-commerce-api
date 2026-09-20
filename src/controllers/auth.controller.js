import { compareHashPassword, hashPassword } from "../utils/hashPassword.util.js";
import { createJwtToken } from "../utils/jwtToken.util.js";
import { prisma } from "../utils/prisma.util.js";

export const register = async(req,res) => {
    const {name, email, password} = req.body;

    const existingUser = await prisma.user.findUnique({
        where : {
            email
        }
    });
    if (existingUser){
        return res.status(409).json({
            success: false,
            data: null,
            message: "user already exists"
        })
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data : {
            name,
            password : hashedPassword,
            email
        }
    })

    return res.status(201).json({
        success : true,
        data : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role
        },
        message: "User registered successfully"
    })
}


export const login = async(req,res) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    });

    if (!user) {
        return res.status(401).json({
            success : false,
            data : null,
            message : "Invalid email or password"
        })
    };

    const isPasswordValid = await compareHashPassword(
        password,
        user.password
    );

    if (!isPasswordValid){
        return res.status(401).json({
            success : false,
            data : null,
            message : "Invalid email or password"
        })
    }

    const token = createJwtToken({
        id : user.id,
        role : user.role
    })

    return res.status(200).json({
        success: true,
        data: {
            token
        },
        message: "Login successful"
    });
}