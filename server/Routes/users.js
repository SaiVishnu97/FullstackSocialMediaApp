import express from 'express'

import {getUser,getUserFriends,addRemoveFriend,userPatternMatching} from '../Controllers/users.js'

import { verifyToken } from '../middleware/auth.js'

const router=express.Router();
router.get('/pattern',verifyToken,userPatternMatching);

router.get('/:id',verifyToken,getUser);

router.get('/:id/friends',verifyToken,getUserFriends);

router.patch('/:id/:friendid',verifyToken,addRemoveFriend);
export default router;