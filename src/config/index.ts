import { INetworkConfig, Blockchain } from "@types";

export class NetworkConfig {
  private static staticFees: Blockchain.StaticFees;

  static get(): Promise<INetworkConfig> {
    return import(`./${process.env.NETWORK}`);
  }

  static setFees(staticFees: Blockchain.StaticFees): void {
    NetworkConfig.staticFees = staticFees;
  }

  static getFees(): Blockchain.Fees {
    return {
      staticFees: NetworkConfig.staticFees
    };
  }
}
