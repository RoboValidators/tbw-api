import { NestFactory } from "@nestjs/core";

import "firebase/firestore";
import * as fireorm from "fireorm";
import admin, { ServiceAccount } from "firebase-admin";

import { AppModule } from "@modules/app.module";

import serviceAccount = require("./config/serviceAccountKey.json");

async function bootstrap() {
  // Initialize the firebase admin app
  const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });

  fireorm.initialize(firebaseInstance.firestore());

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3000);
}

bootstrap();
