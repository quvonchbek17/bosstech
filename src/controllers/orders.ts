import { Request, Response, NextFunction } from "express";
import ordersModel from "../models/orders.model"
import { ErrorHandler } from "../errors/errorHandler"
import { ProtectRequest } from "../interface/protect.request";
import { Jwt } from "../utils/jwt";
import usersModel from "../models/users.model";
import productsModel from "../models/products.model";


export class Orders {

    static async GetOrders(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await ordersModel.find()
        })
    }

    static async GetOrdersSortCreatedAt(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await ordersModel.find().sort({created_at: -1})
        })
    }

    static async GetOrdersSortCount(req: Request,res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await ordersModel.find().sort({count: -1})
        })
    }

    static async GetOrderById(req: ProtectRequest, res: Response,next: NextFunction): Promise<void> {
        res.status(200).json({
            success: true,
            data: await ordersModel.findOne({_id: req.params.id})
        })
    }

    static async Post(req: Request, res: Response): Promise<void> {
        const { count, userId, productId, } =  req.body;

        const userCheck =  await usersModel.findOne({_id: userId})
        if(!userCheck){
            res.status(404).json({
                success: false ,
                message: "Bunday user yo'q !"
            })
            return
        }

        const productCheck =  await productsModel.findOne({_id: productId})
        if(!productCheck){
            res.status(404).json({
                success: false ,
                message: "Bunday mahsulot yo'q !"
            })
            return
        }


        const order = new ordersModel({
            count, user: userId, product: productId, created_at: new Date(), updated_at: new Date()
        })
        order.save()
        res.status(200).json({
            success: true,
            message: "Buyurtma yaratildi",
            data: order
        })

        if(order) {
            let user = await usersModel.findOne({_id: userId})
            user?.orders.push(order.id || order._id)
            user?.save()

            let product = await productsModel.findOne({_id: productId})
            product?.orders.push(order.id || order._id)
            product?.save()
        }
    }

    static async Update(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id, userId, productId, count } = req.body

        const userCheck =  await usersModel.findOne({_id: userId})
        if(!userCheck){
            res.status(404).json({
                success: false ,
                message: "Bunday user yo'q !"
            })
            return
        }

        const productCheck =  await productsModel.findOne({_id: productId})
        if(!productCheck){
            res.status(404).json({
                success: false ,
                message: "Bunday mahsulot yo'q !"
            })
            return
        }

        const updated = await ordersModel.findOneAndUpdate({ _id: id }, {
            $set: {
                count,
                user: userId,
                product: productId,
                updated_at: new Date()
            }
        }).
        catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

           if(updated){
            updated.save()
            const [ newData ] = await ordersModel.find({_id: id})
            res.status(200).json({
                success: true,
                message: "ma'lumotlar o'zgartirildi",
                data: newData
            })
           } else {
            res.status(404).json({
                success: false,
                message: "Buyurtma topilmadi"
            })
           }
    }


    static async Delete(req: Request, res: Response,next: NextFunction): Promise<void> {
        const { id } = req.params

        const deleted = await ordersModel.findByIdAndDelete({_id: id})
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 503)))

        if(deleted) {
            res.status(200).json({
                success: true,
                message: "Buyurtma o'chirildi",
                data: deleted
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Buyurtma topilmadi"
            })
        }

    }
}
