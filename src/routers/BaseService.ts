

interface ApiResponse {
    userStatus: boolean;
    code: string;
    recordSet: any[];
    msg: string;
}


export class BaseService {

    public serviceError(err: any, code?: string): ApiResponse {
        return {
            userStatus: false,
            code: code ?? "5000",
            recordSet: [],
            msg: `INTERNAL ERROR - ${err}`
        };
    }

    public serviceSuccess(data: any): ApiResponse {
        return {
            userStatus: true,
            code: "2000",
            recordSet: data,
            msg: "SERVICE SUCCESS"
        };
    }

    public serviceFailure(err: any, code?: string): ApiResponse {
        return {
            userStatus: false,
            code: "5000",
            recordSet: [],
            msg: `SERVICE ERROR - ${err}`
        };
    }

}
