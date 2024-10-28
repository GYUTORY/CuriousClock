
import Config from "../../../../config";

import {BaseService} from "../../BaseService";
import ExternalService from "../ExternalService";

import {HighWayDto, HighWayInterface} from "../../dto/highway/HighWayDto";
import Logger from "../../../modules/Logger";



class ClockService extends BaseService {


    public async getDataByHighWay(HighWayDto: HighWayInterface) {

        try {

            let reqData = {
                apiKey: Config.EXTERNAL.APIKEY,
                productId: Config.EXTERNAL.HIGHWAYCLOCK,
                iStartUnitCode: HighWayDto.startUnitCode,
                iEndUnitCode:  HighWayDto.endUnitCode,
            }

            Logger.info(JSON.stringify(reqData));
            const recordSet = await ExternalService.getDataByExternalAPI("GET", Config.EXTERNAL.HIGHWAYCLOCK, reqData);

            return this.serviceSuccess(recordSet);

        } catch (err) {
            return this.serviceError(err);
        }
    }


    public async getListByTollGate(pageNo = 1) {

        try {

            let reqData = {
                apiKey: Config.EXTERNAL.APIKEY,
                productId: Config.EXTERNAL.TOLLGATE,
                numOfRows: "100",
                pageNo: pageNo
            }

            // todo 나중에 Redis 처리할 것. -> 추 후, 스케줄러 처리해도 좋을듯
            let tollGateList = [];

            const recordSet = await ExternalService.getDataByExternalAPI("GET", Config.EXTERNAL.TOLLGATE, reqData);

            tollGateList.push(...recordSet.unitLists);

            // 전체 페이지 검색
            for(pageNo ; pageNo < recordSet.pageSize ; pageNo++) {
                reqData.pageNo++;
                const recordSet = await ExternalService.getDataByExternalAPI("GET", Config.EXTERNAL.TOLLGATE, reqData);
                tollGateList.push(...recordSet.unitLists)
            }


            tollGateList.sort((a: { unitName: string }, b: { unitName: string }) => {
                return a.unitName.localeCompare(b.unitName);
            });

            return this.serviceSuccess(tollGateList);

        } catch (err) {
            return this.serviceError(err);
        }
    }


}


export default new ClockService();