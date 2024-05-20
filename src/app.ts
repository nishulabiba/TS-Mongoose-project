
import express, { Application, Request, Response} from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());


//applicatio routes

app.use("/api/v1/students/", ProductRoute)

const getAController = (req: Request, res: Response) => {
  

  res.send("e")
}
app.get('/', getAController);




export default app;
