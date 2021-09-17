import { RunningAuctionResponse } from "../types/RunningAuction";

export interface IAPIClient {
  authenticateUser(userId?: string, password?: string): Promise<void>;
  retrieveRunningAuctions(): Promise<RunningAuctionResponse[]>;
}
