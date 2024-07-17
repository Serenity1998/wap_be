import { Router, Request, Response } from 'express';
import Post, { IPost } from '../schemas/IPost';

const post_router = Router();

post_router.post('/post', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const post: IPost = new Post(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

post_router.get('/post', async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now);
    const endOfDay = new Date(now);

    if (req.query.type === 'yesterday') {
      startOfDay.setUTCDate(startOfDay.getUTCDate() - 1);
      endOfDay.setUTCDate(endOfDay.getUTCDate() - 1);
    }

    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const posts: IPost[] = await Post.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1, up: -1 });

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

post_router.get('/post/:id', async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

post_router.put('/post/up/:id', async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findById(req.params.id);
    const new_up = (post?.up || 0) + 1;
    const post_updated: IPost | null = await Post.findByIdAndUpdate(req.params.id, { up: new_up });

    if (!post_updated) {
      return res.status(404).send();
    }
    res.status(200).send(post_updated);
  } catch (error) {
    res.status(400).send(error);
  }
});

post_router.put('/post/down/:id', async (req: Request, res: Response) => {
  try {
    const post: IPost | null = await Post.findById(req.params.id);
    const new_down = (post?.down || 0) + 1;
    const post_updated: IPost | null = await Post.findByIdAndUpdate(req.params.id, { down: new_down });

    if (!post_updated) {
      return res.status(404).send();
    }
    res.status(200).send(post_updated);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default post_router;
