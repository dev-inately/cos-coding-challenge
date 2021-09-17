import { RunningAuctionResponse } from "../../APIClient/types/RunningAuction";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
    getRunningAuctions(userId?: string, password?: string): Promise<RunningAuctionResponse[]>;
}
