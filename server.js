import express from "express";
import fs from "node:fs";
import https from "node:https";
import path from "node:path";

import { createRequestHandler } from "@remix-run/express";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();

app.use(
  viteDevServer
    ? viteDevServer.middlewares
    : express.static("build/client")
);

const build = viteDevServer
  ? () =>
      viteDevServer.ssrLoadModule(
        "virtual:remix/server-build"
      )
  : await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

const server = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "cert/key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "cert/cert.pem")),
  },
  app
);

const port = 8888;
server.listen(port, () => {
  console.log(`Auth demo listening on https://localhost:${port}`);
});
