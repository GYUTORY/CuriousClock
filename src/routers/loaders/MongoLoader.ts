import mongoose from "mongoose";
import Config, {RUN_MODE} from "../../../config";
import Logger from "../../modules/Logger";


export default async () => {


    const mongoUrl = `${Config.MONGO[RUN_MODE].URL}/${Config.MONGO[RUN_MODE].DB}`;

    try {
        Logger.info(`[${mongoUrl}] DataBase is Started`);
        await mongoose.connect(mongoUrl);
        Logger.info(`[${mongoUrl}] DataBase is Loaded`);
    } catch (err) {
        Logger.error("DataBase is Occured By ", err);
    }

}



