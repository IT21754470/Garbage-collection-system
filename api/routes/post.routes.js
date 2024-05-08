import express from 'express';

import { createPost, getPosts, getPost, updatePost, deletePost, getPostsByUser, updateState } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/gets/:slug', getPosts);
router.get('/getbyuser/:id', getPostsByUser);
router.get('/get/:id', getPost);
router.put('/update/:id', updatePost);
router.put('/updateState/:id', updateState);
router.delete('/delete/:id', deletePost);

export default router;