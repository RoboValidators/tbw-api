import { INetworkConfig } from "@types";

export class NetworkConfig {
  static get(): Promise<INetworkConfig> {
    return import(`./${process.env.NETWORK}`);
  }
}
