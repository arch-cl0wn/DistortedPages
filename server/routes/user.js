import express from 'express';
import {
	registerUser,
	findUserById,
	findUserProfile,
	deleteUser
} from '../controllers/user';

const router = express.Router();

// import them to protect routes
import { requireSignin, hasAuthorization } from '../controllers/auth';

router.route('/api/users').post(registerUser);

router
	.route('/api/users/:userId')
	.get(requireSignin, findUserProfile)
	.delete(requireSignin, hasAuthorization, deleteUser);

router.param('userId', findUserById);

export default router;