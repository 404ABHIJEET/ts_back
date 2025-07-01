import { Router } from 'express';
import { 
    createUser, 
    deleteUserById, 
    getAllUsers, 
    getUserById, 
    getUserByUsername 
} from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.get('/username/:username', getUserByUsername)
router.post('/', createUser);
router.delete('/:id', deleteUserById)

export default router;
