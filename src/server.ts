import express, { Application, Router } from 'express';
import todosRouter from './routers/TodosRouter';
import pool from './dbconfig/dbconnector';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    //use body parser for put in value
    private config() {
        this.app.use(express.json()); 
        this.app.use(
            express.urlencoded({
                extended: true,
            })
        ); 
    }

    //check connected database
    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error(err);
            console.log('Database connected');
        });
    }

    //set default url
    private routerConfig() {
        this.app.use('/api/v1.0', todosRouter);
    }

    //port checker
    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;