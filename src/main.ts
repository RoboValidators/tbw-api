import { NestFactory } from "@nestjs/core";
import { Managers } from "@arkecosystem/crypto";
import axios from "axios";

import "firebase/firestore";
import * as fireorm from "fireorm";
import admin, { ServiceAccount } from "firebase-admin";

import { AppModule } from "@modules/app.module";
import { INetworkConfig } from "@types";
import { NetworkConfig } from "@config";

import * as serviceAccount from "./config/serviceAccountKey.json";

async function bootstrap() {
  // Initialize the firebase admin app BEFORE creating the application
  const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
  fireorm.initialize(firebaseInstance.firestore());

  // Create server app
  const app = await NestFactory.create(AppModule);
  // const config = app.get<ConfigService>(ConfigService);

  // Setup Ark SDK
  const networkConfig: INetworkConfig = await NetworkConfig.get();
  Managers.configManager.setConfig(networkConfig);

  const { data } = await axios.get(`${networkConfig.config.relayUrl}/blockchain`);
  Managers.configManager.setHeight(data.data.block.height);

  // Server settings
  app.enableCors();

  // Start Service
  await app.listen(3000);
}

bootstrap();
