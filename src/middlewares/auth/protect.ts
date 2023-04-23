import {Request, Response, NextFunction } from "express";
import { Jwt } from "../../utils/jwt";
import { ErrorHandler } from "../../errors/errorHandler";
import model from "../../models/admins.model"
import { ProtectRequest } from "../../interface/protect.request";

const protectAdmin = async(req: ProtectRequest, res: Response, next: NextFunction) => {
  try {

    let authToken: string = ""

    const token = req.headers.authorization

    if (token && token.startsWith("Bearer ")) {
      authToken = token.split(" ")[1];
    }
    if (!authToken){
      res.status(401).json({
        success: false,
        message: "Foydalanish uchun tizimga kiring !"
      })
      return
    }

    const decodedToken = await Jwt.verify(authToken);


    if (!decodedToken){
      res.status(400).json({
        success: false,
        message: "Tokenda muammo bor !"
      })
      return
    }

    const user = await model.findOne({email: decodedToken})


    if (!user){
      res.status(404).json({
        success: false,
        message: "Admin topilmadi !"
      })
      return
    }
    req.user = user
    next()

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Tokenda muammo yoki xatolik, Iltimos tokenni yangilang yoki tizimga qaytadan kiring !!!"
    })
    return
  }
}

export default protectAdmin;
