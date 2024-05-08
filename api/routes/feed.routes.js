import express from 'express'
import { CreatFeed, allgetfeed, deleteFeed, updatefeed } from '../controllers/feed.controller.js'
import { verifyToken  } from '../utils/verifyUser.js';
import { verifyAdmin  } from '../utils/verifyAdmin.js';

const router=express.Router();

router.post('/Fcreate',  verifyToken,  CreatFeed)
router.get('/allfeed', allgetfeed);
router.put( '/updatee/:FeeddId',verifyToken, updatefeed);
router.delete('/deletee/:FeedId',verifyToken,  deleteFeed);


export default router;