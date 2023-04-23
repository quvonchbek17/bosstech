import { Request, Response, NextFunction } from "express";
import adminsModel from "../models/admins.model"
import { Jwt } from "../utils/jwt";
import usersModel from "../models/users.model";


export class Auth {

    static async AdminLogin(req: Request, res: Response): Promise<void> {
        const { email, password, } =  req.body;

        const admin = await adminsModel.findOne({email, password})

        if(admin){
            res.status(200).json({
                success: true,
                token: await Jwt.generateToken(email)
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Email yoki parol xato !"
            })
        }

    }

    static async UserLogin(req: Request, res: Response): Promise<void> {
        const { email, password, } =  req.body;

        const admin = await usersModel.findOne({email, password})

        if(admin){
            res.status(200).json({
                success: true,
                token: await Jwt.generateToken(email)
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Email yoki parol xato !"
            })
        }

    }
}
