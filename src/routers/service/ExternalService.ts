import axios from "axios";

import Config from "../../../config"
import Logger from "../../modules/Logger";

export default class ExternalService {

    public static async getDataByExternalAPI(method: string, productId: string, payload?: object) {

        try {

            let recordSet;

            switch (method.toUpperCase()) {
                case "GET":
                    recordSet = await axios.get(`${Config.EXTERNAL.URL}`, {params: payload});
                    recordSet = recordSet?.data.result
                case "POST":
                default:
                    break;
            }

            return recordSet ?? null;

        } catch (err) {
            throw err;
        }
    }
}