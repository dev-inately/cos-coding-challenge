import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';

export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor () {}

    public async getRunningAuctions(): Promise<any> {
        return Promise.resolve(null);
    }

}