import { Request, Response, NextFunction } from "express";
import filesModel from "../models/files.model"
import { ErrorHandler } from "../errors/errorHandler"
import usersModel from "../models/users.model";
import productsModel from "../models/products.model";
import fs from "fs"
import path from "path";
import { Schema } from "mongoose";


export class Files {

    static async GetFile(req: Request,res: Response, next: NextFunction): Promise<void> {

        try {
            fs.readFile(
                `${__dirname}/../../../uploads/${req.params.fileName}`,
              (err: unknown, data) => {
                if (err) {
                    res.status(404).json({
                      success: false,
                      message: "File not found !",
                    });
                  } else {
                    res.sendFile(
                    path.join(__dirname + "/../../../uploads/" + req.params.fileName),
                    function (err) {
                      if (err) {
                        return "error"
                      }
                    }
                  );
                }
              }
            );
          } catch (error: unknown) {
            next(error);
          }
    }

    static async DownloadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            fs.readFile(
                `${__dirname}/../../../uploads/${req.params.fileName}`,
              (err: unknown, data) => {
                if (err) {
                    res.status(404).json({
                      success: false,
                      message: "File not found !",
                    });
                  } else {
                    res.download(
                    path.join(__dirname + "/../../../uploads/" + req.params.fileName),
                    function (err) {
                      if (err) {
                        return "error"
                      }
                    }
                  );
                }
              }
            );
          } catch (error: unknown) {
            next(error);
          }
    }

    static async Upload(req: Request, res: Response): Promise<void> {

        let files = req.files
        let userId = ""
        let productId = ""

        if(req.params.owner == "users"){
            const user = await usersModel.findOne({_id: req.body.id})
            if(!user){
                deleteFiles(files)
                res.status(404).json({
                    success: false,
                    message: "Bunday user mavjud emas"
                })
                return
            }
            userId = req.body.id
        }

        if(req.params.owner == "products"){
            const product = await productsModel.findOne({_id: req.body.id})
            if(!product){
                deleteFiles(files)
                res.status(404).json({
                    success: false,
                    message: "Bunday mahsulot mavjud emas"
                })
                return
            }
            productId = req.body.id
        }

        if (files == null) {
            res.status(401).json({
                success: false,
                message: "fayllar mavjud emas"
            })
            return
        }


        if (Array.isArray(files)) {
            files.forEach( async function (file: Express.Multer.File) {
                let size = ""
                Math.floor(file.size / (1024*1024)) > 0 ? size = (file.size / (1024*1024)).toFixed(2) + " MB": size = (file.size /1024).toFixed(2) + " KB"
                const newfile = new filesModel({
                    name: file.originalname,
                    uploadName: file.filename,
                    type: file.mimetype,
                    url: "https://bosstech.mquvonchbek.uz/files/" + file.filename,
                    downloadUrl: "https://bosstech.mquvonchbek.uz/files/download/" + file.filename,
                    user: userId != ""? userId: undefined,
                    product: productId != ""? productId: undefined,
                    size: size,
                    created_at: new Date()
                })

                await newfile.save()

                if (productId) {
                    const product = await productsModel.findOne({_id: productId})
                    product?.files.push(newfile.id || newfile._id)
                    product?.save()
                }

                if (userId) {
                    const user = await usersModel.findOne({_id: userId})
                    user?.files.push(newfile.id || newfile._id)
                    user?.save()

                }
            })

        }

        res.status(200).json({
            success: true,
            message: "Fayllar yuklandi"
        })
        return

        function deleteFiles(arr:any):void  {
            if(Array.isArray(arr)){
                arr.forEach(function (el: Express.Multer.File) {
                    fs.unlinkSync(`${__dirname}/../../../uploads/${el.filename}`)
                })
            }
        }
    }
}
