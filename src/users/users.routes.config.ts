import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

type ReqUserId = Request & { params: { userId: string } };

export class UsersRoutesConfig extends CommonRoutesConfig {
  constructor(protected app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): Application {
    this.app.route('/users')
      .get((req: Request, res: Response) => {
        res.status(200).send('List of users');
      })
      .post((req: Request, res: Response) => {
        res.status(200).send('Post to users');
      });
    this.app.route('/users/:userId')
      .all((_req: ReqUserId, _res: Response, next: NextFunction) => {
        // this is a middleware that execute for all requests to this '/users/:userId' route
        // then call next to pass the control to the next middleware or controller
        next();
      })
      .get((req: ReqUserId, res: Response) => {
        res.status(200).send(`GET requested for user id ${req.params.userId}`);
      })
      .put((req: ReqUserId, res: Response) => {
        res.status(200).send(`PUT requested for user id ${req.params.userId}`);
      })
      .patch((req: ReqUserId, res: Response) => {
        res.status(200).send(`PATCH requested for user id ${req.params.userId}`);
      })
      .delete((req: ReqUserId, res: Response) => {
        res.status(200).send(`DELETE requested for user id ${req.params.userId}`);
      });
    return this.app;
  }
}
