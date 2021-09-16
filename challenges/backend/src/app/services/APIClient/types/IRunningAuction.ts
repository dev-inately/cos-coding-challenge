/**
 * For the fear of using <any>, some of the field are inferred "casually" from the variable name
 */
export type IRunningAuctionResponse = {
  uuid: string;
  state: number;
  endingTime: Date;
  remainingTimeInSeconds: number;
  remainingTimeForInstantPurchaseInSeconds: number | null;
  instantPurchasePossibleUntil: number | Date | null;
  _fk_uuid_highestBiddingBuyerUser: string | null;
  currentHighestBidValue: number | null;
  currentHighestBidValueNet: number | null;
  minimumRequiredAsk: number;
  minimumRequiredAskNet: number;
  numBids: number;
  amIHighestBidder: boolean;
  biddingAgentValue: number | null;
  isMinAskReached: boolean;
  isCrossBorderNetSale: boolean;
};
