import {validate} from 'class-validator';
import e, {Request, Response} from "express";

import {plainToClass, plainToInstance} from 'class-transformer';
import {validateOrReject} from "class-validator";

import Logger from "../modules/Logger";

interface ApiResponse {
    userStatus: boolean;
    code: string;
    recordSet: any[];
    msg: string;
}


export default class BaseHandler {

    public async dtoHandler<T>(req: Request, res: Response, type: new () => T) {
        try {

            let reqData = req.body;
            if (req.method === "GET") reqData = {...req.query};

            const instance = plainToInstance(type, reqData);
            await validateOrReject(instance as any);

            return instance;
        } catch (err) {

            const errMsg = `Invalid value provided for ${err[0]?.property ?? ""}`;

            throw errMsg;

        }
    }


    public reply(res: Response, data: ApiResponse) {
        return res.status(400).json(data);
    }


    public clientError(err: any, req: Request, res: Response) {
        Logger.debug(`Error Caused at Api : ${req.originalUrl}`, err);
        return res.status(400).json({
            userStatus: false,
            code: "2000",
            recordSet: [],
            msg: err
        });
    }


}