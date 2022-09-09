import { Router } from 'express'; // roteamento do express

import authMiddleware from './app/middlewares/auth'

import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/users', userController.store);

routes.post('/sessions', sessionController.store);

// todas as rotas abaixo desse middleware precisam estar autenticadas
routes.use(authMiddleware);

routes.put('/users', userController.update);

routes.post('/tasks', TaskController.store)
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update)
routes.delete('/tasks/:task_id', TaskController.delete)

export default routes;
