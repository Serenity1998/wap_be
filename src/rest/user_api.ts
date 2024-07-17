import { Router, Request, Response } from 'express';
import User, { IUser } from '../schemas/IUser';

const user_router = Router();

user_router.post('/user', async (req: Request, res: Response) => {
  try {
    const user: IUser = new User(req.body);
    await user.save();
    console.log(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

user_router.get('/user', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

user_router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

user_router.put('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

user_router.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default user_router;
