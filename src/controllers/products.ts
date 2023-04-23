import { Request, Response, NextFunction } from "express";
import productsModel from "../models/products.model"
import { ErrorHandler } from "../errors/errorHandler"
import { ProtectRequest } from "../interface/protect.request";


export class Products {

    static async GetProducts(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.find()
        })
    }

    static async GetProductsSortCreatedAt(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.find().sort({created_at: -1})
        })
    }

    static async GetOrdersSortName(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.find().sort({name: 1})
        })
    }

    static async GetOrdersSortPrice(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.find().sort({price: 1})
        })
    }

    static async GetOrdersSortPriceDesc(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.find().sort({price: -1})
        })
    }

    static async GetProductById(req: ProtectRequest, res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await productsModel.findOne({_id: req.params.id})
        })
    }

    static async Post(req: Request, res: Response): Promise<void> {
        const { name, price, desc, } =  req.body;

        const productCheck =  await productsModel.findOne({name, price, desc})

        if(productCheck){
            res.status(409).json({
                success: false ,
                message: "Bu mahsulot avval qo'shilgan !"
            })
            return
        }

        const user = new productsModel({
            name, price, desc, created_at: new Date(), updated_at: new Date()
        })
        user.save()
        res.status(200).json({
            success: true,
            message: "mahsulot yaratildi",
            data: user
        })
    }

    static async Update(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id, name, price, desc } = req.body
        const updated = await productsModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                price,
                desc,
                updated_at: new Date()
            }
        }).
        catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

           if(updated){
            updated.save()
            const [ newData ] = await productsModel.find({_id: id})
            res.status(200).json({
                success: true,
                message: "ma'lumotlar o'zgartirildi",
                data: newData
            })
           } else {
            res.status(404).json({
                success: false,
                message: "mahsulot topilmadi"
            })
           }
    }


    static async Delete(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id } = req.params

        const deleted = await productsModel.findByIdAndDelete({_id: id})
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))
        if(deleted) {
            // let fileName = (deleted.imgUrl || "").split("/").at(-1)
            // await FileUpload.DeleteFile(fileName || "")
            res.status(200).json({
                success: true,
                message: "mahsulot o'chirildi",
                data: deleted
            })
        } else {
            res.status(404).json({
                success: false,
                message: "mahsulot topilmadi"
            })
        }

    }
}
