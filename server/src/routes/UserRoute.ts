import {UserController} from '../controller/UserController';
import {Router} from 'express';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/tasks/:id', userController.getUserTasks);

export default userRouter;