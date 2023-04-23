import { Request, Response, NextFunction } from "express";
import usersModel from "../models/users.model"
import { ErrorHandler } from "../errors/errorHandler"
import { ProtectRequest } from "../interface/protect.request";
import { Jwt } from "../utils/jwt";


export class Users {

    static async GetUsers(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await usersModel.find().sort({created_at: -1}).populate("files")
        })
    }

    static async GetUserById(req: ProtectRequest, res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await usersModel.findOne({_id: req.params.id})
        })
    }

    static async Post(req: Request, res: Response): Promise<void> {
        const { name, email, password, } =  req.body;

        const emailCheck =  await usersModel.findOne({email})

        if(emailCheck){
            res.status(409).json({
                success: false ,
                message: "Bu emaildan foydalanilgan !"
            })
            return
        }

        const user = new usersModel({
            name, email, password, created_at: new Date(), updated_at: new Date()
        })
        user.save()
        res.status(200).json({
            success: true,
            message: "user yaratildi",
            data: user
        })
    }

    static async Update(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id, name, email, password } = req.body
        const updated = await usersModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                email,
                password,
                updated_at: new Date()
            }
        }).
        catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

           if(updated){
            updated.save()
            const [ newData ] = await usersModel.find({_id: id})
            res.status(200).json({
                success: true,
                message: "ma'lumotlar o'zgartirildi",
                data: newData
            })
           } else {
            res.status(404).json({
                success: false,
                message: "user topilmadi"
            })
           }
    }


    static async Delete(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id } = req.params

        const deleted = await usersModel.findByIdAndDelete({_id: id})
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

        if(deleted) {
            // let fileName = (deleted.imgUrl || "").split("/").at(-1)
            // await FileUpload.DeleteFile(fileName || "")
            res.status(200).json({
                success: true,
                message: "user o'chirildi",
                data: deleted
            })
        } else {
            res.status(404).json({
                success: false,
                message: "user topilmadi"
            })
        }

    }
}
