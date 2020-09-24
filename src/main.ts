import { NestFactory } from "@nestjs/core";
import { Managers } from "@arkecosystem/crypto";
import axios from "axios";

import "firebase/firestore";
import * as fireorm from "fireorm";
import admin, { ServiceAccount } from "firebase-admin";

import { AppModule } from "@modules/app.module";
import { INetworkConfig, Api } from "@types";
import { NetworkConfig } from "@config";

async function bootstrap() {
  const serviceAccountKey =
    (process.env.serviceAccount as any) || (await import("./config/serviceAccountKey.json"));

  // Initialize the firebase admin app BEFORE creating the application
  const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
    databaseURL: `https://${serviceAccountKey.project_id}.firebaseio.com`
  });
  fireorm.initialize(firebaseInstance.firestore());

  // Create server app
  const app = await NestFactory.create(AppModule);
  // const config = app.get<ConfigService>(ConfigService);

  // Setup Ark SDK
  const networkConfig: INetworkConfig = await NetworkConfig.get();
  Managers.configManager.setConfig(networkConfig);

  // Set block height
  const { data: heightData } = await axios.get(`${networkConfig.config.relayUrl}/blockchain`);
  Managers.configManager.setHeight(heightData.data.block.height);

  // Set fees
  const { data: feeData } = await axios.get<Api.ConfigResponse>(
    `${networkConfig.config.relayUrl}/node/configuration`
  );
  const staticFees = feeData.data.constants.fees.staticFees;
  NetworkConfig.setFees(staticFees);

  // Server settings
  app.enableCors();

  // Start Service
  await app.listen(3000);
}

bootstrap();
