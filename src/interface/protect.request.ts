import { Request } from "express"

export interface ProtectRequest extends Request {
    user?: any
}