import { Application } from "express";

export abstract class CommonRoutesConfig {
  constructor(protected app: Application, protected name: string) {
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): Application;
}
