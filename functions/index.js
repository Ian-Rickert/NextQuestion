import { onRequest } from "firebase-functions/v2/https";
import app from "./lib/server.mjs";

export const api = onRequest(
  {
    cors: true,
    invoker: "public",
    memory: "512MiB",
    timeoutSeconds: 60,
  },
  app,
);
