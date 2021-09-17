import { RunningAuctionResponse } from "../../APIClient/types/RunningAuction";


export type NormalizedResponse = {
    totalRunningAuctions: number;
    auctions: RunningAuctionResponse[],
    averageBidNumber: number,
    averageAuctionProgress: number
}
