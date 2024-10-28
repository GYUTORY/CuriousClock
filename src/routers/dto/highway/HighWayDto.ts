import { IsNotEmpty } from 'class-validator';

export interface HighWayInterface {
    startUnitCode: string;
    endUnitCode: string;
}

export class HighWayDto implements HighWayInterface {
    @IsNotEmpty({ message: '출발영업소코드 필수 항목입니다.' })
    startUnitCode: string;

    @IsNotEmpty({ message: '도착영업소코드는 필수 항목입니다.'})
    endUnitCode: string;
}

