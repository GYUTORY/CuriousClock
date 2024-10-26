import express from "express";
import { AddressInfo } from "net";
import formData from "express-form-data";

import Logger from "../../modules/Logger";
import router from "../../routers/api";

// Config.json 파일 가져오기
import Config, { RUN_MODE } from "../../../config";


export default async () => {
    const app = express();

// JSON 파싱 미들웨어를 사용하고, 요청 본문의 크기를 제한합니다.
    app.use(express.json({ limit: '50mb' }));

    // URL-encoded 파싱 미들웨어를 사용하고, 요청 본문의 크기를 제한합니다.
    app.use(express.urlencoded({ limit: '50mb' }));

    // 프록시 서버에서 X-Forwarded-For 헤더를 신뢰하도록 설정합니다.
    app.enable('trust proxy');

    // 파일 업로드를 위해 요청 본문을 파싱하는 미들웨어를 등록하고, 설정을 지정합니다.
    app.use(formData.parse({
        autoClean: true, // 요청이 완료된 후 임시 파일을 자동으로 삭제
        maxFilesSize: 1024 * 1024 * 1024, // 전송되는 파일의 최대 크기를 설정
    }));

    // 파일 업로드를 위한 미들웨어를 등록합니다.
    app.use(formData.union());

    // 경로 핸들러에 타입을 명시적으로 적용
    app.get('/health', (req, res) => res.status(200).end());
    app.head('/', (req, res) => res.status(200).end());

    // Routing
    app.use("/", router);

    const server = app.listen(Config.SERVER.PORT, () => {
        const { address, port } = server.address() as AddressInfo;
        Logger.info(Config.SERVER.TYPE + ' Server is Running on ' + `${Config.PROTOCOL[RUN_MODE]}://localhost:` + port);
    });

}

