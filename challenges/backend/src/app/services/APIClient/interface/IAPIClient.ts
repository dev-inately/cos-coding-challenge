import { IRunningAuctionResponse } from "../types/IRunningAuction";

export interface IAPIClient {
  authenticateUser(userId?: string, password?: string): Promise<void>;
  retrieveRunningAuctions(): Promise<IRunningAuctionResponse[]>;
}
