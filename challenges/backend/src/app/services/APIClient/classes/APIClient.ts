import axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectable, inject } from "inversify";
import { ILoginResponse } from "../types/ILogin";
import { IRunningAuctionResponse } from "../types/IRunningAuction";
import { IAPIClient } from "../interface/IAPIClient";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";

@injectable()
export class APIClient implements IAPIClient {
  protected readonly $http: AxiosInstance;
  private userId: string = "buyer-challenge@caronsale.de";
  private password: string = "Test123.";

  public constructor(
      @inject(DependencyIdentifier.BASE_URL) private baseUrl: string,
      @inject(DependencyIdentifier.LOGGER) private logger: ILogger
  ) {
    this.$http = axios.create({
      baseURL: this.baseUrl,
      headers: { "Content-Type": "application/json", userId: this.userId },
    });
  }

  // Allow user to change the password on the fly, when called
  public async authenticateUser(userId: string = this.userId, password: string = this.password) {
    const url = `/v1/authentication/${userId}`;
    const response: AxiosResponse<ILoginResponse> = await this.$http.put(url, { password });
    this.userId = response.data.userId;
    this.password = password;
    this.$http.defaults.headers.authtoken = response.data.token;
    this.$http.defaults.headers.userId = this.userId;
    this.logger.log('User logged in successfully')
  }

  public async retrieveRunningAuctions() {
    if (!this.$http.defaults.headers.authtoken) {
      throw new Error("Please authenticate user first!");
    }
    const url = `/v1/auction/salesman/${this.userId}/_all/bidding-data`;
    const response: AxiosResponse<IRunningAuctionResponse[]> = await this.$http.get(url);
    return response.data;
  }
}
