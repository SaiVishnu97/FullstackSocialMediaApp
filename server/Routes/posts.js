import express from 'express'

import {getFeedPosts, getUserPosts , likePost} from '../Controllers/posts.js'

import { verifyToken } from '../middleware/auth.js'

const Router = express.Router();

//READ

Router.get('/',verifyToken,getFeedPosts);

Router.get('/:userid/posts',verifyToken,getUserPosts);

// UPDATE

Router.patch('/:id/like',verifyToken,likePost);

export default Router

