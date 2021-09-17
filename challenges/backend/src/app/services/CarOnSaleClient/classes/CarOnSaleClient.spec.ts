import { expect } from 'chai';
import { mockRunningAuctionResponse } from '../../../helpers/mockData';
import { IAPIClient } from '../../APIClient/interface/IAPIClient';
import { RunningAuctionResponse } from '../../APIClient/types/RunningAuction';
import { Logger } from '../../Logger/classes/Logger';
import { CarOnSaleClient } from './CarOnSaleClient'

class APIClientMock implements IAPIClient {
    private userId = 'demoID';
    private password = 'demoPassword';
    private client = { token: '' }

    public constructor () {
    }

    public async authenticateUser(userId = this.userId, password = this.password) {
        if (userId === 'demoID' && password === 'demoPassword') {
          this.client.token = 'fake-token'
        }
        else {
          throw new Error(
            `Authentisierung für Benutzer "${userId}" fehlgeschlagen.`
          );
        }
    }

    public async retrieveRunningAuctions() : Promise<RunningAuctionResponse[]>{
       if (!this.client.token) throw new Error("Please authenticate user first!");
       return Promise.resolve(mockRunningAuctionResponse)
    }
}

describe('CarOnSaleClient Test', () => {
    it('should return a list of running auctions', async () => {
        const logger = new Logger();
        const apiClientMock = new APIClientMock();
        const client = new CarOnSaleClient(logger, apiClientMock);
        const response = await client.getRunningAuctions();
        expect(response).to.be.an('array');
        expect(response[0]).to.be.an('object')
        expect(response.length).to.equal(4)
    });

    it('should fail to authenticate as userId is incorrect', async () => {
        const apiClientMock = new APIClientMock();
        try {
          await apiClientMock.authenticateUser('realUSer', 'demoPassword');
        } catch (error: any) {
          expect(error.message).to.equal('Authentisierung für Benutzer "realUSer" fehlgeschlagen.');
        }
    });

    it('should fail to retrieve Running auctions as user is not yet authenticated', async () => {
        const apiClientMock = new APIClientMock();
        try {
          await apiClientMock.retrieveRunningAuctions();
        } catch (error: any) {
          expect(error.message).to.equal("Please authenticate user first!");
        }
    });

    it("should fail to authenticate as password is incorrect", async () => {
      const logger = new Logger();
      const apiClientMock = new APIClientMock();
      const client = new CarOnSaleClient(logger, apiClientMock);
      try {
        await client.getRunningAuctions("demoId", "dpassword");
      } catch (error: any) {
        expect(error.message).to.equal(
          'Authentisierung für Benutzer "demoId" fehlgeschlagen.'
        );
      }
    });
});