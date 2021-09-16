import { expect } from 'chai';
import { CarOnSaleClient } from './CarOnSaleClient'

describe('CarOnSaleClient Test', () => {
    it('shoul return a list of running auctions', async () => {
        const client = new CarOnSaleClient();
        const response = await client.getRunningAuctions();
        expect(response).to.be.an('array');
        expect(response[0]).to.be.an('object')
        return Promise.resolve(response);
    });
});