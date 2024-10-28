import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

interface TollGateInterface {
    apiKey: string,
    productId: string
}

export class TollGateDto implements TollGateInterface {
    @IsNotEmpty({ message: 'apiKey - Incorrect Value' })
    @IsString({ message: 'apiKey - Incorrect Type Value' })
    apiKey: string;

    @IsNotEmpty({ message: 'productId - Incorrect Value' })
    @IsEmail({}, { message: 'productId - Incorrect Type Value' })
    productId: string;
}


