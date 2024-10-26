import express from "express";
import { AddressInfo } from "net";
import formData from "express-form-data";

import ExpressLoader from "./routers/loaders/ExpressLoader";
import MongoLoader from "./routers/loaders/MongoLoader";
import Logger from "./modules/Logger";


// Config.json 파일 가져오기
import Config, { RUN_MODE } from "../config";

const app = express();

(async function () {

    // Server Start
    await ExpressLoader();

    // Mongo Start
    await MongoLoader();

})();
