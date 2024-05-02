import {UserController} from '../controller/UserController';
import {Router} from 'express';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/tasks/:id', userController.getUserTasks);
userRouter.get('/tasks/:id/:date', userController.getUserTasksByDate);

export default userRouter;