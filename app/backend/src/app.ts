import * as express from 'express';
import { Login, TeamRoute, MatchesRoute, LeaderBoardRoute } from './routes';
import ErrorMiddleware from './middlewares/errorMiddleware';
import HttpException from './utils/HttpException';

const loginRouter = new Login();
const teamsRouter = new TeamRoute();
const matchesRouter = new MatchesRoute();
const leaderBoardRouter = new LeaderBoardRoute();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use((
      err: HttpException,
      req:express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => ErrorMiddleware.err(err, req, res, next));
  }

  private routes(): void {
    this.app.use('/login', loginRouter.route);
    this.app.use('/teams', teamsRouter.route);
    this.app.use('/matches', matchesRouter.route);
    this.app.use('/leaderboard', leaderBoardRouter.route);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
