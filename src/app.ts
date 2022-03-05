import debug, { IDebugger } from "debug";
import express, { Application, json, Request, Response } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { logger, LoggerOptions } from "express-winston";
import { format, transports } from "winston";
import { UsersRoutesConfig } from "./users/users.routes.config";

const app: Application = express();
const server: Server = createServer(app);
const PORT = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: IDebugger = debug('app');

const loggerOptions: LoggerOptions = {
  transports: [new transports.Console()],
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.colorize({ all: true }),
  ),
  meta: process.env.DEBUG ? true: false,
};

app.use(json());
app.use(cors());
app.use(logger(loggerOptions));

routes.push(new UsersRoutesConfig(app));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Server responding on port ${PORT}`);
});

server.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(`Server running on port ${PORT}`)
});
