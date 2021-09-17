import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
import { IAPIClient } from "../../APIClient/interface/IAPIClient";
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.API_CLIENT) private apiClient: IAPIClient
  ) {}

  public async getRunningAuctions() {
    try {
      await this.apiClient.authenticateUser();
      return this.apiClient.retrieveRunningAuctions();
    } catch (error: any) {
      // Log the error before throwing
      this.logger.error(error.message);
      throw error;
    }
  }
}
