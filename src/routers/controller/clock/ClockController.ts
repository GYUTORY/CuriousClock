import {Request, Response} from "express";

import BaseHandler from "../../BaseHandler";
import Logger from "../../../modules/Logger";




import ClockService from "../../service/clock/ClockService";

import {TollGateDto} from "../../dto/highway/TollGateDto";
import {HighWayDto, HighWayInterface} from "../../dto/highway/HighWayDto"

class ClockController extends BaseHandler {

    public tollgate = async (req: Request, res: Response) => {
        Logger.debug("Call Api - " + req.originalUrl);
        const recordSet = await ClockService.getListByTollGate();

        this.reply(res, recordSet);

    }

    public clock = async (req: Request, res: Response) => {

        Logger.debug("Call Api - " + req.originalUrl);

        try {
            const reqData = await this.dtoHandler(req, res, HighWayDto) as HighWayInterface;
            const recordSet = await ClockService.getDataByHighWay(reqData);

            this.reply(res, recordSet);
        } catch (err) {
            this.clientError(err, req, res);
        }



    }
}

export default new ClockController();
